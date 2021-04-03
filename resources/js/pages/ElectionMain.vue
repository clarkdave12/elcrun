<template>
    <div class="container-fluid">
        <add-voter v-if="adding"></add-voter>
        <update-voter v-if="updating"></update-voter>
        <add-question v-if="questionAdding"></add-question>
        <add-option v-if="questionAddingOption"></add-option>
        <update-option v-if="optionUpdating"></update-option>
        <update-question v-if="questionUpdating"></update-question>

        <div :class="'header border-bottom ' + blur">
            <b-navbar>

                <b-navbar-brand>
                    <h4>{{ election.title }}</h4>
                </b-navbar-brand>
                <b-navbar-nav>
                    <b-nav-text>
                        <b-badge>{{ election.election_status.name }}</b-badge>
                    </b-nav-text>
                </b-navbar-nav>
            </b-navbar>
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

export default {

    components: {
        sidebar,
        'add-voter': addVoter,
        'update-voter': updateVoter,
        'add-question': addQuestion,
        'add-option': addOption,
        'update-option': updateOption,
        'update-question': updateQuestion,
    },

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

    mounted() {

        const id = this.$route.params.electionId;
        this.$store.dispatch('electionModule/getElectionById', id)
            .catch(error => {
                console.log(error);
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
