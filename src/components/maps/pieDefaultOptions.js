export default {
  chart: {
    animation: false, // Disable animation, especially for zooming
  },
  accessibility: {
    description: 'Complex map demo showing voting results for US '
            + 'states, where each state has a pie chart overlaid showing '
            + 'the vote distribution.',
  },
  mapNavigation: {
    enabled: true,
  },
  title: {
    text: 'USA 2016 Presidential Election Results',
    align: 'left',
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

  plotOptions: {
    pie: {
      borderColor: 'rgba(255,255,255,0.4)',
      borderWidth: 1,
      clip: true,
      dataLabels: {
        enabled: false,
      },
      states: {
        hover: {
          halo: {
            size: 5,
          },
        },
      },
      tooltip: {
        headerFormat: '',
      },
    },

  },
  series: [],
};
