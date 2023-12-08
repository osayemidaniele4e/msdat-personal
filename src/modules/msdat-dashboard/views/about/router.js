import index from './index.vue';
import Testimonials from './Testimonials.vue';

export default [
  {
    path: '/about',
    name: 'About',
    component: index,
    meta: {
      title: 'About',
    },
  },
  {
    path: '/testimonials',
    name: 'Testimonials',
    component: Testimonials,
    meta: {
      title: 'Testimonials',
    },
  },
];
