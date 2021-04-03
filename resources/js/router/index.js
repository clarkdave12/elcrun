import Dashboard from '../pages/Dashboard.vue';
import CreateElection from '../pages/CreateElection.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';


import ElectionMain from '../pages/ElectionMain.vue';
import Overview from '../pages/Overview.vue';
import Settings from '../pages/Settings.vue';
import EmailSetting from '../components/settings/EmailSetting.vue';
import Messages from '../components/settings/Messages.vue'
import Duplicate from '../components/settings/Duplicate.vue'
import Delete from '../components/settings/Delete.vue'
import Voters from '../components/settings/Voters.vue'
import Results  from '../components/settings/Results.vue'
import DateComponent  from '../components/settings/Date.vue'
import General  from '../components/settings/General.vue'

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
                    beforeEnter: userAuth,
                    children: [
                        {
                            path:'messages',
                            name:'messages',
                            component: Messages
                        },
                        {
                            path:'email',
                            name:'email_setting',
                            component: EmailSetting
                        },
                        {
                            path:'duplicate',
                            name:'duplicate',
                            component: Duplicate
                        },
                        {
                            path:'delete',
                            name:'delete',
                            component: Delete
                        },
                        {
                            path:'voters',
                            name:'voters',
                            component: Voters
                        },
                        {
                            path:'results',
                            name:'results',
                            component: Results
                        },
                        {
                            path:'date',
                            name:'date',
                            component: DateComponent
                        },
                        {
                            path:'general',
                            name:'general',
                            component: General
                        },

                    ]

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
        {
            path:'/ballot',
            name:'/ballot',
            component: Ballot
        },





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
