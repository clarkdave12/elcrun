import axios from "axios";

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
                        Authorization: 'Bearer ' + localStorage.getItem('access_token')
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
                        Authorization: 'Bearer ' + localStorage.getItem('access_token')
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
                        Authorization: 'Bearer ' + localStorage.getItem('access_token')
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
        }

    }

}
