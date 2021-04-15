<template>
    <div class="float-right container border shadow" id="wrapper">

        <!-- HEADER SECTION /> -->
        <div class="row py-3 pl-5 bg-primary">
            <div class="col-11">
                <h5 class="text-light">Update Option</h5>
            </div>
            <div class="col-1">
                <!-- <h5 role="button" @click="toggle" class="h2 text-light"><b-icon id="icon" class="float-right" icon="x"></b-icon></h5> -->
                <b-button size="sm" variant="primary" class="float-right" @click="toggle"><h5><b-icon icon="x"></b-icon></h5></b-button>
            </div>
        </div>
        <!-- </ HEADER SECTION -->

        <div class="row pt-4 pl-3">

            <div class="col-12">
                <span><b>Question</b></span> <br>
                <span>New Multiple choice question</span>
            </div>

            <div class="col-sm-12 col-md-8 col-lg-8 my-3">

                <label for="title"><b>Title</b></label>
                <input v-model="option.title" type="text" class="form-control mb-3" name="title" placeholder="New Option">

                <label for="short_description"><b>Short Description</b></label>
                <textarea v-model="option.short_description" name="short_description" class="form-control" cols="30" rows="5"></textarea>

            </div>

            <div class="col-sm-12 col-md-4 col-lg-4 my-3">

                <label for="image"><b>Photo</b></label>
                <div class="form-control" id="file-holder">
                    <input @change="imageChange" type="file" name="image">
                </div>

            </div>

            <div class="pl-3 mb-3">
                <label for="description"><b>Description</b></label>
                <vue-editor v-model="option.description" @imageAdded="imageAdded"></vue-editor>
                <button @click="updateOption" class="btn btn-success">Save</button>
                <button @click="toggle" class="btn btn-outline-dark ml-2">Cancel</button>
            <button @click="deleteOption" class="btn btn-danger float-end">Delete</button>
            </div>
            <!-- <textarea v-model="option.description" name="description" class="form-control mb-3" cols="30" rows="10"></textarea> -->
        </div>

        <div class="px-3">
            
            <!-- <div @click="updateOption">
                <cl-button buttonLabel="Save"></cl-button>
            </div> -->
            
        </div>

    </div>
</template>

<script>

import {VueEditor} from 'vue2-editor';
import CLButton from './UI/CLButton';

export default {

    components: {
        VueEditor,
        'cl-button': CLButton
    },
    computed: {
        option() {
            return this.$store.getters['ballotModule/getOption'];
        }
    },

    methods: {

        toggle() {
            this.$store.commit('ballotModule/SET_UPDATING_OPTION');
        },

        imageChange(e) {

            const fileReader = new FileReader();
            fileReader.readAsDataURL(e.target.files[0]);

            fileReader.onload = (e) => {
                this.$store.commit('ballotModule/SET_OPTION_IMAGE', e.target.result);
            }
        },

        updateOption() {

            const payload = {
                electionId: this.$route.params.electionId,
                option: this.option
            }

            this.$store.dispatch('ballotModule/updateOption', payload)
                .then(() => {
                    this.$store.dispatch('ballotModule/getQuestions', payload.electionId)
                        .then(() => {
                            this.$store.commit('UIModule/SET_LOADING_BUTTON');
                            this.$store.commit('ballotModule/SET_UPDATING_OPTION');
                        })
                        .catch(error => {
                            this.$store.commit('UIModule/SET_LOADING_BUTTON');
                            console.log(error);
                        })
                })
                .catch(error => {
                    let message = '';
                    const errors = error.response.data.errors
                    this.$store.commit('UIModule/SET_LOADING_BUTTON');

                    if(errors.title){
                        message = errors.title[0];
                        this.$store.commit('warningModule/SET_ERROR_MESSAGE', message);
                        this.$store.commit('warningModule/SET_ERROR');
                    }

                    else if(errors.short_description){
                        message = errors.short_description[0];
                        this.$store.commit('warningModule/SET_ERROR_MESSAGE', message);
                        this.$store.commit('warningModule/SET_ERROR');
                    }

                    else if(errors.description){
                        message = errors.description[0];
                        this.$store.commit('warningModule/SET_ERROR_MESSAGE', message);
                        this.$store.commit('warningModule/SET_ERROR');
                    }
                });

        },

        deleteOption() {

            const payload = {
                electionId: this.$route.params.electionId,
                optionId: this.option.id
            }

            this.$store.dispatch('ballotModule/deleteOption', payload)
                .then(() => {
                    this.$store.dispatch('ballotModule/getQuestions', payload.electionId)
                        .then(() => {
                            this.$store.commit('ballotModule/SET_UPDATING_OPTION');
                        })
                        .catch(error => {
                            console.log(error.response);
                        })
                })
                .catch(error => {
                    console.log(error.response);
                });

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
    position: sticky;
    right: 0;
    top: 0;
    z-index: 1;
    height: 100vh;
    width: 70%;
    background: whitesmoke;
    overflow-y: scroll;
}

.number-input {
    width: 80px;
}

#opts {
    height: 35px;
}

#file-holder {
    height: 46px;
}

#editor {
    margin-bottom: 100px;
}
.btn{
    margin-top: 10px;
}
</style>
