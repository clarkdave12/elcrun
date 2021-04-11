<template>
    <div class="modal-wrapper border shadow">
        <div class="row bg-primary w-100 mx-auto header py-2">
            <h4 class="my-auto text-light modal-title"> {{ option.title }} </h4>
            <span role="button" @click="toggleModal" class="h2 ml-auto text-light"><b-icon icon="x"></b-icon></span>
        </div>

        <div class="row w-100 mx-auto py-2 px-3">
            <div class="col-3">
                <img :src="option.image" class="image my-auto">
            </div>
            <div class="col-9">
                {{ option.short_description }}
            </div>
        </div>

    </div>
</template>

<script>
export default {

    computed: {
        option() {
            return this.$store.getters['votingModule/getOption'];
        }
    },

    methods: {
        toggleModal() {
            this.$store.commit('votingModule/TOGGLE_SHOW_OPTION');
        }
    }
}
</script>

<style>

.info{
    border-radius: 50%;
    height: 30px;
    width: 30px;
}

.header {
    border-radius: 10px 10px 0 0;
}

.modal-wrapper {
    margin: 0;
    border-radius: 10px;
    position: absolute;
    height: 40%;
    width: 50%;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    background: whitesmoke;
}

.image {
    max-width: 100px;
    max-height: 100px;
}

.modal-body {

}

</style>
