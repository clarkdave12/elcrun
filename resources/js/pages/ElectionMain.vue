<template>
    <div class="container-fluid">
        <div class="header border-bottom">
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
        <div class="row">
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
export default {

    components: {
        sidebar
    },

    computed: {
        election() {
            return this.$store.getters['electionModule/getElection'];
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
</style>
