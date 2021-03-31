import Dashboard from '../pages/Dashboard.vue';
import CreateElection from '../pages/CreateElection.vue';
import AccountPage from '../pages/AccountPAge.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import Overview from '../pages/Overview.vue';
import Settings from '../pages/Settings.vue';

import VoterLogin from '../pages/VoterLogin.vue';
import Ballot from '../pages/Ballot.vue';
import VoterCreation from '../pages/VoterCreation.vue';


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
        },
        {
            path:'/',
            redirect:'/voterlogin'
        },
        {
            path:'/voterlogin',
            name:'voterlogin',
            component: VoterLogin
        },
        {
            path:'/',
            redirect:'/ballot'
        },
        {
            path:'/ballot',
            name:'/ballot',
            component: Ballot
        },
        {
            path:'/',
            redirect:'/votercreation'
        },
        {
            path:'/votercreation',
            name:'/votercreation',
            component: VoterCreation
        }
    ]
}
