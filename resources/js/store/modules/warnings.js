export default {
    namespaced: true,
    state: {
        error_422: {
            hasError: false,
            register: ['Invalid Credentials']
        },
        error: false,
        errorMessage: ''
    },

    getters: {

        get422HasError: state => state.error_422.hasError,

        getRegister422: state => state.error_422.register,

        getError: state => state.error,

        getErrorMessage: state => state.errorMessage,

    },
    mutations: {

        TOGGLE_HAS_ERROR_422: (state) => state.error_422.hasError = !state.error_422.hasError,

        SET_REGISTER_422: (state, messages) => state.error_422.register = messages,

        SET_ERROR: state => state.error = !state.error,

        SET_ERROR_MESSAGE: (state, message) => state.errorMessage = message,
    }
}
