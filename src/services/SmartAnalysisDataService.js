import ApiServices from '@/modules/data-layer/services/ApiServices';
import store from '@/store';
import { filter, matches } from 'lodash';

class SmartAnalysisDataService {
  
  get locations() {
    // Accessing the DL module state for locations
    return store.state.DL ? store.state.DL.location : [];
  }

  get factors() {
    // Accessing the DL module state for factors
    return store.state.DL ? store.state.DL.factors : [];
  }

  get datasources() {
    // Accessing the DL module state for datasources
    return store.state.DL ? store.state.DL.datasources : [];
  }

  getLocationsByQuery(query) {
    return filter(this.locations, matches(query));
  }

  /**
   * Get the unit/display factor for an indicator based on its factor id
   * @param {number} factorId - The factor id from the indicator
   * @returns {Object} - Object containing multiplier_factor and display_factor
   */
  getFactorUnit(factorId) {
    if (!factorId) return { multiplier_factor: null, display_factor: 'Unknown' };
    
    const factor = this.factors.find(f => f.id === factorId);
    if (factor) {
      return {
        multiplier_factor: factor.multiplier_factor,
        display_factor: factor.display_factor
      };
    }
    return { multiplier_factor: null, display_factor: 'Unknown' };
  }

  /**
   * Get datasource details by id
   * @param {number} datasourceId - The datasource id
   * @returns {Object|null} - Datasource object or null
   */
  getDatasourceById(datasourceId) {
    return this.datasources.find(ds => ds.id === datasourceId) || null;
  }

  /**
   * Compiles all necessary data for the AI analysis model
   * @param {Object} values - The control panel values object containing indicator, datasource, year, location
   * @returns {Promise<Object>} - The structured data for the AI model
   */
  async compileAnalysisData(values) {
    try {
      const { indicator, datasource, year, location } = values;
      
      // Get unit from factor
      const factorUnit = this.getFactorUnit(indicator.factor);
      
      // 1. Enhanced Metadata with all indicator fields
      const metadata = {
        id: indicator.id,
        name: indicator.full_name,
        description: indicator.description || indicator.definition || ''  ,
        short_name: indicator.short_name,
        indicator_type: indicator.indicator_type || null,
        program_area: indicator.program_area || null,
        desirable_slope: indicator.desirable_slope || null, // "Positive" or "Negative"
        unit: factorUnit.display_factor,
        multiplier_factor: factorUnit.multiplier_factor,
      };

      // Fetch related indicators and datasources
      const [relatedIndicators, availableDatasources] = await Promise.all([
        this.fetchRelatedIndicators(indicator),
        this.fetchAvailableDatasources(indicator.id)
      ]);

      metadata.related_indicators = relatedIndicators;
      metadata.available_datasources = availableDatasources;

      // 2. Targets with source information
      const targets = {
        national_target: indicator.national_target ? parseFloat(indicator.national_target) : null,
        national_source: indicator.national_source || null,
        national_information: indicator.national_information || null,
        sdg_target: indicator.sdg_target ? parseFloat(indicator.sdg_target) : null,
        sdg_information: indicator.sdg_information || null,
      };

      // 3. Current datasource info
      const currentDatasource = {
        id: datasource.id,
        name: datasource.full_name || datasource.datasource,
        classification: datasource.classification || null,
      };

      // 4. Determine scope (National vs State)
      const isNational = location.id === 1;
      const subNationalLevel = isNational ? 3 : 4; // 3 = State, 4 = LGA
      const parentId = isNational ? null : location.id;

      // 5. Fetch Data for Current and Previous Year
      const currentYear = year;
      const previousYear = (parseInt(year) - 1).toString();

      // Fetch both years in parallel
      const [currentData, previousData] = await Promise.all([
        this.fetchDataForPeriod(indicator.id, datasource.id, currentYear),
        this.fetchDataForPeriod(indicator.id, datasource.id, previousYear)
      ]);

      // 6. Process National/Parent Value
      const currentParentValue = this.findValueForLocation(currentData, location.id);
      const previousParentValue = this.findValueForLocation(previousData, location.id);

      // 7. Process Sub-national Values (States or LGAs)
      let subLocations = this.getLocationsByQuery({ level: subNationalLevel });
      if (parentId) {
        subLocations = subLocations.filter(l => l.parent === parentId);
      }

      const dataPoints = subLocations.map(loc => {
        const curr = this.findValueForLocation(currentData, loc.id);
        const prev = this.findValueForLocation(previousData, loc.id);
        
        // Only include if at least one value exists
        if (curr === null && prev === null) return null;

        return {
          location: loc.name,
          current_value: curr,
          previous_value: prev
        };
      }).filter(item => item !== null);

      // 8. Construct Final Payload
      return {
        indicator: metadata,
        targets,
        datasource: currentDatasource,
        period: {
          current: parseInt(currentYear),
          previous: parseInt(previousYear)
        },
        scope: isNational ? 'National' : location.name,
        summary: {
          location: location.name,
          current_value: currentParentValue,
          previous_value: previousParentValue,
          national_target: targets.national_target
        },
        data_points: dataPoints
      };

    } catch (error) {
      console.error('Error compiling analysis data:', error);
      throw error;
    }
  }

  async fetchDataForPeriod(indicatorId, datasourceId, period) {
    // Use getZonalData to fetch all data for the indicator/datasource/period at once
    try {
      const response = await ApiServices.getZonalData({
        indicator: indicatorId,
        datasource: datasourceId,
        period: period
      });
      return response.data.results || [];
    } catch (error) {
      console.error(`Failed to fetch data for period ${period}`, error);
      return [];
    }
  }

  findValueForLocation(data, locationId) {
    const item = data.find(d => d.location === locationId);
    return item ? parseFloat(item.value) : null;
  }

  async fetchRelatedIndicators(indicator) {
    const related = [];
    const relatedIds = [
      indicator.first_related,
      indicator.second_related,
      indicator.third_related,
      indicator.fourth_related
    ].filter(id => id); // Filter out null/undefined

    for (const id of relatedIds) {
      const ind = this.getIndicatorById(id);
      if (ind) {
        related.push({
          id: ind.id,
          short_name: ind.short_name,
          full_name: ind.full_name,
          program_area: ind.program_area || null
        });
      }
    }
    return related;
  }

  getIndicatorById(id) {
    return store.state.DL && store.state.DL.indicators 
      ? store.state.DL.indicators.find(i => i.id === id) 
      : null;
  }

  async fetchAvailableDatasources(indicatorId) {
    try {
      const response = await ApiServices.getIndicatorDatasources(indicatorId);
      // Return detailed datasource info
      return response.data.map(ds => {
        const datasourceDetails = this.getDatasourceById(ds.datasource);
        return {
          id: ds.datasource,
          name: datasourceDetails ? datasourceDetails.full_name || datasourceDetails.datasource : `Datasource ${ds.datasource}`,
          classification: datasourceDetails ? datasourceDetails.classification : null
        };
      });
    } catch (error) {
      console.error('Failed to fetch datasources', error);
      return [];
    }
  }
}

export default new SmartAnalysisDataService();
