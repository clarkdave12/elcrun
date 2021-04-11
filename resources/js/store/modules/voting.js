import axios from 'axios';

export default {

    namespaced: true,

    state: {
        voter: {},
        option: {},
        showOption: false,
        validated: ''
    },

    getters: {

        getVoter: state => state.voter,

        getOption: state => state.option,

        getShowOption: state => state.showOption,

        getValidated: state => state.validated,

    },

    mutations: {

        SET_VOTER: (state, voter) => state.voter = voter,

        SET_OPTION: (state, option) => state.option = option,

        TOGGLE_SHOW_OPTION: state => state.showOption = !state.showOption,

        SET_VALIDATED: (state, message) => state.validated = message,

    },

    actions: {

        login({}, payload) {

            return new Promise((resolve, reject) => {

                axios({
                    method: 'POST',
                    url: '/api/votes/' + payload.electionId,
                    data: payload.voter,
                    headers: {
                        Accept: 'application/json'
                    }
                })
                .then(response => {
                    localStorage.setItem('fingerprint', response.data.voter.comp_key);
                    resolve(response);
                })
                .catch(error => {
                    reject(error.response);
                })

            });
        },

        authenticateVoter({}, payload) {
            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url: '/api/votes/authenticate_voter',
                    data: payload,
                    headers: {
                        Accept: 'application/json'
                    }
                })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    console.log(error.response);
                    reject(error);
                });
            });
        },

        ballotValidation({commit}, questions) {
            let valid = true;
            questions.forEach(question => {
                let min = question.minimum;
                let max = question.maximum;
                let voted = 0;

                question.options.forEach(option => {
                    if(option.chosen) {
                        voted++;
                    }
                });

                if(min > voted) {
                    let message = 'You need to choose atleast ' + min + ' option from ' + question.title + ' question';
                    commit('SET_VALIDATED', message);
                    valid = false;
                }
                else if(max < voted) {
                    let message = 'You can only choose maximum of ' + max + ' options from ' + question.title + ' question';
                    commit('SET_VALIDATED', message);
                    valid =  false;
                }

            });

            if(valid)
                commit('SET_VALIDATED', 'valid');
        }

    }

}
