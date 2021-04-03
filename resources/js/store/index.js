import Vue from 'vue';
import Vuex from 'vuex';

import userModule from './modules/user.js';
import electionModule from './modules/election.js';
import voterModule from './modules/voter.js';
import ballotModule from './modules/ballot.js';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        userModule,
        electionModule,
        voterModule,
        ballotModule
    }

});
