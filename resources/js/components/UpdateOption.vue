<template>
    <div class="float-right container border shadow" id="wrapper">

        <!-- HEADER SECTION /> -->
        <div class="row py-3 pl-5 bg-primary">
            <div class="col-11">
                <h5 class="text-light">Update Option</h5>
            </div>
            <div class="col-1">
                <h5 role="button" @click="toggle" class="h2 text-light"><b-icon id="icon" class="float-right" icon="x"></b-icon></h5>
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

            <div class="col-12">
                <label for="description"><b>Description</b></label>
                 <textarea v-model="option.description" name="description" class="form-control mb-3" cols="30" rows="10"></textarea>
            </div>
        </div>

        <div class="row px-3 ">
            <button @click="updateOption" class="btn btn-success">Save</button>
            <button @click="toggle" class="btn btn-secondary ml-2">Cancel</button>
            <button @click="deleteOption" class="btn btn-danger ml-auto">Delete</button>
        </div>

    </div>
</template>

<script>
export default {

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
                            this.$store.commit('ballotModule/SET_UPDATING_OPTION');
                        })
                        .catch(error => {
                            console.log(error);
                        })
                })
                .catch(error => {
                    console.log(error.response);
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
