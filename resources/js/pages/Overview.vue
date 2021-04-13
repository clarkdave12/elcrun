<template>

    <div>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

  <b-navbar variant="light" type="light">
    <b-navbar-brand>
      <b-nav-text style="color: #000000"><i class="fa fa-fw fa-home"></i>
      Overview
      </b-nav-text>
    </b-navbar-brand>
  </b-navbar>

      <b-container>
        <div class="row">
            <div class="col-12">
                <div v-if="election.election_status.name == 'running'" class="alert alert-success">Your election is running and will automatically end in 9 days 17 hours 0 minutes </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-8">
                <div class="box" style="margin-bottom: 10px;">
                    <div class="pb-3">
                        <h4>Ballots Submitted By Date</h4>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6"><h5><b><i class="fa fa-globe"></i> Voting URLs</b></h5></div>
                    <div class="container" style="margin-bottom: 10px;">
                        <div class="col-md-6"><h6><b>Election URL</b></h6></div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-outline">
                                    <input type="url" :placeholder="election.election_url" :value="election.election_url" ref="input" class="form-control"/>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <a class="btn btn-primary" style="background-color: #55acee" @click="copyLongURL" role="button"><i class="fa fa-clone"></i> Copy</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="container" style="margin-bottom: 10px;">
                        <div class="col-md-6"><h6><b>Short URL</b></h6></div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-outline">
                                    <input type="url" :placeholder="election.short_url" :value="election.short_url" ref="input1" class="form-control"/>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <a class="btn btn-primary" style="background-color: #55acee" @click="copyShortURL" role="button"><i class="fa fa-clone"></i> Copy</a>
                            </div>
                        </div>
                        <div class="col-md-6" style="margin-top: 10px;"><h6><b>Organization Subdomain</b></h6></div>
                        <div class="col-md-6">
                            <a href="#"><p>Click here to set up your organization's subdomain</p></a>
                        </div>
                    </div>
                </div>

            </div>

            <div class="col-md-4">
                <b-card-group deck>
                    <div class="container-md">
                    <b-card bg-variant="info" text-variant="white" header="Over all participation" class="text-center" style="margin-bottom: 10px;">
                        <b-card-text> {{ participationPercentage }}% </b-card-text>
                    </b-card>
                    </div>

                    <div class="container-md">
                    <b-card bg-variant="warning" text-variant="white" header="Total Voters" class="text-center" style="margin-bottom: 10px;">
                        <b-card-text>{{ totalVoters }}</b-card-text>
                    </b-card>
                    </div>

                    <div class="container-md">
                    <b-card bg-variant="danger" text-variant="white" header="Total Ballots" class="text-center" style="margin-bottom: 10px;">
                        <b-card-text>{{ totalBallots }}</b-card-text>
                    </b-card>
                    </div>

                    <div class="container-md">
                    <b-card bg-variant="success" text-variant="white" header="Total Options" class="text-center" style="margin-bottom: 10px;">
                        <b-card-text>{{ totalOptions }}</b-card-text>
                    </b-card>
                    </div>
                </b-card-group>
            </div>

        </div>
    </b-container>
</div>
</template>

<script>
export default {
    methods: {

        copyLongURL(){
            var longURL = this
            var copyLong = longURL.$refs.input;
            copyLong.select();
            document.execCommand("copy");
            alert("Copied the URL: " +copyLong.value);
        },


        copyShortURL(){
            var shortURL = this
            var copyShort = shortURL.$refs.input1;
            copyShort.select();
            document.execCommand("copy");
            alert("Copied the URL: " +copyShort.value);
        },

    },
    computed: {

        election() {
            return this.$store.getters['electionModule/getElection'];
        },

        participationPercentage() {
            let analytics = this.$store.getters['electionModule/getAnalytics'];
            let total = analytics.total_voters;
            let voted = analytics.voted;

            let percentage = (voted / total) * 100;

            return percentage;
        },

        voted() {
            let analytics = this.$store.getters['electionModule/getAnalytics'];

            return analytics.voted;
        },

        totalVoters() {
            let analytics = this.$store.getters['electionModule/getAnalytics'];
            return analytics.total_voters;
        },

        totalBallots() {
            let analytics = this.$store.getters['electionModule/getAnalytics'];
            return analytics.total_ballots;
        },

        totalOptions() {
            let analytics = this.$store.getters['electionModule/getAnalytics'];
            return analytics.total_options;
        }
    },

    data() {
        return {
            percentage: ''
        }
    },

    mounted() {
        this.$store.dispatch('electionModule/getElectionAnalytics', this.$route.params.electionId)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                alert(error.response);
                console.log(error.response);
            })
    }
}
</script>
