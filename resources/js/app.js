// require('./bootstrap');
import Vue from 'vue';
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue';
import routes from './router';
import store from './store';

Vue.component('app-component', require('./App.vue').default);
Vue.component('navigation', require('./components/Navbar.vue').default);

const app = new Vue({
    el: '#app',
    store,
    router: routes
});
