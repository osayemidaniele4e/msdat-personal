import { createRouter, createWebHistory } from 'vue-router';

import Login from './pages/auth/Login';
import InputDetails from './pages/dashboardDetails/InputDetails';
import Prefrences from './pages/dashboardDetails/Preferences'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Login },
        { path: '/login', component: Login },
        { path: '/inputDetails', component: InputDetails },
        { path: '/prefrences', component: Prefrences }
    ],
});

export default router