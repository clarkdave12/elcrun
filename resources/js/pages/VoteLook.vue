<template>
    <div class="container-fluid">
        <h1> Votes </h1>
        <div class="row">
            <div class="col-6">
                <label for="">Receipt Number</label>
                <input v-model="checksum" type="text" name="" id="" class="form-control">
                <button class="btn btn-success mt-2" @click="checkVoted">Continue</button>
            </div>
        </div>

        <div class="row">
            <div v-for="question in questions" :key="question.id" class="col-12 mx-auto mt-3">

                <div class="border shadow bg-primary w-100 py-2 px-3">
                    <h4 class="my-auto text-light"> {{question.title}} </h4>
                </div>

                <div class="w-100 mb-3 px-3 border shadow py-3">

                    <div v-html="question.description" class="w-100 mt-1 mb-2 border shadow py-2 px-3"></div>

                    <div v-for="choice in question.achoices" :key="choice.id">
                        <div v-if="!choice.chosen" class="w-100 mb-2 py-2 border shadow d-flex" >
                            <p class="my-auto mr-4 ml-3 h3"><b-icon icon="check-circle"></b-icon></p>
                            <img :src="choice.image" class="image my-auto">
                            <h3 class="my-auto ml-4"> {{ choice.title }} </h3>
                            <div role="button" class="ml-auto my-auto mr-5">
                                <h3 class="h1"><b-icon icon="info-circle-fill" variant="primary"></b-icon></h3>
                            </div>
                        </div>

                        <div v-else class="w-100 mb-2 py-2 border shadow d-flex bg-primary">
                            <p class="my-auto mr-4 ml-3 h3"><b-icon icon="check-circle-fill" variant="light"></b-icon></p>
                            <img :src="choice.image" class="image my-auto">
                            <h3 class="my-auto ml-4 text-white"> {{ choice.title }} </h3>
                            <div role="button" class="ml-auto my-auto mr-5">
                                <h3 class="h1"><b-icon icon="info-circle-fill" variant="light"></b-icon></h3>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
export default {

    data() {
        return {
            checksum: '',
            questions: []
        }
    },

    methods: {

        checkVoted() {

            axios({
                method: 'POST',
                url: '/api/get_vote_history',
                data: {
                    receipt_number: this.checksum,
                },
                headers: {
                    Acceptt: 'application/json'
                }
            })
            .then(response => {
                this.questions = response.data.questions;
            })
            .catch(error => {
                console.log(error.response);
            });

        }

    }

}
</script>

<style>
.image {
    max-width: 100px;
    max-height: 100px;
}

</style>
