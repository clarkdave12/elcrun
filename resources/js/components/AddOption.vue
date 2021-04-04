<template>
    <div class="float-right container border shadow" id="wrapper">

        <!-- HEADER SECTION /> -->
        <div class="row py-3 pl-5 bg-primary">
            <div class="col-11">
                <h5 class="text-light">Add New Option</h5>
            </div>
            <div class="col-1">
                <h5 role="button" @click="toggle" class="h2 text-light"><b-icon id="icon" class="float-right" icon="x"></b-icon></h5>
            </div>
        </div>
        <!-- </ HEADER SECTION -->

        <div class="row py-4 pl-3">

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
            </div>
            <!-- <textarea v-model="option.description" name="description" class="form-control mb-3" cols="30" rows="10"></textarea> -->

            <div class="col-12">
                <button @click="addOption" class="btn btn-success">Save</button>
                <button @click="toggle" class="btn btn-secondary ml-2">Cancel</button>
            </div>

        </div>

    </div>
</template>

<script>

import {VueEditor} from 'vue2-editor';

export default {

    components: {
        VueEditor,
    },

    data() {
        return {
            option: {
                title: '',
                short_description: '',
                description: '',
                image: ''
            }
        }
    },

    computed: {

        question() {
            return this.$store.getters['ballotModule/getQuestion'];
        }

    },

    methods: {

        toggle() {
            this.$store.commit('ballotModule/SET_ADDING_OPTION');
        },

        imageChange(e) {

            const fileReader = new FileReader();
            fileReader.readAsDataURL(e.target.files[0]);

            fileReader.onload = (e) => {
                this.option.image = e.target.result;
            }
        },

        addOption() {

            const electionId = this.$route.params.electionId;

            const payload = {
                questionId: this.question.id,
                option: this.option
            }

            this.$store.dispatch('ballotModule/addOption', payload)
                .then(() => {
                    this.$store.dispatch('ballotModule/getQuestions', electionId)
                        .then(() => {
                            this.$store.commit('ballotModule/SET_ADDING_OPTION');
                        })
                        .catch(error => {
                            alert(error.response);
                        });
                })
                .catch(error => {
                    alert(error.response);
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
    position: fixed;
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
</style>
