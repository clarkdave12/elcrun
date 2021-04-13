<template>
    <b-container>
        <div class="card mt-2">
            <div class="card-body">
                <h3 class="float-start">Voters</h3>
                <button type="button" class="btn btn-outline-primary float-end">Import</button>
                <button type="button" class="btn btn-success btn-space float-end"  @click="toggleAdd">Add Voter</button>
                <button type="button" class="btn btn-outline-secondary btn-space float-end">●●●</button>
            </div>
        </div>
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
    </b-container>
</template>

<script>

export default {

    computed: {

        voters() {
            return this.$store.getters['voterModule/getVoters'];
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
.btn-space {
    margin-right: 5px;
}
</style>
