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

import VoterLogin from '../pages/vote_start/VoterLogin.vue';
import VotingProcess from '../pages/vote_start/VotingProcess.vue';
import VoterCreation from '../pages/VoterCreation.vue';
import BallotCreation from '../pages/BallotCreation.vue'
import VoteStart from '../pages/vote_start/VoteStartMain.vue';
import Receipt from '../pages/vote_start/Receipt.vue';
import VoteView from '../pages/VoteLook.vue';

import RoutePass from '../pages/RoutePass.vue';

import store from '../store';
import axios from 'axios';

// function notAuth(to, from, next) {

//     if(localStorage.getItem('access_token')) {
//         if(!store.getters['userModule/getUser']) {
//             console.log(store.getters['userModule/getUser']);
//             next('/');
//         }
//         else {
//             store.dispatch('userModule/getCurrentUser')
//                 .then(() => {
//                     next('/');
//                 })
//                 .catch(() => {
//                     next();
//                 });
//         }
//     }
//     else {
//         next();
//     }
// }

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
            path: '/pass',
            name: 'route_pass',
            component: RoutePass
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard,
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
                    path: 'votes',
                    name: 'vote_view',
                    component: VoteView
                },
                {
                    path: 'settings',
                    name: 'settings',
                    component: Settings,
                    beforeEnter: userAuth,
                    redirect: {name: 'general'},
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
                            name:'voter_settings',
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

        // Rye routes workstation ===============




        //=======================================






        // Francis routes workstation ===========

        {
            path: '/vote/:electionId',
            name: 'vote_start',
            component: VoteStart,
            redirect: { name: 'voter_login' },

            children: [
                {
                    path:'login',
                    name:'voter_login',
                    component: VoterLogin,
                },
                {
                    path:'voting',
                    name:'voting_process',
                    component: VotingProcess,
                },
                {
                    path: 'receipt',
                    name: 'voting_receipt',
                    component: Receipt,
                }
            ]
        },

        //=======================================






        // Rommel routes workstation ============





        //=======================================

    ]
}
