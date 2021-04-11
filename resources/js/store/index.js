import Vue from 'vue';
import Vuex from 'vuex';

import userModule from './modules/user.js';
import electionModule from './modules/election.js';
import voterModule from './modules/voter.js';
import ballotModule from './modules/ballot.js';

import votingModule from './modules/voting.js';

import warningModule from './modules/warnings.js';
import UIModule from './modules/UIModule.js';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        userModule,
        electionModule,
        voterModule,
        ballotModule,

        votingModule,

        warningModule,
        UIModule,
    }

});
