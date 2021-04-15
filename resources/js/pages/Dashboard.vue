<template>
    <div class="container-fluid">
        <navigation></navigation>

        <div class="container">
            <b-row class="py-3 px-5 shadow">
            <b-col cols="12" md="6">
                <h3>Dashboard</h3>
            </b-col>
            <b-col cols="12" md="6">
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button @click="navigate('create_election')" class="btn btn-success me-md-2">+ New Election</button>
                </div>
            </b-col>
        </b-row>

        <!-- <b-row class="mt-4">
            <b-col cols="12" md="6" class="mb-2">
                <b-form-input placeholder="Search from election..."></b-form-input>
            </b-col>
            <b-col cols="12" md="6" class="mb-2">
                <select name="filter" id="filterbox" class="form-control">
                    <option value="" selected disabled> Select Filter</option>
                </select>
            </b-col>
        </b-row> -->

        <table class="table table-striped mt-5">
            <caption>{{ electionCount }} Elections</caption>
            <thead>
                <tr class="dark">
                    <th>TITLE</th>
                    <th>START DATE</th>
                    <th>END DATE</th>
                    <th>STATUS</th>
                </tr>
            </thead>
            <tbody>
                <tr class="tableRow" @click="goElection(election.id)" v-for="election in elections" v-bind:key="election.id">
                    <td>{{ election.title }}</td>
                    <td>{{ election.start_date }}</td>
                    <td>{{ election.end_date }}</td>
                    <td>{{ election.election_status.name }}</td>
                </tr>
            </tbody>
        </table>
        </div>
    </div>
</template>

<script>

import Navbar from '../components/Navbar.vue';
    export default {
        components: {
            navigation: Navbar
        },

        computed: {

            electionCount() {
                return this.$store.getters['electionModule/getElectionCount'];
            },

            elections() {
                return this.$store.getters['electionModule/getElections'];
            }
        },

        methods: {
            navigate(link) {
                this.$router.push({name: link});
            },

            goElection(electionId) {
                this.$router.push('/election/' + electionId);
            }
        },

        created() {
            if(!localStorage.getItem('access_token') || localStorage.getItem('access_token') == 'TBD') {
                this.$router.replace('/login');
            }
            console.log(this.$store.getters['userModule/getUser']);
            this.$store.dispatch('userModule/getCurrentUser')
                .then(() => {
                    this.$store.dispatch('electionModule/getElections')
                        .then(response => {
                            // this.elections = this.$store.getters['electionModule/getElections'];
                        })
                        .catch(error => {
                            alert(error.response);
                        });
                })
                .catch(error => {
                    this.$router.go();
                });

        }
    }
</script>

<style scoped>
    .tableRow:hover {
        cursor: pointer;
        background: lightblue;
    }
</style>
