<template>
    <div class="modal-wrapper px-3 py-2 border shadow">

        <div class="text-center mb-5" id="modal">
            <b-icon icon="exclamation-circle" font-scale="5" variant="danger"></b-icon>
        </div>

        <div class="my-3"></div>
        <div v-for="(error, index) in errors" :key="error[index]" class="row mb-1">
            <h5> {{ error }} </h5>
        </div>

        <div class="row mb-1 mt-4">
            <button @click="toggleModal" class="btn btn-success btn-block">OK</button>
        </div>

    </div>
</template>

<script>
export default {
    computed: {
        errors() {
            return this.$store.getters['warningModule/getRegister422'];
        }
    },

    methods: {
        toggleModal() {
            this.$store.commit('warningModule/TOGGLE_HAS_ERROR_422');
        }
    }
}
</script>

<style>
.modal-wrapper {
        margin: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
        background: whitesmoke;
    }
</style>
