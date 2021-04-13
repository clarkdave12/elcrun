<template>
    <div class="container-fluid">
        <add-voter v-if="adding"></add-voter>
        <update-voter v-if="updating"></update-voter>
        <add-question v-if="questionAdding"></add-question>
        <add-option v-if="questionAddingOption"></add-option>
        <update-option v-if="optionUpdating"></update-option>
        <update-question v-if="questionUpdating"></update-question>
        <error-message v-if="error"></error-message>
        <div :class="'header border-bottom ' + blur">
            <!-- <b-navbar>

                <b-navbar-brand>
                    <h4>{{ election.title }}</h4>
                </b-navbar-brand>
                <b-navbar-nav>
                    <b-nav-text>
                        <div>
                            <span class="badge badge-secondary"> Building </span>
                        </div>
                    </b-nav-text>
                </b-navbar-nav>
            </b-navbar> -->
            <nav class="navbar navbar-expand-lg navbar-light bg-light shadow px-4 py-3">
                <span class="navbar-brand"> <h4> {{ election.title }} </h4> </span>
                <h6><span class="badge bg-secondary"> {{ election.election_status.name }} </span></h6>
            </nav>
        </div>
        <div :class="'row ' + blur">
            <div class="col-2">
                <sidebar/>
            </div>
            <div class="col-10">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>

import sidebar from '../components/Sidebar.vue';
import addVoter from '../components/AddVoter.vue';
import updateVoter from '../components/UpdateVoter.vue';
import addQuestion from '../components/AddQuestion.vue';
import addOption from '../components/AddOption.vue';
import updateOption from '../components/UpdateOption.vue';
import updateQuestion from '../components/UpdateQuestion.vue';
import ErrorMessage from '../components/messages/ErrorMessage';

export default {

    components: {
        sidebar,
        'add-voter': addVoter,
        'update-voter': updateVoter,
        'add-question': addQuestion,
        'add-option': addOption,
        'update-option': updateOption,
        'update-question': updateQuestion,
        'error-message': ErrorMessage,
    },

    // data() {
    //     return {
    //         election: {},
    //     }
    // },

    computed: {

        election() {
            return this.$store.getters['electionModule/getElection'];
        },

        adding() {
            return this.$store.getters['voterModule/getAdding'];
        },

        updating() {
            return this.$store.getters['voterModule/getUpdating'];
        },

        questionAdding() {
            return this.$store.getters['ballotModule/getAdding'];
        },

        questionAddingOption() {
            return this.$store.getters['ballotModule/getAddingOption'];
        },

        questionUpdating() {
            return this.$store.getters['ballotModule/getUpdatingQuestion'];
        },

        optionUpdating() {
            return this.$store.getters['ballotModule/getUpdatingOption'];
        },

        error() {
            return this.$store.getters['warningModule/getError'];
        },

        blur() {
            if(this.$store.getters['voterModule/getAdding'] ||
            this.$store.getters['voterModule/getUpdating'] ||
            this.$store.getters['ballotModule/getAdding'] ||
            this.$store.getters['ballotModule/getAddingOption'] ||
            this.$store.getters['ballotModule/getUpdatingOption'] ||
            this.questionUpdating)
                return "blur";

            return "not-blur";
        }

    },

    created() {

        const id = this.$route.params.electionId;
        this.$store.dispatch('electionModule/getElectionById', id)
            .then(response => {
                // this.election = response.data.election;
            })
            .catch(error => {
                console.log(error.response);
            });
    }

}
</script>

<style>
    .header {
        width: 100%;
        padding-right: 5%;
        padding-left: 5%;
    }

    .blur {
        filter: blur(8px);
    }
</style>
