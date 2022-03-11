const img = require('./assets/onboarding/Onboarding_Asset_1.svg');
const img2 = require('./assets/onboarding/Onboarding_Asset_2.svg');

const steps = [
  {
    element: '.step-sections',
    intro: `Select different types of analysis combinations <br/> <img src="${img}" height= "40px"/><img src="${img2}" height= "40px"/> `,
    title: 'Sections',
    position: 'bottom',
  },
  {
    element: '.step-controls ',
    intro: `Controls all sections and variables from the control panel,  it changes per section. <br/> <img src="${img}" height= "40px"/><img src="${img2}" height= "40px"/>`,
    title: 'Controls',
    position: 'bottom',
  },
  {
    element: '.step-indicator',
    intro: `Click here to select your desired health indicator from this drop-down menu <br/> <img src="${img}" height= "40px"/><img src="${img2}" height= "40px"/> `,
    title: 'Indicator',
    position: 'bottom',
  },
  {
    element: '.step-location',
    intro: `Click here to select your desired location from the drop-down menu <br/> <img src="${img}" height= "40px"/><img src="${img2}" height= "40px"/> `,
    title: 'Location',
    position: 'bottom',
  },
  {
    element: '.step-datasource',
    intro: `Click on any of these data sources to change the currently visualized datasource <br/> <img src="${img}" height= "40px"/><img src="${img2}" height= "40px"/>`,
    title: 'Data source',
    position: 'bottom',
  },
  {
    element: '.table-indicators',
    intro: ` Click here to select your preferred related indicator from the drop-down menu <br/> <img src="${img}" height= "40px"/><img src="${img2}" height= "40px"/>`,
    title: 'Related Indicators',
    position: 'bottom',
  },
  {
    element: '.table-info-icon',
    intro: ` Click on any info icon on the platform for more information on the feature next to it <br/> <img src="${img}" height= "40px"/><img src="${img2}" height= "40px"/> `,
    position: 'bottom',
    title: 'Info Icons',
  },
  {
    element:
      ' div:nth-child(2) > div > div > div.card-body.work-sans.p-0 > div > div.col.p-2.bg-gray',
    intro: ` Toggle on the confidence range button to view data range from listed sources <br/> <img src="${img}" height= "40px"/><img src="${img2}" height= "40px"/> `,
    position: 'bottom',
    title: 'Confidence Range',
  },
];

export default { steps };
