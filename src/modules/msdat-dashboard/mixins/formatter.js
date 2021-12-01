import {
  isObject, map, takeWhile, difference,
} from 'lodash';
import defaultObject from '@/components/Barchart/defaultOption';
import { formatFactor } from '@/util/helper';
import { sortHighChartDataFormat } from './util';

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
            value: new Intl.NumberFormat().format(Number(e.value).toFixed(2)),
            factor: formatFactor(factor.display_factor),
            year: e.period,
            classification: datasource.classification,
          });
        }
      });
      return data;
    },
    toHighChartDataArrayFormat(data) {
      const dataValue = map(data, (item) => {
        const locationName = this.dlGetLocation(item.location);
        return [locationName.name, Number(item.value)];
      });
      return dataValue.sort(sortHighChartDataFormat);
    },
    diffBaseOnTarget(data, targetValue) {
      const aboveTargetData = takeWhile(data, (item) => item[1] >= targetValue);
      const belowTargetData = difference(data, aboveTargetData);

      return {
        aboveTargetData,
        belowTargetData,
      };
    },
    setPlotLineObject(value) {
      return {
        width: 1,
        value,
      };
    },
    genHighChartOption(data, options = {}) {
      const dataValue = this.toHighChartDataArrayFormat(data);
      if (isObject(options.target)) {
        const dataObjectWithTarget = this.diffBaseOnTarget(dataValue, options.target.value);
        const plotLines = [];
        plotLines.push(this.setPlotLineObject(options.target.value));
        const series = [];
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
        // yAxis.plotLine = plotLine;
        let { yAxis } = defaultObject;
        yAxis = Object.assign(yAxis, { plotLines });

        return {
          yAxis,
          series,
        };
      }
      const color = this.color.green;
      return {
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
