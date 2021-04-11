// require('./bootstrap');
import Vue from 'vue';
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue';

// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);


import routes from './router';
import store from './store';

import VueApexCharts from 'vue-apexcharts';

Vue.use(VueApexCharts);

Vue.component('app-component', require('./App.vue').default);
Vue.component('navigation', require('./components/Navbar.vue').default);
Vue.component('apexchart', VueApexCharts);

const app = new Vue({
    el: '#app',
    store,
    router: routes
});
