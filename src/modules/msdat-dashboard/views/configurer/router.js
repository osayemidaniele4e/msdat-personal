import VueCookies from 'vue-cookies';

const user = VueCookies.get('msdat-user-details');

const routes = [
  {
    path: '/configure',
    name: 'configurer-landing',
    component: () => import('./layout.vue'),
    meta: {
      title: 'Configurer',
    },
    children: [
      {
        path: 'account',
        name: 'configurer-account',
        beforeEnter: (to, from, next) => {
          if (user) return next('/configure/user/customize');
          return next();
        },
        component: () => import('./account.vue'),
        meta: {
          title: 'Configurer',
          label: 'Create Account',
          step: 1,
        },
      },
      {
        path: 'user',
        name: 'configurer',
        redirect: '/configure/user/customize',
        beforeEnter: (to, from, next) => {
          if (!user) return next('/configure/account');
          return next();
        },
        component: () => import('./authenticated.vue'),
        children: [
          {
            path: 'customize',
            name: 'configure-customize',
            component: () => import('./customize.vue'),
            meta: {
              title: 'Configurer',
              label: 'Customize MSDAT',
              step: 2,
            },
          },
          {
            path: 'appearance',
            name: 'configure-appearance',
            component: () => import('./appearance.vue'),
            meta: {
              title: 'Configurer',
              label: 'Appearance',
              step: 3,
            },
          },
          {
            path: 'settings',
            name: 'configure-settings',
            component: () => import('./settings.vue'),
            meta: {
              title: 'Configurer',
              label: 'Settings',
              step: 4,
            },
          },
          {
            path: 'preview',
            name: 'configure-preview',
            component: () => import('./preview.vue'),
            meta: {
              title: 'Configurer',
              label: 'Preview',
              step: 5,
            },
          },
        ],
      },
    ],
  },
];

function mapSteps(rts) {
  const steps = [];
  rts.forEach((route) => {
    if (route.meta?.step) steps.push(route.meta);
    if (route.children) steps.push(...mapSteps(route.children));
  });
  return steps;
}

export const steps = mapSteps(routes);

export default routes;
