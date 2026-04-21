export default {
  chart: {
    type: 'bar',
    zoomType: 'xy',
    height: 800,
    reflow: true,
    spacingRight: 30,
    marginRight: 30,
    // Animation enabled by default for smooth transitions
    animation: true,
  },
  lang: {
    noData: 'The data you have selected is not available, please select another',
    contextButtonTitle: 'Download',
  },
  navigation: {
    buttonOptions: {
      symbolSize: 16,
    },
  },
  exporting: {
    enabled: true,
    buttons: {
      contextButton: {
        symbol: 'url(/download-icon.svg)',
        title: 'Download',
        symbolSize: 22,
        width: 26,
        height: 26,
        symbolX: 21,
        symbolY: 21,
      },
    },
    chartOptions: {
      chart: {
        width: 1200,
        height: 800,
      },
      // title: {
      //   text: '',
      //   x: -20,
      // },
      legend: {
        align: 'left',
        width: '70%',
        // verticalAlign: 'middle',
        // layout: 'vertical'
        itemStyle: {
          fontSize: '10px',
          fontFamily: '"Work Sans", sans-serif',
          fontWeight: 400,
        },
      },
      chart: {
        width: 1200,
        height: 800,
        // plotBackground: 'https://i.stack.imgur.com/E1r9X.png', https://gitlab.com/e4e-webdev/msdat/-/blob/feature/george-chart-watermark/src/assets/img/watermark.png
        events: {
          load() {
            this.renderer
              .image('https://i.imgur.com/yyqklZM.png', 150, 62, 230, 53)
              .attr({
                zIndex: 1000,
                x: '10%',
                y: '10%',
                width: '116',
                height: '25',
              })
              .add();
            const xPercentage = 90; // Adjust as needed
            const yPercentage = 120; // Adjust as needed

            const chartWidth = this.plotWidth;
            const chartHeight = this.plotHeight;

            const x = (chartWidth / 100) * xPercentage;
            const y = (chartHeight / 100) * yPercentage;

            // Add watermark text at the specified percentage positions
            this.renderer
              .text('Source: MSDAT', x, y)
              .css({
                color: 'rgba(0, 0, 0, 0.3)', // Adjust the color and opacity of the watermark
                fontSize: '16px', // Adjust the font size
                fontFamily: '"Work Sans", sans-serif',
                fontWeight: 'normal',
                textAlign: 'right',
              })
              .add();
          },
        },
      },
    },
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.y:.1f}</b><br/>',
  },
  title: {
    enabled: false,
    text: '',
    style: {
      fontSize: '13px',
      fontFamily: '"Work Sans", sans-serif',
      fontWeight: 'normal',
    },
  },
  subtitle: {
    enabled: false,
    // text: '',
    style: {
      fontSize: '13px',
      fontFamily: '"Work Sans", sans-serif',
    },
  },
  xAxis: {
    type: 'category',
    labels: {
      // rotation: 180,
      style: {
        fontSize: '11px',
        fontFamily: '"Work Sans", sans-serif',
        fontWeight: 'normal',
        whiteSpace: 'nowrap',
        maxWidth: '20px',
      },
      maxWidth: 20,
    },
    tickLength: 5,
    tickWidth: 1,
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Values',
      style: {
        fontSize: '13px',
        fontFamily: '"Work Sans", sans-serif',
      },
    },
    gridLineWidth: 1,
    gridLineColor: '#d3d3d3',
    tickAmount: 6,
    // minRange: 10,

    labels: {
      // rotation: -90,
      // format: '{value} %',
      style: {
        fontSize: '11px',
        fontFamily: '"Work Sans", sans-serif',
        whiteSpace: 'normal',
      },
    },
    plotLines: [
      {
        width: 2,
        // value: 80,
        // name: 'NT'
      },
    ],
  },
  // responsive: {
  //   rules: [{
  //     condition: {
  //       maxWidth: 500,
  //     },
  //   }],
  // },
  credits: {
    enabled: false,
  },
  legend: {
    align: 'center',
    // verticalAlign: 'middle',
    // layout: 'vertical'
    itemStyle: {
      fontSize: '11px',
      fontFamily: '"Work Sans", sans-serif',
      fontWeight: 400,
    },
  },
  responsive: {
    rules: [
      {
        condition: {
          callback() {
            return true; // Always apply these rules
          },
        },
        chartOptions: {
          chart: {
            spacingRight: 25,
          },
          legend: {
            align: 'center',
            verticalAlign: 'bottom',
          },
        },
      },
    ],
  },
  plotOptions: {
    column: {
      pointPadding: 0,
      borderWidth: 0,
      groupPadding: 0,
      shadow: false,
      pointPlacement: 'on',
    },
    series: {
      grouping: false,
      pointWidth: 10,
      connectNulls: true,
      pointPlacement: 'between',
      dataLabels: {},
      borderWidth: 0,
    },
    bar: {
      dataLabels: {
        enabled: true,
        // format: '{y}%',
      },
    },
  },
  series: [
    {
      // name: 'Votes',
      // color: '#00AC40',
      data: [
        //     ['Gantt chart', 1000],
        //     ['Autocalculation ', 575],
        //     ['Allow navigator ', 523],
        //     ['Implement ', 427],
        //     ['Multiple ', 399],
        //     ['Stacked', 309],
        //     ['Adapt ', 278],
        //     ['Export ', 239],
        //     ['Toggle l', 235],
        //     ['Venn Diagram', 203],
        //     ['Add ability', 182],
        //     ['Draggable', 157],
        //     ['Sankey Diagram', 149],
        //     ['Add Navigation', 144],
        //     ['Grouped x-axis', 143],
        //     ['ReactJS plugin', 137],
        //     ['3D surface charts', 134],
        //     {
        //       name: 'HEHEH',
        //       y: 216.4,
        //       color: 'blue',
        //       marker: { fillColor: 'red', radius: 10 },
        //     },
        //     ['Draw lines', 118],
        //     ['Data module', 118],
        //     ['Draggable points', 117],
        //   ],
        // },
        // {
        //   name: ' Not Votes',
        //   color: 'gray',
        //   data: [
        //     ['Gantt chart1', 1000],
        //     ['Autocalculation1 ', 575],
        //     ['Allow navigator1 ', 523],
        //     ['Implement1 ', 427],
        //     ['Multiple1 ', 399],
        //     ['Stacked1', 309],
        //     ['Adap1t ', 278],
        //     ['Export1 ', 239],
        //     ['Toggle 1l', 235],
        //     ['Venn Diagram1', 203],
        //     ['Add ability1', 182],
        //     ['Draggable1', 157],
        //     ['Sankey Diagram1', 149],
        //     ['Add Navigation1', 144],
        //     ['Grouped x-axis1', 143],
        //     ['ReactJS plugin1', 137],
        //     ['3D surface charts1', 134],
        //     {
        //       name: 'HEHEH!',
        //       y: 216.4,
        //       color: 'blue',
        //       marker: { fillColor: 'red', radius: 10 },
        //     },
        //     ['Draw lines1', 118],
        //     ['Data module1', 118],
        //     ['Draggable points1', 117],
      ],
    },
  ],
  // responsive: {
  //   rules: [
  //     {
  //       condition: {
  //         maxWidth: 500,
  //       },
  //       chartOptions: {
  //         chart: {
  //           type: 'bar',
  //           height: 700,
  //         },
  //         xAxis: {
  //           type: 'category',

  //           labels: {
  //             rotation: 0,
  //             style: {
  //               fontSize: '10px',
  //               fontFamily: '"Muli", sans-serif',
  //             },
  //           },
  //         },
  //       },
  //     },
  //   ],
  // },
};
