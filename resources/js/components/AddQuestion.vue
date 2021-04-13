<template>
    <div class="float-right container border shadow" id="wrapper">
        <div class="row py-3 pl-5 bg-primary">
            <div class="col-11">
                <h5 class="text-light">Add Ballot Question</h5>
            </div>
            <div class="col-1">
                <h5 @click="toggle" role="button" class="h2 text-light"><b-icon id="icon" class="float-right" icon="x"></b-icon></h5>
            </div>
        </div>

        <div class="row my-4 px-3">
            <span class="pt-2">
                Voters can select <b>maximum</b> of
            </span>
            <input v-model="question.maximum" type="number" class="form-control number-input mx-2" value="1">
            <span class="pt-2">
                 and a <b>minimum</b> of
            </span>
            <input v-model="question.minimum" type="number" class="form-control number-input mx-2" value="1">
        </div>

        <div class="row px-3 my-2">
            <label for="title"><h5>Title</h5></label>
            <input v-model="question.title" type="text" name="title" class="form-control" placeholder="New Question Title">
        </div>

        <label for="description" class="mt-4"><h5>Description</h5></label>
        <vue-editor id="editor" v-model="question.description" @imageAdded="imageAdded"></vue-editor>

        <div class="row mx-1 px-3 py-2 my-5 border" id="opts">
            <h5>Other Options</h5>
        </div>

        <div class="row px-3 py-2 my-2">
            <!-- <b-button @click="saveQuestion" class="mr-2" variant="success">Save</b-button> -->
            <div class="mr-2">
                <div @click="saveQuestion">
                    <cl-button buttonLabel="Save" class="float-start"></cl-button>
                </div>
                <button @click="toggle" type="button" class="btn btn-danger float-end">Cancel</button>
            </div>

        </div>

    </div>
</template>

<script>

import {VueEditor} from 'vue2-editor';
import axios from 'axios';
import CLButton from '../components/UI/CLButton';

export default {

    components: {
        VueEditor,
        'cl-button': CLButton,
    },

    data() {
        return {
            question: {
                tite: '',
                description: '',
                minimum: 1,
                maximum: 1
            }
        }
    },

    methods: {

        toggle() {
            this.$store.commit('ballotModule/SET_ADDING');
        },

        saveQuestion() {
            const id = this.$route.params.electionId;
            const payload = {
                electionId: id,
                question: this.question
            }

            this.$store.dispatch('ballotModule/addQuestion', payload)
                .then(() => {
                    this.$store.dispatch('ballotModule/getQuestions', this.$route.params.electionId)
                        .then(() => {
                            this.$store.commit('UIModule/SET_LOADING_BUTTON');
                            this.toggle();
                        })
                        .catch(error => {
                            this.$store.commit('UIModule/SET_LOADING_BUTTON');
                            console.log(error.response);
                        })
                })
                .catch(error => {
                    let message = '';
                    this.$store.commit('UIModule/SET_LOADING_BUTTON');

                    if(error.data.errors.title) {
                        message = error.data.errors.title[0];
                        this.$store.commit('warningModule/SET_ERROR_MESSAGE', message);
                        this.$store.commit('warningModule/SET_ERROR');
                    }

                    else if(error.data.errors.description) {
                        message = error.data.errors.description[0];
                        this.$store.commit('warningModule/SET_ERROR_MESSAGE', message);
                        this.$store.commit('warningModule/SET_ERROR');
                    }

                })
        },

        imageAdded(file, Editor, cursorLocation, resetUploader) {

            var formData = new FormData();
            formData.append('image', file);

            axios({
                method: 'POST',
                url: '/api/editor_upload',
                data: formData,
            })
            .then(response => {
                const imageUrl = response.data.url;
                Editor.insertEmbed(cursorLocation, 'image', imageUrl);
                resetUploader();
            })
            .catch(error => {
                console.log(error.response);
            })

        }

    }

}
</script>

<style>
#wrapper {
    position: absolute;
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

#editor {
    height: 100%;
    width: 100%;
}

</style>
