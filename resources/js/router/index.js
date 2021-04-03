import Dashboard from '../pages/Dashboard.vue';
import CreateElection from '../pages/CreateElection.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';


import ElectionMain from '../pages/ElectionMain.vue';
import Overview from '../pages/Overview.vue';
import Settings from '../pages/Settings.vue';

import VoterLogin from '../pages/VoterLogin.vue';
import Ballot from '../pages/Ballot.vue';
import VoterCreation from '../pages/VoterCreation.vue';
import BallotCreation from '../pages/BallotCreation.vue'
import store from '../store';

function userAuth(to, from, next) {

    if(localStorage.getItem('access_token')) {
        if(!store.getters['userModule/getUser']) {
            console.log(store.getters['userModule/getUser']);
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
            path: '/',
            redirect: '/dashboard'
        },
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
            path: '/election/:electionId',
            name: 'election',
            component: ElectionMain,
            beforeEnter: userAuth,
            redirect: {name: 'overview'},
            children: [
                {
                    path: 'overview',
                    name: 'overview',
                    component: Overview,
                    beforeEnter: userAuth
                },
                {
                    path: 'settings',
                    name: 'settings',
                    component: Settings,
                    beforeEnter: userAuth
                },
                {
                    path:'voters',
                    name:'voters',
                    component: VoterCreation,
                    beforeEnter: userAuth
                },
                {
                    path:'ballot',
                    name:'ballot',
                    component: BallotCreation
                },
            ]
        },


        // Francis routes workstation

        {
            path:'/voterlogin',
            name:'voterlogin',
            component: VoterLogin
        },
        // {
        //     path:'/ballot',
        //     name:'/ballot',
        //     component: Ballot
        // },



        /////////////////////////////

        // Rommel routes workstation

        // {
        //     path: '/overview',
        //     name: 'overview',
        //     component: Overview
        // },
        // {
        //     path: '/settings',
        //     name: 'settings',
        //     component: Settings
        // },

        /////////////////////////////

    ]
}
