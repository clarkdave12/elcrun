import axios from "axios"

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
                    localStorage.setItem('access_token', response.data.access_token);
                    commit('SET_USER', response.data.user);
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
            const token = localStorage.getItem('access_token');

            return new Promise((resolve, reject) => {
                axios.post('/api/get_current_user', [], { headers: { Authorization: 'Bearer ' + token }})
                    .then(response => {
                        commit('SET_USER', response.data.user);
                        resolve(response.data.user);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        }
    }
}
