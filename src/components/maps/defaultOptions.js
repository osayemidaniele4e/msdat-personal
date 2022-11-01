export default {
  chart: {
    style: {
      // fontSize: '10px',
      fontFamily: '"Work Sans", sans-serif',
      fontWeight: 'normal',
    },
  },
  exporting: {
    enabled: true,
    chartOptions: {
      title: {
        text: '',
        x: -20,
      },
    },
  },
  tooltip: {
    pointFormat: '{point.name}: <b>{point.value:.1f}</b><br/>',
  },
  title: {
    enabled: true,
    text: '',
    style: {
      fontSize: '13px',
      fontFamily: '"Work Sans", sans-serif',
      fontWeight: 'normal',
    },
  },
  subtitle: {
    text: '',
    style: {
      fontSize: '13px',
      fontFamily: '"Work Sans", sans-serif',
      fontWeight: 'normal',
    },
  },
  credits: {
    enabled: false,
  },
  // colorAxis: {
  //   min: 0,
  // },
  legend: {
    enabled: true,
    align: 'right',
    verticalAlign: 'bottom',
    // layout: 'vertical',
    valueDecimals: 10,
    // backgroundColor: 'rgba(255,255,255,0.9)',
  },
  mapNavigation: {
    enabled: true,
    buttonOptions: {
      verticalAlign: 'bottom',
    },
  },
  plotOptions: {
    series: {
      states: {
        inactive: {
          opacity: 0.5,
        },
        hover: {
          enabled: true,
        },
      },
    },
    map: {
      borderColor: 'white',
      borderWidth: 3,
      allAreas: false,
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
    // series: {
    //   cursor: 'pointer',
    //   events: {
    //     mouseOver() {
    //       originalColor = this.color;

    //       this.update({
    //         color: 'red',
    //       });
    //     },
    //     mouseOut() {
    //       this.update({
    //         color: originalColor,
    //       });
    //     },
    //   },
    // },
  },
  series: [],
};
