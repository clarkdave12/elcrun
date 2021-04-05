import axios from 'axios';

export default {

    namespaced: true,

    state: {
        voter: {}
    },

    getters: {

        getVoter: state => state.voter

    },

    mutations: {

        SET_VOTER: (state, voter) => state.voter = voter,

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
        }

    }

}
