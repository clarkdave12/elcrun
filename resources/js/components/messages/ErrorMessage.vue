<template>
    <div class="modal-wrapper px-5 py-5 border shadow">

        <div class="text-center mb-3" id="modal">
            <b-icon icon="exclamation-circle" font-scale="5" variant="danger"></b-icon>
        </div>

        <div class="mb-4">
            <h5 class="text-center"> {{ errorMessage }} </h5>
        </div>

        <div class="row">
            <button @click="toggle" class="btn btn-success btn-block">OK</button>
        </div>
    </div>
</template>

<script>
export default {

    computed: {

        errorMessage() {
            return this.$store.getters['warningModule/getErrorMessage'];
        }

    },

    methods: {
        toggle() {
            this.$store.commit('warningModule/SET_ERROR');
        }
    }

}
</script>

<style>
.modal-wrappers {

        margin: 0;
        position: absolute;
        max-height: 900px;
        top: 50%;
        left: 50%;
        max-width: 400px;
        transform: translate(-50%, -50%);
        z-index: 1;
        background: whitesmoke;
    }

.modal-wrapper {
    position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

.button-wrapper {
    bottom: 0;
}
</style>
