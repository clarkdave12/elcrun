import axios from "axios";

export default {

    namespaced: true,

    state: {
        elections: []
    },

    getters: {

        getElections: state => state.elections

    },

    mutations: {

        SET_ELECTIONS: (state, elections) => state.elections = elections

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
        }

    }

}
