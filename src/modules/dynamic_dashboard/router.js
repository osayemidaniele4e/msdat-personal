export default [
  // make root route redirect to Health Outcomes Dashboard,
  {
    path: '/',
    redirect: '/dashboard/Health_Outcomes',
  },
  {
    path: '/dashboard/:name',
    component: () => import('./index.vue'),
    meta: {
      title: 'MSDAT PLATFORM', // The title of the page on the Header.This ia also changed dynamically
    },
  },
];
