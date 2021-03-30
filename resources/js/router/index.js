import Dashboard from '../pages/Dashboard.vue';
import VoterLogin from '../pages/VoterLogin.vue';
import Ballot from '../pages/Ballot.vue';
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
        }
    ]
}