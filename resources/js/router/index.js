import Dashboard from '../pages/Dashboard.vue';
import Overview from '../pages/Overview.vue';
import Settings from '../pages/Settings.vue';

export default {
    mode: 'history',

    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard
        },
        {
            path: '/',
            redirect: '/overview'
        },
        {
            path: '/overview',
            name: 'overview',
            component: Overview
        },
        {
            path: '/',
            redirect: '/settings'
        },
        {
            path: '/settings',
            name: 'settings',
            component: Settings
        }
    ]
}