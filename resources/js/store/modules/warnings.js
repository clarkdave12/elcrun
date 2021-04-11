export default {
    namespaced: true,
    state: {
        error_422: {
            hasError: false,
            register: ['Invalid Credentials']
        }
    },

    getters: {

        get422HasError: state => state.error_422.hasError,

        getRegister422: state => state.error_422.register,

    },
    mutations: {

        TOGGLE_HAS_ERROR_422: (state) => state.error_422.hasError = !state.error_422.hasError,

        SET_REGISTER_422: (state, messages) => state.error_422.register = messages
    }
}
