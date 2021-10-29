import introJs from 'intro.js';
import 'intro.js/introjs.css';
import tour from './tourOptions';
import './tour.css';

export default {
  methods: {
    runIntro() {
      introJs().addHints().setOptions({
        tooltipClass: 'customTooltip customTooltips',
        highlightClass: 'customHighlight customHighlights',
        disableInteraction: true,
        steps: tour.steps,
      }).start();
    },
  },
};
