import {
  isObject, map, takeWhile, difference,
} from 'lodash';
import defaultObject from '@/components/Barchart/defaultOption';
import { formatFactor } from '@/util/helper';
import { sortHighchartsDataInObjectFormat } from './util';

export default {
  data() {
    return {
      series: '',
      color: {
        green: '#00AC40',
        red: '#E85D58',
      },
    };
  },

  methods: {
    // eslint-disable-next-line consistent-return
    singlePointDecimalValue(value) {
      let num;
      if (typeof value !== 'string') {
        if (typeof value === 'number') {
          num = value;
        }
      } else num = Number.parseFloat(value, 10);
      // eslint-disable-next-line valid-typeof
      if (typeof num !== undefined) {
        num = num.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        const temp = num.split('.');
        if (temp[1] === '0') {
          return Number(temp[0]);
        }
        return Number(num);
      }
    },
    tableComponentDataFormatter(indicatorObject, dataObjectArray) {
      const data = {};
      data.indicator = indicatorObject;
      data.values = [];
      dataObjectArray.forEach((e) => {
        if (e) {
          const datasource = this.dlGetDataSource(e.datasource);
          const factor = this.dlGetFactor(indicatorObject.factor);
          data.values.push({
            dataSources: datasource,
            // change 2 decimal place to 1 decimal place
            value: new Intl.NumberFormat().format(Number(e.value).toFixed(1)),
            factor: formatFactor(factor.display_factor),
            year: e.period,
            classification: datasource.classification,
          });
        }
      });
      return data;
    },
    toHighChartDataArrayFormat(data, ndData) {
      const dataValue = map(data, (item) => {
        const locationName = this.dlGetLocation(item.location);
        if (ndData.length > 0) {
          return {
            name: locationName.name,
            y: Number(item.value),
            nd: Number(ndData.find((el) => el.location === item.location).numerator).toLocaleString(),
            dn: Number(ndData.find((el) => el.location === item.location).denominator).toLocaleString(),
          };
        }
        return {
          name: locationName.name,
          y: Number(item.value),
        };
      });
      return dataValue.sort(sortHighchartsDataInObjectFormat);
    },

    diffBaseOnTarget(data, targetValue) {
      const aboveTargetData = takeWhile(data, (item) => item.y >= targetValue);
      const belowTargetData = difference(data, aboveTargetData);

      return {
        aboveTargetData,
        belowTargetData,
      };
    },
    setPlotLineObjectForSDG(value) {
      return {
        color: '#222222',
        width: 0.5,
        value,
        dashStyle: 'longdashdot',
        label: {
          text: 'SDG',
          verticalAlign: 'top',
          rotation: 0,
          textAlign: 'right',
          y: 0,
          x: 0,
          style: {
            fontSize: '10px',
            fontFamily: '"Open Sans", sans-serif',
          },
        },
      };
    },
    setPlotLineObject(value) {
      return {
        width: 1,
        color: '#222222',
        value,
        label: {
          text: 'NT',
          verticalAlign: 'top',
          rotation: 0,
          textAlign: 'left',
          y: 0,
          x: -10,
          style: {
            fontSize: '10px',
            fontFamily: '"Open Sans", sans-serif',
          },
        },
      };
    },
    /**
     * This method adds the plotline to the
     * chart object checking if national target
     * and sdg target exists and also checking
     * the checkbox in the control panel if
     * the user has checked the box to see these
     * lines.
     * @param values:Object
     * @returns plotLines:Array
     */
    computeChartPlotLines(values) {
      // eslint-disable-next-line camelcase
      const { national_target, sdg_target } = values.indicator;
      const { national, sdg } = values.target;
      const plotLines = [];
      // eslint-disable-next-line camelcase
      if (national_target && national) {
        plotLines.push({
          width: 0.5,
          color: '#222222',
          value: national_target,
          label: {
            text: 'NT',
            verticalAlign: 'top',
            rotation: 0,
            textAlign: 'left',
            y: 0,
            x: -13,
            style: {
              fontSize: '10px',
              fontFamily: '"Open Sans", sans-serif',
            },
          },
        });
      }
      // eslint-disable-next-line camelcase
      if (sdg_target && sdg) {
        plotLines.push({
          color: '#222222',
          width: 0.5,
          value: sdg_target,
          dashStyle: 'longdashdot',
          label: {
            text: 'SDG',
            verticalAlign: 'top',
            rotation: 0,
            textAlign: 'right',
            y: 0,
            x: 0,
            style: {
              fontSize: '10px',
              fontFamily: '"Open Sans", sans-serif',
            },
          },
        });
      }
      return plotLines;
    },
    genHighChartOption(data, options = {}, ndData, showingNumDenum) {
      const dataValue = this.toHighChartDataArrayFormat(data, ndData);
      if (isObject(options.nationalTarget)) {
        const dataObjectWithTarget = this.diffBaseOnTarget(dataValue, options.nationalTarget.value);
        const plotLines = [];
        if (options.nationalTarget.show) {
          plotLines.push(this.setPlotLineObject(options.nationalTarget.value));
        }
        if (options.sdgTarget.value && options.sdgTarget.show) {
          plotLines.push(this.setPlotLineObjectForSDG(options.sdgTarget.value));
        }
        const series = [];

        if (options.nationalTarget.slope === 'Positive') {
          series.push({
            name: 'On Target',
            color: this.color.green,
            data: dataObjectWithTarget.aboveTargetData,
          });
          series.push({
            name: 'Below Target',
            color: this.color.red,
            data: dataObjectWithTarget.belowTargetData,
          });
        }

        if (options.nationalTarget.slope === 'Negative') {
          series.push({
            name: 'On Target',
            color: this.color.red,
            data: dataObjectWithTarget.aboveTargetData,
          });
          series.push({
            name: 'Below Target',
            color: this.color.green,
            data: dataObjectWithTarget.belowTargetData,
          });
        }
        // yAxis.plotLine = plotLine;
        let { yAxis } = defaultObject;
        yAxis = Object.assign(yAxis, { plotLines });
        if (showingNumDenum) {
          return {
            tooltip: {},
            plotOptions: {
              series: {
                pointWidth: 10,
                dataLabels: {
                  enabled: true,
                  useHTML: true,
                  format: '<span style="font-size:10px;">{point.y} <span style="font-weight:normal;font-size:10px;">({point.nd})</span></span>',
                  style: {
                    fontSize: '8px',
                  },
                },
              },
            },
            yAxis,
            series,
          };
        }
        return {
          tooltip: {},
          plotOptions: {
            series: {
              pointWidth: 10,
              dataLabels: {
                enabled: true,
                useHTML: true,
                format: '{point.y}',
                style: {
                  fontSize: '8px',
                },
              },
            },
          },
          yAxis,
          series,
        };
      }
      const color = this.color.green;
      if (showingNumDenum) {
        return {
          tooltip: {},
          plotOptions: {
            series: {
              pointWidth: 10,
              dataLabels: {
                enabled: true,
                useHTML: true,
                format: '{point.y} <span style="font-weight:normal">( {point.nd} )</span>',
              },
            },
          },
          series: [
            {
              name: 'state',
              color,
              data: dataValue,
            },
          ],
        };
      }
      return {
        plotOptions: {
          series: {
            pointWidth: 10,
            dataLabels: {
              enabled: true,
              useHTML: true,
              format: '{point.y}',
            },
          },
        },
        series: [
          {
            name: 'state',
            color,
            data: dataValue,
          },
        ],
      };
    },
  },
};
