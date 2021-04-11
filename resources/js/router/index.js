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

import Vue from 'vue';
import Router from 'vue-router';

// function notAuth(to, from, next) {

//     if(localStorage.getItem('access_token')) {
//         next('/');
//     }
//     else {
//         next();
//     }


// }

// function userAuth(to, from, next) {

//     if(!store.getters['userModule/getUser']) {

//         store.dispatch('userModule/getCurrentUser', localStorage.getItem('access_token'))
//                 .then(() => {
//                     next();
//                 })
//                 .catch(() => {
//                     console.log('error guard');
//                     next('/login');
//                 });
//     }
//     else {
//         next()
//     }
// }


Vue.use(Router);

const router = new Router({
    mode: 'history',

    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/',
            redirect: '/dashboard',
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard,
            meta: { requireUser: true }
        },
        {
            path: '/election/create',
            name: 'create_election',
            component: CreateElection,
            meta: { requireUser: true }
        },
        {
            path: '/election/:electionId',
            name: 'election',
            component: ElectionMain,
            redirect: {name: 'overview'},
            meta: { requireUser: true },
            children: [
                {
                    path: 'overview',
                    name: 'overview',
                    component: Overview
                },
                {
                    path: 'votes',
                    name: 'vote_view',
                    component: VoteView
                },
                {
                    path:'voters',
                    name:'voters',
                    component: VoterCreation,
                },
                {
                    path:'ballot',
                    name:'ballot',
                    component: BallotCreation,
                },
                {
                    path: 'settings',
                    name: 'settings',
                    component: Settings,
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

                }
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

});


router.beforeEach((to, from, next) => {

    if(to.matched.some(record => record.meta.requireUser)) {

        if(localStorage.getItem('access_token')) {

            store.dispatch('userModule/getCurrentUser')
                .then(response => {
                    console.log(response.data);
                    store.commit('userModule/SET_USER', response.data);
                    next();
                })
                .catch(error => {
                    console.log(error.response);
                    router.replace({name: 'register'});
                });

        }
        else {
            router.replace({name: 'register'});
        }

    }
    else {
        next();
    }

});

export default router;
