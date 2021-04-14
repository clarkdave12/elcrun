<template>
<div>
<div class="card mt-2">
            <div class="card-body">
                <h3 class="float-start">Ballot</h3>
                <button type="button" class="btn btn-outline-primary float-end">Import</button>
                <button type="button" class="btn btn-success btn-space float-end"  @click="toggle">Add Question</button>
                <!-- <button type="button" class="btn btn-outline-secondary btn-space float-end">●●●</button> -->
            </div>
        </div>
    <div>
        <b-card-group class="mx-auto mt-5" style="width:800px" v-for="question in questions" v-bind:key="question.id">
            <b-card>
                <!-- <div class="dropdown float-right mt-3">
                    <b-button @click="toggleMenu(index)" variant="secondary-outline" size="sm">●●●</b-button>
                </div> -->


                <div>
                    <b-dropdown id="dropdown-1"
                    text="●●●"
                    variant="outline-secondary"
                    no-caret
                    role="menu"
                    class="m-md-2 float-end mt-3">
                        <b-dropdown-item @click="toggleQuestionUpdate(question)">Edit</b-dropdown-item>
                        <b-dropdown-divider></b-dropdown-divider>
                        <b-dropdown-item @click="confirmClearOptions(question)">Clear Options</b-dropdown-item>
                        <b-dropdown-item @click="confirmDeleteQuestion(question)">Delete</b-dropdown-item>
                    </b-dropdown>
                </div>

                <h5 class="font-weight-bold">{{question.title}}</h5>
                <h6>Multiple Choice</h6>
                <b-tabs class="mt-4">

                    <b-tab title="Options">
                        <div class="my-2" v-for="option in question.options" :key="option.id">
                            <div v-if="option.image" class="row my-2 py-2 pl-1 pr-3 mx-auto option-row border">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-2">
                                            <img :src="option.image" alt="No Image" class="rounded img-thumbnail image mr-3">
                                        </div>
                                        <div class="col-sm">
                                            <h5 class="my-auto"> {{ option.title }} </h5>
                                        </div>
                                        <div class="col">
                                            <div class="ml-auto my-auto">
                                                <b-dropdown
                                                text="●●●"
                                                variant="outline-secondary"
                                                no-caret
                                                role="menu"
                                                class="m-md-2 float-end">
                                                    <b-dropdown-item @click="toggleUpdate(option)">Edit</b-dropdown-item>
                                                    <b-dropdown-item @click="confirmDeleteOption(option)">Delete</b-dropdown-item>
                                                </b-dropdown>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- FOR NO IMAGE OPTIONS -->
                            <div v-else class="row my-2 py-2 px-3 mx-auto option-row border">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-2">
                                            <p class="my-auto mr-4 h3"><b-icon class="float-start" icon="check-circle-fill"></b-icon></p>
                                        </div>
                                        <div class="col-sm">
                                            <h5 class="my-auto"> {{ option.title }} </h5>
                                        </div>
                                        <div class="col">
                                            <div class="ml-auto my-auto">
                                                <b-dropdown id="dropdown-2"
                                                text="●●●"
                                                variant="outline-secondary"
                                                no-caret
                                                role="menu"
                                                class="m-md-2 float-end">
                                                    <b-dropdown-item @click="toggleUpdate(option)">Edit</b-dropdown-item>
                                                    <b-dropdown-item @click="confirmDeleteOption(option)">Delete</b-dropdown-item>
                                                </b-dropdown>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <b-button @click="toggleOption(question)" variant="success" class="mt-2 ml-1 mb-1 float-left">Add Option</b-button>
                    </b-tab>

                    <b-tab title="Details">

                        <h4 class="mt-2">Rules</h4>
                        <b-card class="mb-1 py-3" no-body>
                            <div>
                                Voters are required to select <b class="mx-1">a minimum of</b> {{question.minimum}} option(s)
                            </div>
                        </b-card>
                        <b-card class="mb-1 py-3" no-body>
                            <div>
                                Voters can select
                                <b class="mx-1" v-if="question.maximum == 1">only {{ question.maximum }}</b>
                                <b class="mx-1" v-else-if="question.maximum > 1">up to {{ question.maximum }}</b>
                                 options
                            </div>
                        </b-card>
                    </b-tab>

                    <b-tab title="Attachments">
                        <h6 class="mt-2">You can attach up to 3 documents to this question. Learn more about ballot question attachments.</h6>
                        <b-form-file v-model="file1" class="mt-3" plain></b-form-file>
                    </b-tab>
                </b-tabs>
            </b-card>
        </b-card-group>
    </div>
</div>
</template>

<script>

import deleteQuestion from '../components/modals/BallotQuestionDelete';

export default {

    components: {
        'delete-question': deleteQuestion
    },

    data() {
      return {
        file1: null,
      }
    },

    computed: {

        questions() {
            return this.$store.getters['ballotModule/getQuestions'];
        },

    },

    methods: {
        toggle() {
            this.$store.commit('ballotModule/SET_ADDING');
        },

        toggleQuestionUpdate(question) {
            this.$store.commit('ballotModule/SET_QUESTION', question);
            this.$store.commit('ballotModule/SET_UPDATING_QUESTION');
        },

        toggleOption(question) {
            this.$store.commit('ballotModule/SET_QUESTION', question);
            this.$store.commit('ballotModule/SET_ADDING_OPTION');
        },

        toggleUpdate(option) {
            this.$store.commit('ballotModule/SET_OPTION', option);
            this.$store.commit('ballotModule/SET_UPDATING_OPTION');
        },

        confirmDeleteQuestion(question) {

            this.$swal.fire({
                icon: 'warning',
                title: 'Delete Question',
                text: 'Are you sure to delete this question?',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            })
            .then(result => {
                if(result.isConfirmed) {
                    this.deleteQuestion(question);
                }
            });

        },

        deleteQuestion(question) {

            const payload = {
                electionId: this.$route.params.electionId,
                questionId: question.id
            }

            this.$store.dispatch('ballotModule/deleteQuestion', payload)
                .then(() => {
                    this.$store.dispatch('ballotModule/getQuestions', payload.electionId)
                        .then(() => {
                            this.$swal.fire(
                                'Deleted',
                                'Then questions has been deleted!',
                                'success'
                            );
                        })
                        .catch(error => {
                            console.log(error.response);
                        })
                })
                .catch(error => {
                    this.$swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!'
                    });
                    console.log(error.response);
                });

        },

        confirmClearOptions(question) {

            this.$swal.fire({
                icon: 'warning',
                title: 'Clear Options',
                text: 'Are you sure to delete all the options ?',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            })
            .then(result => {
                if(result.isConfirmed) {
                    this.clearOptions(question);
                }
            });

        },

        clearOptions(question) {

            const payload = {
                electionId: this.$route.params.electionId,
                questionId: question.id
            }

            this.$store.dispatch('ballotModule/clearOptions', payload)
                .then(() => {
                    this.$store.dispatch('ballotModule/getQuestions', payload.electionId)
                        .then(() => {
                            this.$swal.fire(
                                'Cleared',
                                'All options have been deleted!',
                                'success'
                            );
                        })
                        .catch(error => {
                            this.$swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Something went wrong!'
                            });
                            console.log(error.response);
                        });
                })
                .catch(error => {
                    console.log(error.response);
                });

        },

        confirmDeleteOption(option) {

            this.$swal.fire({
                icon: 'warning',
                title: 'Delete Option',
                text: 'Are you sure to delete this option?',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            })
            .then(result => {
                if(result.isConfirmed) {
                    this.deleteOption(option);
                }
            });

        },

        deleteOption(option) {

            const payload = {
                electionId: this.$route.params.electionId,
                optionId: option.id
            }

            this.$store.dispatch('ballotModule/deleteOption', payload)
                .then(() => {
                    this.$store.dispatch('ballotModule/getQuestions', payload.electionId)
                        .then(() => {
                            this.$swal.fire(
                                'Deleted',
                                'the option has been deleted!',
                                'success'
                            );
                        })
                        .catch(error => {
                            this.$swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Something went wrong!'
                            });
                            console.log(error.response);
                        });
                })
                .catch(error => {
                    console.log(error.response);
                });

        }
    },

    mounted() {
        this.$store.dispatch('ballotModule/getQuestions', this.$route.params.electionId);
    }

}
</script>

<style scoped>
.col-sm{
    margin-top: 13px;
}
.float-start{
    margin-top: 15px;
}
.menu-1 {
    z-index: 1;
    right: 60px;
    top: 0;
    position: absolute;
}

.image {
    max-height: 100px;
    max-width: 100px;
}

.option-row {
    width: 100%;
}
.btn-space {
    margin-right: 5px;
}
</style>
