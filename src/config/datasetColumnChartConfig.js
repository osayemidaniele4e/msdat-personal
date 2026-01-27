/**
 * export to use
 * * column chart configuration for dataset comparism section
 */

export default {
  options: {
    title: {
      text: null,
    },
    subtitle: {
      text: '  Skilled Attendance At Delivery Or Birth',
      align: 'center',
      style: {
        fontSize: '20px',
        fontWeight: '200',
        fontFamily: 'Verdana, sans-serif',
      },
    },
    chart: {
      type: 'column',
      zoomType: 'xy',
      height: 473,
      marginLeft: 50,
      marginRight: 50,
    },
    xAxis: {
      labels: {
        rotation: -45,
        style: {
          fontSize: '13px',
          fontFamily: 'Verdana, sans-serif',
        },
      },

      categories: [],
    },
    yAxis: {

      gridLineWidth: 0,
      min: 0,
      opposite: false,
      title: {
        text: 'in Percentage',
        style: {
          fontSize: '15px',
        },
      },
      plotLines: [{
        width: 1,
        color: 'black',
        value: 100,
        label: {
          align: 'right',
          verticalAlign: 'middle',
          rotation: 90,
          formatter() {
            return `NT-${this.options.value}`;
          },
        },
      }],

    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    legend: {
      enabled: true,
    },
    series: [
      {
        pointPadding: 0.1,
        pointWidth: 5,
        name: 'data source placeholder',
        color: '#17606B',
        data: [],
      },
      {
        pointWidth: 5,
        color: '#FF1D00',
        name: 'second data source',
        data: [],
      },
      {
        pointWidth: 5,
        color: '#58B74E',
        name: 'third data source',
        data: [],
      },
    ],
  },
};
