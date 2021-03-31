import Dashboard from '../pages/Dashboard.vue';
import VoterLogin from '../pages/VoterLogin.vue';
import Ballot from '../pages/Ballot.vue';
import VoterCreation from '../pages/VoterCreation.vue';
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