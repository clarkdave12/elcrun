import Dashboard from '../pages/Dashboard.vue';

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
        }
    ]
}