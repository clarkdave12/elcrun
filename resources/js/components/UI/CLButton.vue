<template>
    <div>
        <div v-if="success">
            <button v-if="clicked" class="btn btn-success" type="button" disabled>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Loading...
            </button>

            <button v-else @click="toggle" class="btn btn-success">
                {{ buttonLabel }}
            </button>
        </div>

        <div v-else-if="danger">
            <button v-if="clicked" class="btn btn-danger" type="button" disabled>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Loading...
            </button>

            <button v-else @click="toggle" class="btn btn-danger btn-block">
                {{ buttonLabel }}
            </button>
        </div>

        <div v-else>
            <button v-if="clicked" class="btn btn-success" type="button" disabled>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Loading...
            </button>

            <button v-else @click="toggle" class="btn btn-success">
                {{ buttonLabel }}
            </button>
        </div>

    </div>
</template>

<script>
export default {

    props: ['buttonLabel', 'danger', 'success'],

    computed: {
        clicked() {
            return this.$store.getters['UIModule/getLoadingButton'];
        }
    },

    methods: {
        toggle() {
            this.$store.commit('UIModule/SET_LOADING_BUTTON');
        }
    }
}
</script>
