import Dashboard from '../pages/Dashboard.vue';
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
            component: Dashboard,
            beforeEnter: userAuth
        },
        {
            path: '/election/create',
            name: 'create_election',
            component: CreateElection,
            beforeEnter: userAuth
        }
    ]
}
