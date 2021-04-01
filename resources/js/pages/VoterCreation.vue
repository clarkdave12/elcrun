<template>
    <b-container>
        <b-card class="mt-2">
            <b-card-text class="float-left"><h3>Voters</h3></b-card-text>
            <b-button variant="outline-dark" class="float-right ml-2">●●●</b-button>
            <b-button variant="success" class="float-right" @click="toggleAdd">Add Voter</b-button>
            <b-button variant="outline-primary" class="float-right mr-2">Import</b-button>
        </b-card>
        <b-row class="mt-4">
            <b-col cols="12" md="6" class="mb-2">
                <b-form-input placeholder="Search..."></b-form-input>
            </b-col>
        </b-row>

        <table class="table table-border">
            <caption>{{ voters.length }} voters</caption>
            <thead class="thead-dark">
                <tr class="dark">
                    <th>Name</th>
                    <th>Voter ID</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="v in voters" v-bind:key="v.id" role="button" class="table-row" @click="toggleUpdate(v)">
                    <td>{{ v.name }}</td>
                    <td>{{ v.voter_id }}</td>
                    <td>{{ v.email }}</td>
                </tr>
            </tbody>
        </table>
        <add-voter v-if="adding"></add-voter>
        <update-voter v-if="updating"></update-voter>
    </b-container>
</template>

<script>

import addVoter from '../components/AddVoter.vue';
import updateVoter from '../components/UpdateVoter.vue';

export default {
    components: {
        'add-voter': addVoter,
        'update-voter': updateVoter
    },

    computed: {

        voters() {
            return this.$store.getters['voterModule/getVoters'];
        },

        adding() {
            return this.$store.getters['voterModule/getAdding'];
        },

        updating() {
            return this.$store.getters['voterModule/getUpdating'];
        }

    },

    methods: {

        toggleAdd() {
            this.$store.commit('voterModule/SET_ADDING');
        },

        toggleUpdate(voter) {

            this.$store.commit('voterModule/SET_VOTER', voter);

            if(!this.$store.getters['voterModule/getUpdating']) {
                this.$store.commit('voterModule/SET_UPDATING');
            }
        }

    },

    mounted() {
        const electionId = this.$route.params.electionId;
        this.$store.dispatch('voterModule/getVoters', electionId);
    }
}
</script>

<style>
    .table-row:hover {
        background: turquoise;
    }
</style>
