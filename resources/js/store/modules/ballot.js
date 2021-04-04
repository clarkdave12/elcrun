import axios from "axios";
import cfg from '../../config';

export default {
    namespaced: true,

    state: {

        adding: false,
        addingOption: false,
        updatingOption: false,
        updatingQuestion: false,
        questions: [],
        question: {},
        option: {}
    },

    getters: {

        getAdding: state => state.adding,

        getAddingOption: state => state.addingOption,

        getUpdatingOption: state => state.updatingOption,

        getUpdatingQuestion: state => state.updatingQuestion,

        getQuestions: state => state.questions,

        getQuestion: state => state.question,

        getOption: state => state.option,

    },

    mutations: {

        SET_ADDING: (state) => state.adding = !state.adding,

        SET_ADDING_OPTION: (state) => state.addingOption = !state.addingOption,

        SET_UPDATING_OPTION: (state) => state.updatingOption = !state.updatingOption,

        SET_UPDATING_QUESTION: (state) => state.updatingQuestion = !state.updatingQuestion,

        SET_QUESTIONS: (state, questions) => state.questions = questions,

        SET_QUESTION: (state, question) => state.question = question,

        SET_OPTION: (state, option) => state.option = option,

        SET_OPTION_IMAGE: (state, image) => state.option.image = image,

    },

    actions: {

        addQuestion({}, payload) {

            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url: '/api/ballot/' + payload.electionId,
                    data: payload.question,
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
                    if(error.response) {
                        console.log(error.response);
                        reject(error.response);
                    }
                    reject(error);
                });
            });

        },

        getQuestions({commit}, electionId) {

            return new Promise((resolve, reject) => {

                axios({
                    method: 'GET',
                    url: '/api/ballot/' + electionId,
                    headers: {
                        Authorization: cfg.TOKEN
                    }
                })
                .then(response => {
                    commit('SET_QUESTIONS', response.data.questions);
                    resolve(response);
                })
                .catch(error => {
                    console.log(error);
                });

            });

        },

        updateQuestion({}, payload) {

            return new Promise((resolve, reject) => {

                axios({
                    method: 'PUT',
                    url: '/api/ballot/' + payload.electionId + '/' + payload.questionId,
                    data: payload.question,
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

        deleteQuestion({}, payload) {

            return new Promise((resolve, reject) => {

                axios({
                    method: 'DELETE',
                    url: '/api/ballot/' + payload.electionId + '/' + payload.questionId,
                    headers: {
                        Authorization: cfg.TOKEN
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

        clearOptions({}, payload) {
            return new Promise((resolve, reject) => {

                axios({
                    method: 'DELETE',
                    url: '/api/ballot/clear_options/' + payload.electionId + '/' + payload.questionId,
                    headers: {
                        Authorization: cfg.TOKEN
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

        addOption({commit}, payload) {

            return new Promise((resolve, reject) => {

                axios({
                    method: 'POST',
                    url: '/api/question/option/' + payload.questionId,
                    data: payload.option,
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
                    console.log(error.response);
                    reject(error);
                });

            });

        },

        updateOption({}, payload) {

            return new Promise((resolve, reject) => {

                axios({
                    method: 'PUT',
                    url: '/api/question/option/' + payload.electionId + '/' + payload.option.id,
                    data: payload.option,
                    headers: {
                        Authorization: cfg.TOKEN
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

        deleteOption({}, payload) {

            return new Promise((resolve, reject) => {

                axios({
                    method: 'DELETE',
                    url: '/api/question/option/' + payload.electionId + '/' + payload.optionId,
                    headers: {
                        Authorization: cfg.TOKEN
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
