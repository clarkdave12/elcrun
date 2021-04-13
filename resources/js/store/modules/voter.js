import axios from "axios";
import { reject } from "lodash";
import cfg from '../../config';

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

            return new Promise((resolve, reject) => {
                axios({
                    method: 'GET',
                    url: '/api/voters/' + electionId,
                    headers: {
                        Authorization: cfg.TOKEN
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

            return new Promise((resolve, reject) => {

                axios({
                    method: 'POST',
                    url: '/api/voters/' + payload.electionId,
                    data: payload.voter,
                    headers: {
                        Authorization: cfg.TOKEN,
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

            return new Promise((resolve, reject) => {

                axios({
                    method: 'PUT',
                    url: '/api/voters/' + payload.electionId,
                    data: payload.voter,
                    headers: {
                        Authorization: cfg.TOKEN,
                        Accept: 'application/json'
                    }
                })
                .then(response => {
                    console.log(response);
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });

            });
        },

        deleteVoter({}, payload) {

            return new Promise((resolve, reject) => {

                axios({
                    method: 'DELETE',
                    url: '/api/voters/' + payload.electionId + '/' + payload.id,
                    headers: {
                        Authorization: cfg.TOKEN
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
