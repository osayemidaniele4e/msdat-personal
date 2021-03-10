export default {
  chart: {
  },
  title: {
    text: '...',
  },
  subtitle: {
    text: '..',
  },
  legend: {
    enabled: true,
  },
  colorAxis: {
    min: 0,
  },
  mapNavigation: {
    enabled: true,
    buttonOptions: {
      verticalAlign: 'bottom',
    },
  },
  plotOptions: {
    map: {
      joinBy: ['name', 'hc-key'],
      //   mapData: NigerianMap,
      // mapNavigation: {
      //   enabled: true,
      //   buttonOptions: {
      //     verticalAlign: 'bottom',
      //   },
      // },
      dataLabels: {
        enabled: true,
        // color: '#FFFFFF',
        formatter() {
          if (this.point.value) {
            // console.log(this.point);
            return this.point.name;
          }
          return this.point.name;
        },
      },
      colorAxis: {
        min: 0,
      },
    },
  },
  series: [],
};
