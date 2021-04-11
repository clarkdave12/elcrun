import axios from "axios";
import cfg from '../../config';

export default {

    namespaced: true,

    state: {
        elections: [],
        election: {}
    },

    getters: {

        getElections: state => state.elections,

        getElection: state => state.election

    },

    mutations: {

        SET_ELECTIONS: (state, elections) => state.elections = elections,

        SET_ELECTION: (state, election) => state.election = election

    },

    actions: {

        addElection({}, election) {
            return new Promise((resolve, reject) => {
                axios.post('/api/elections', election, {
                    headers: {
                        Authorization: cfg.TOKEN
                    }
                })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                })
            });
        },

        getElections({commit}) {
            return new Promise((resolve, reject) => {

                axios({
                    method: 'GET',
                    url: '/api/elections',
                    data: [],
                    headers: {
                        Authorization: cfg.TOKEN
                    }
                })
                .then(response => {
                    commit('SET_ELECTIONS', response.data.elections)
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                })
            });
        },

        getElectionById({commit}, id) {
            return new Promise((resolve, reject) => {
                axios({
                    method: 'GET',
                    url: '/api/elections/' + id,
                    headers: {
                        Authorization: cfg.TOKEN
                    }
                })
                .then(response => {
                    console.log(response.data.election);
                    commit('SET_ELECTION', response.data.election);
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                })
            });
        },

        duplicateElection({}, id) {
            return new Promise((resolve, reject) => {

                axios({
                    method: 'POST',
                    url: '/api/duplicate_election/' + id,
                    headers: {
                        Authorization: cfg.TOKEN,
                        Accept: 'application/json'
                    }
                })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });

            });
        },

        deleteElection({}, id) {
            return new Promise((resolve, reject) => {

                axios({
                    method: 'DELETE',
                    url: '/api/delete_election/' + id,
                    headers: {
                        Authorization: cfg.TOKEN,
                    }
                })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });

            });
        }

    }

}
