import Dashboard from '../pages/Dashboard.vue';
<<<<<<< HEAD
import CreateElection from '../pages/CreateElection.vue';
import AccountPage from '../pages/AccountPAge.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';

import store from '../store';

function userAuth(to, from, next) {

    if(localStorage.getItem('access_token')) {
        if(store.getters['userModule/getUser'] != {}) {
            next();
        }
        else {
            store.dispatch('userModule/getCurrentUser')
                .then(() => {
                    next();
                })
                .catch(() => {
                    next('/login');
                });
        }
    }
    else {
        next('/login');
    }

}
=======
import Overview from '../pages/Overview.vue';
import Settings from '../pages/Settings.vue';
>>>>>>> origin/OverViewAndSettings

export default {
    mode: 'history',

    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/dashboard',
            name: 'dashboard',
<<<<<<< HEAD
            component: Dashboard,
            beforeEnter: userAuth
        },
        {
            path: '/election/create',
            name: 'create_election',
            component: CreateElection,
            beforeEnter: userAuth
=======
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
>>>>>>> origin/OverViewAndSettings
        }
    ]
}
