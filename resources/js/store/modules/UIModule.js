
export default {
    namespaced: true,

    state: {
        loadingButton: false,
    },

    getters: {
        getLoadingButton: state => state.loadingButton,
    },

    mutations: {
        SET_LOADING_BUTTON: state => state.loadingButton = !state.loadingButton,
    },
}
