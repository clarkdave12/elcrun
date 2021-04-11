import axios from "axios";
import cfg from '../../config';

export default {
    namespaced: true,
    state: {
        user: {}
    },
    getters: {
        getUser: state => state.user
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user;
        }
    },
    actions: {

        loginUser({commit}, user) {
            return new Promise((resolve, reject) => {
                axios.post('/api/login', {
                    email: user.email,
                    password: user.password
                })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
            });
        },

        registerUser({}, user) {
            return new Promise((resolve, reject) => {
                axios.post('/api/register', {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    password_confirmation: user.passwordConfirmation
                })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
            });
        },

        getCurrentUser({commit}) {

            return new Promise((resolve, reject) => {

                axios({
                    method: 'GET',
                    url: '/api/user',
                    headers: {
                        Authorization: cfg.TOKEN
                    }
                })
                .then(response => {
                    commit('SET_USER', response.data);
                    resolve(response);
                })
                .catch(error => {
                    // console.log(error.response);
                    reject(error);
                });

                // axios.post('/api/get_current_user', [], { headers: { Authorization: cfg.TOKEN }})
                //     .then(response => {
                //         commit('SET_USER', response.data.user);
                //         resolve(response.data.user);
                //     })
                //     .catch(error => {
                //         reject(error);
                //     });
            });
        }
    }
}
