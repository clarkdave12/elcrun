<template>
<div>
    <b-card-group>
        <b-card>
            <b-card-text class="float-left">
                <h5>Ballot</h5>
            </b-card-text>
            <b-button variant="secondary" class="float-right ml-1" size="sm">●●●</b-button>
            <b-button @click="toggle" variant="success" class="float-right" size="sm">+ Add Question</b-button>
            <b-button variant="outline-primary" class="float-right mr-1" size="sm">Import</b-button>
        </b-card>
    </b-card-group>

    <div>
        <b-card-group class="mx-auto mt-5" style="width:800px" v-for="question in questions" v-bind:key="question.id">
            <b-card>
                <!-- <div class="dropdown float-right mt-3">
                    <b-button @click="toggleMenu(index)" variant="secondary-outline" size="sm">●●●</b-button>
                </div> -->


                <div>
                    <b-dropdown id="dropdown-1"
                    text="Actions "
                    variant="outline-primary"
                    no-caret
                    role="menu"
                    class="m-md-2 float-right mt-3">
                        <b-dropdown-item @click="toggleQuestionUpdate(question)">Edit</b-dropdown-item>
                        <b-dropdown-divider></b-dropdown-divider>
                        <b-dropdown-item @click="clearOptions(question)">Clear Options</b-dropdown-item>
                        <b-dropdown-item @click="deleteQuestion(question)">Delete</b-dropdown-item>
                    </b-dropdown>
                </div>

                <h5 class="font-weight-bold">{{question.title}}</h5>
                <h6>Multiple Choice</h6>
                <b-tabs class="mt-4">

                    <b-tab title="Options">
                        <!-- <b-card-group v-for="option in question.options" :key="option.id" class="mx-auto my-2"> -->
                        <div class="my-2" v-for="option in question.options" :key="option.id">
                            <div v-if="option.image" class="row my-2 py-2 pl-1 pr-3 mx-auto option-row border">
                                <img :src="option.image" alt="No Image" class="rounded img-thumbnail image mr-3">
                                <h3 class="my-auto"> {{ option.title }} </h3>
                                <div class="ml-auto my-auto">
                                    <b-dropdown
                                    text="Actions "
                                    variant="outline-dark"
                                    no-caret
                                    role="menu"
                                    class="m-md-2 float-right mt-5">
                                        <b-dropdown-item @click="toggleUpdate(option)">Edit</b-dropdown-item>
                                        <b-dropdown-item @click="deleteOption(option)">Delete</b-dropdown-item>
                                    </b-dropdown>
                                </div>
                            </div>


                        <!-- <b-card-group v-for="option in question.options" :key="option.id" class="mx-auto my-2">
                            <b-card v-if="option.image">
                                <b-img class="mt-2 ml-4 mb-2 image" left :src="option.image" alt="Left image"></b-img>
                                <b-card-text class="ml-3 mt-5 float-left"><h4>{{option.title}}</h4></b-card-text>

                                <b-dropdown
                                    text="Actions "
                                    variant="outline-dark"
                                    no-caret
                                    role="menu"
                                    class="m-md-2 float-right my-auto">
                                        <b-dropdown-item @click="toggleUpdate(option)">Edit</b-dropdown-item>
                                        <b-dropdown-item @click="deleteOption(option)">Delete</b-dropdown-item>
                                </b-dropdown>
                            </b-card> -->

                            <!-- FOR NO IMAGE OPTIONS -->
                            <div v-else class="row my-2 py-2 px-3 mx-auto option-row border">
                                <p class="my-auto mr-4 h3"><b-icon icon="check-circle-fill"></b-icon></p>
                                <h3 class="my-auto"> {{ option.title }} </h3>
                                <div class="ml-auto my-auto">
                                    <b-dropdown id="dropdown-2"
                                    text="Actions "
                                    variant="outline-dark"
                                    no-caret
                                    role="menu"
                                    class="m-md-2 float-right mt-5">
                                        <b-dropdown-item @click="toggleUpdate(option)">Edit</b-dropdown-item>
                                        <b-dropdown-item @click="deleteOption(option)">Delete</b-dropdown-item>
                                    </b-dropdown>
                                </div>
                            </div>
                        </div>
                        <b-button @click="toggleOption(question)" variant="success" class="mt-2 ml-1 mb-1 float-left">Add Option</b-button>
                    </b-tab>

                    <b-tab title="Details">

                        <h4 class="mt-2">Rules</h4>
                        <b-card class="mb-1 py-3" no-body>
                            <div class="row pl-4">
                                Voters are required to select <b class="mx-1">a minimum of</b> {{question.minimum}} option(s)
                            </div>
                        </b-card>
                        <b-card class="mb-1 py-3" no-body>
                            <div class="row pl-4">
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

        deleteQuestion(question) {

            const payload = {
                electionId: this.$route.params.electionId,
                questionId: question.id
            }

            this.$store.dispatch('ballotModule/deleteQuestion', payload)
                .then(() => {
                    this.$store.dispatch('ballotModule/getQuestions', payload.electionId);
                })
                .catch(error => {
                    console.log(error.response);
                });

        },

        clearOptions(question) {

            const payload = {
                electionId: this.$route.params.electionId,
                questionId: question.id
            }

            this.$store.dispatch('ballotModule/clearOptions', payload)
                .then(() => {
                    this.$store.dispatch('ballotModule/getQuestions', payload.electionId);
                })
                .catch(error => {
                    console.log(error.response);
                });

        },

        deleteOption(option) {

            const payload = {
                electionId: this.$route.params.electionId,
                optionId: option.id
            }

            this.$store.dispatch('ballotModule/deleteOption', payload)
                .then(() => {
                    this.$store.dispatch('ballotModule/getQuestions', payload.electionId);
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

</style>
