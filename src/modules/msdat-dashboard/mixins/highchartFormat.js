import { map } from 'lodash';
import { sortHighChartDataFormat } from './util';

export default {
  objectOverrides: {
    series: [],
  },
  seriesObject: {},

  generateSeries() {
    // this.objectOverrides: {
    //   series: [];
    // };
  },
  toHighChartDataArrayFormat(data, obj) {
    const dataValue = map(data, (item) => {
      const locationName = this.dlGetLocation(item.location);
      return [locationName.name, Number(item.value)];
    });
    this.objectOverrides.series.push({
      ...obj,
      data: dataValue.sort(sortHighChartDataFormat),
    });
    console.log(this);
    return this;
  },
};
