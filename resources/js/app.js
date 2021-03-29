// require('./bootstrap');
import Vue from 'vue';
import VueRouter from 'vue-router';
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue';

Vue.use(VueRouter);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);


import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue';
import routes from './router';


Vue.component('app-component', require('./App.vue').default);
Vue.component('navigation', require('./components/Navbar.vue').default);

const app = new Vue({
    el: '#app',
    router: new VueRouter(routes)
});
