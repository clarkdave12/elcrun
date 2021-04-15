<template>
    <div class="float-right container border shadow" id="wrapper">
        <div class="row py-3 pl-5 bg-primary">
            <div class="col-11">
                <h5 class="text-light">Update Ballot Question</h5>
            </div>
            <div class="col-1">
                <!-- <h5 @click="toggle" role="button" class="h2 text-light"><b-icon id="icon" class="float-right" icon="x"></b-icon></h5> -->
                <b-button size="sm" variant="primary" class="float-right" @click="toggle"><h5><b-icon icon="x"></b-icon></h5></b-button>
            </div>
        </div>

        <div class="container">
            <div class="row row-cols-auto">
                <div class="col">
                    <span class="pt-2" id="texts"> Voters can select <b>maximum</b> of</span>
                </div>
                <div class="col">
                    <input v-model="question.maximum" type="number" class="form-control number-input mx-2" value="1">
                </div>
                <div class="col">
                    <span class="pt-2" id="texts"> and a <b>minimum</b> of</span>
                </div>
                <div class="col">
                    <input v-model="question.minimum" type="number" class="form-control number-input mx-2" value="1">
                </div>
            </div>
        </div>

        <div class="row px-3 my-2">
            <label for="title"><h5>Title</h5></label>
            <input v-model="question.title" type="text" name="title" class="form-control" placeholder="New Question Title">
        </div>

        <label for="description" class="mt-3"><h5>Description</h5></label>
        <vue-editor @imageAdded="imageAdded" v-model="question.description"></vue-editor>
        <!-- <textarea v-model="question.description" name="description" class="form-control" cols="30" rows="10"></textarea> -->

        <div class="row mx-1 px-3 py-2 my-2 border" id="opts">
            <h5>Other Options</h5>
        </div>

        <button type="button" @click="updateQuestion"  class="btn btn-success mt-2 mr-4">Save</button>
        <button type="button" @click="toggle"  class="btn btn-outline-dark mt-2 mr-4">Cancel</button>

    </div>
</template>

<script>

import {VueEditor} from 'vue2-editor';
import axios from 'axios';
import CLButton from '../components/UI/CLButton';

export default {

    components: {
        VueEditor,
        'cl-button': CLButton
    },

    computed: {
        question() {
            return this.$store.getters['ballotModule/getQuestion'];
        }
    },

    methods: {

        toggle() {
            this.$store.commit('ballotModule/SET_UPDATING_QUESTION');
        },

        updateQuestion() {

            const payload = {
                electionId: this.$route.params.electionId,
                questionId: this.question.id,
                question: this.question
            }

            this.$store.dispatch('ballotModule/updateQuestion', payload)
                .then(response => {
                    this.$store.dispatch('ballotModule/getQuestions', payload.electionId)
                        .then(() => {
                            this.$store.commit('UIModule/SET_LOADING_BUTTON');
                            this.$store.commit('ballotModule/SET_UPDATING_QUESTION');
                        })
                        .catch(error => {
                            this.$store.commit('UIModule/SET_LOADING_BUTTON');
                            console.log(error.response);
                        })
                })
                .catch(error => {
                    let message = '';
                    const errors = error.response.data.errors;

                    if(errors.title){
                         message = errors.title[0];
                    }

                    else if(errors.description){
                        message = errors.description[0];
                    }

                    this.$store.commit('warningModule/SET_ERROR_MESSAGE', message);
                    this.$store.commit('warningModule/SET_ERROR');
                })

        },

        imageAdded(file, Editor, cursorLocation, resetUploader) {

            var formData = new FormData();
            formData.append('image', file);

            axios({
                method: 'POST',
                url: '/api/editor_upload',
                data: formData,
                headers: {
                    Accept: 'application/json'
                }
            })
            .then(response => {
                console.log(response);
                const imageUrl = response.data.url;
                Editor.insertEmbed(cursorLocation, 'image', imageUrl);
                resetUploader();
            })
            .catch(error => {
                console.log(error.response);
            });

        }

    }

}
</script>

<style>
#wrapper {
    position: fixed;
    right: 0;
    top: 0;
    z-index: 1;
    height: 100vh;
    width: 60%;
    background: whitesmoke;
}

.number-input {
    width: 80px;
}

#opts {
    height: 35px;
}

</style>
