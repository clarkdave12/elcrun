import axios from "axios";
import { reject } from "lodash";

export default {
    namespaced: true,

    state: {
        adding: false,
        updating: false,
        voters: [],
        voter: {}
    },
    getters: {

        getVoters: state => state.voters,

        getVoter: state => state.voter,

        getAdding: state => state.adding,

        getUpdating: state => state.updating

    },

    mutations: {

        SET_VOTERS: (state, voters) => state.voters = voters,

        SET_VOTER: (state, voter) => state.voter = voter,

        SET_ADDING: (state) => state.adding = !state.adding,

        SET_UPDATING: (state) => state.updating = !state.updating,

        ADD_VOTER: (state, voter) => state.voters.push(voter)
    },

    actions: {

        getVoters({commit}, electionId) {
            const token = 'Bearer ' + localStorage.getItem('access_token');
            return new Promise((resolve, reject) => {
                axios({
                    method: 'GET',
                    url: '/api/voters/' + electionId,
                    headers: {
                        Authorization: token
                    }
                })
                .then(response => {
                    commit('SET_VOTERS', response.data.voters);
                    resolve(response);
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                });
            })
        },

        addVoter({commit}, payload) {
            const token = 'Bearer ' + localStorage.getItem('access_token');

            return new Promise((resolve, reject) => {

                axios({
                    method: 'POST',
                    url: '/api/voters/' + payload.electionId,
                    data: payload.voter,
                    headers: {
                        Authorization: token,
                        Accept: 'application/json'
                    }
                })
                .then(response => {
                    console.log(response);
                    commit('ADD_VOTER', response.data.voter);
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });

            });
        },

        updateVoter({}, payload) {
            const token = 'Bearer ' + localStorage.getItem('access_token');

            return new Promise((resolve, reject) => {

                axios({
                    method: 'PUT',
                    url: '/api/voters/' + payload.electionId,
                    data: payload.voter,
                    headers: {
                        Authorization: token,
                        Accept: 'application/json'
                    }
                })
                .then(response => {
                    console.log(response);
                    resolve(response);
                })
                .catch(error => {
                    console.log(error);
                    reject(error);
                });

            });
        },

        deleteVoter({}, payload) {
            const token = 'Bearer ' + localStorage.getItem('access_token');

            return new Promise((resolve, reject) => {

                axios({
                    method: 'DELETE',
                    url: '/api/voters/' + payload.electionId + '/' + payload.id,
                    headers: {
                        Authorization: token
                    }
                })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error.response);
                })

            });
        }

    }
}
