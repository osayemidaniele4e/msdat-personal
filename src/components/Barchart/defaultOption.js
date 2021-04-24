export default {
  chart: {
    type: 'bar',
    zoomType: 'xy',
    height: 800,
  },
  title: {
    text: 'Loading...',
    style: {
      fontSize: '16px',
      fontFamily: '"Muli", sans-serif',
      fontWeight: 'normal',
    },
  },
  subtitle: {
    enabled: false,
    // text: '',
    style: {
      fontSize: '14px',
      fontFamily: '"Muli", sans-serif',

    },
  },
  xAxis: {
    type: 'category',
    labels: {
      // rotation: 180,
      style: {
        fontSize: '14px',
        fontFamily: '"Muli", sans-serif',
        fontWeight: 'normal',
      },
    },
    tickLength: 5,
    tickWidth: 1,
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Values',
      style: {
        fontSize: '16px',
        fontFamily: '"Muli", sans-serif',
      },
    },
    gridLineWidth: 0,

    labels: {
      // rotation: -90,
      // format: '{value} %',
      style: {
        fontSize: '11px',
        fontFamily: '"Muli", sans-serif',
      },
    },
    // plotLines: [{
    //   width: 2,
    //   value: 0,
    // }],
  },
  credits: {
    enabled: false,
  },
  legend: {
    align: 'center',
    // verticalAlign: 'middle',
    // layout: 'vertical'
    itemStyle: {
      fontSize: '14px',
      fontFamily: '"Muli", sans-serif',
      fontWeight: 400,
    },
  },
  plotOptions: {
    column: {
      // pointPlacement: 'between',
      // borderWidth: 0,
    },
    series: {
      // pointWidth: 17,
      // pointPlacement: 'between',
    },
    bar: {
      dataLabels: {
        enabled: true,
        // format: '{y}%',
        style: {
          fontSize: '14px',
          fontFamily: '"Muli", sans-serif',
        },
      },
    },
  },
  series: [
    {
      name: 'Votes',
      color: '#00AC40',
      data: [
        ['Gantt chart', 1000],
        ['Autocalculation and plotting of trend lines', 575],
        ['Allow navigator to have multiple data series', 523],
        ['Implement dynamic font size', 427],
        ['Multiple axis alignment control', 399],
        ['Stacked area (spline etc) in irregular datetime series', 309],
        ['Adapt chart height to legend height', 278],
        ['Export charts in excel sheet', 239],
        ['Toggle legend box', 235],
        ['Venn Diagram', 203],
        ['Add ability to change Rangeselector position', 182],
        ['Draggable legend box', 157],
        ['Sankey Diagram', 149],
        ['Add Navigation bar for Y-Axis in Highstock', 144],
        ['Grouped x-axis', 143],
        ['ReactJS plugin', 137],
        ['3D surface charts', 134],
        ['Draw lines over a stock chart, for analysis purpose', 118],
        ['Data module for database tables', 118],
        ['Draggable points', 117],
      ],
    },
  ],
  responsive: {
    rules: [{
      condition: {
        maxWidth: 500,
      },
      chartOptions: {
        chart: {
          type: 'bar',
          height: 700,
        },
        xAxis: {
          type: 'category',

          labels: {
            rotation: 0,
            style: {
              fontSize: '8px',
              fontFamily: '"Muli", sans-serif',

            },
          },
        },
      },
    }],
  },
};
