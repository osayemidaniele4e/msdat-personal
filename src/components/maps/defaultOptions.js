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
      dataLabels: {
        enabled: true,
        formatter() {
          if (this.point.value) {
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
