export default [
  // make root route redirect to Health Outcomes Dashboard,
  {
    path: '/',
    redirect: '/dashboard/Health_Outcomes_and_Service_Coverage',
    meta: {
      title: 'Health Outcomes and Service Coverage',
    },
    // meta: {
    //   requiresAuth: true,
    // },
  },
  {
    path: '/advanced_analytics',
    component: () => import('../msdat-dashboard/views/analytics/landing.vue'),
    meta: {
      title: 'Advanced Analytics', // The title of the page on the Header.This ia also changed dynamically
    },
  },
  {
    path: '/dashboard/:name',
    component: () => import('./index.vue'),
    // meta: {
    //   title: 'MSDAT PLATFORM', // The title of the page on the Header.This ia also changed dynamically
    // },
    meta: (route) => ({
      title: route.params.name,
    }),
  },
];
