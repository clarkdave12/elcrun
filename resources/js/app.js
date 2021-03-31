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
import store from './store';

Vue.component('app-component', require('./App.vue').default);
Vue.component('navigation', require('./components/Navbar.vue').default);
Vue.component('overview',require('./pages/Overview.vue').default);
Vue.component('settings',require('./pages/Settings.vue').default);

const app = new Vue({
    el: '#app',
    store,
    router: new VueRouter(routes)
});
