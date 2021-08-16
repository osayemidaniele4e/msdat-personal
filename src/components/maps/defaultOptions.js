export default {
  chart: {},
  title: {
    text: '...',
    style: {
      fontSize: '13px',
      fontFamily: '"Work Sans", sans-serif',
      fontWeight: 'normal',
    },
  },
  subtitle: {
    text: '..',
    style: {
      fontSize: '13px',
      fontFamily: '"Work Sans", sans-serif',
      fontWeight: 'normal',
    },
  },
  credit: false,
  // colorAxis: {
  //   min: 0,
  // },
  legend: {
    align: 'right',
    verticalAlign: 'bottom',
    floating: false,
    // layout: 'vertical',
    valueDecimals: 10,
    // backgroundColor: 'rgba(255,255,255,0.9)',
    symbolRadius: 10,
    symbolHeight: 14,
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
        style: {
          fontSize: '10px',
          fontFamily: '"Work Sans", sans-serif',
          fontWeight: 'normal',
        },
      },
    },
  },
  series: [],
};
