import store from '@/store';
import Swal from 'sweetalert2';
import adminsidenav from './adminsidenav.vue';

export default [
  {
    path: '/admin',
    name: 'Admin',
    component: adminsidenav,
    meta: {
      requiresAuth: true,
      title: 'Admin Page',
      role: 'admin',
    },
    beforeEnter: (to, from, next) => {
      const user = store.getters['AUTH_STORE/getUser'];
      console.log('User:', user);
      console.log('User role:', user?.role?.value);

      if (user?.role?.value === 'admin') {
        next();
      } else {
        const warningMessage = 'Access denied: User does not have admin privileges';
        console.warn(warningMessage);

        Swal.fire({
          icon: 'warning',
          title: 'Access Denied',
          text: warningMessage,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        }).then(() => {
          next('/');
        });
      }
    },
  },
];
