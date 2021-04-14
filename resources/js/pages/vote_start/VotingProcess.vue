<template>
    <div>

        <candidate-detail v-if="showDetails"></candidate-detail>
        <error-message v-if="error"></error-message>

        <div :class="blur">
            <div class="text-center mt-3 mb-3">
                <h2>Election Title</h2>
            </div>

            <div class="row mt-5" v-for="(question, qi) in questions" :key="qi">

                <!-- Header -->
                
                <div class="col-sm-12 col-md-8 col-lg-8 mx-auto border shadow bg-primary">
                    <div class="my-auto py-2 px-3 mb-3">
                        <h4 class="text-light"> {{ question.title }} </h4>
                    </div>
                </div>

                <!-- Description -->
                <div class="col-sm-12 col-md-8 col-lg-8 mx-auto border shadow py-3">
                    <div v-html="question.description"></div>
                </div>

                <div class="col-sm-12 col-md-8 col-lg-8 mx-auto border shadow pt-4 my-2">
                    <p class="float-start">Voter can select minimum of <span class="badge bg-primary"> {{ question.minimum }} </span> option(s)</p>
                    <p class="float-start">and maximum of <span class="badge bg-primary"> {{ question.maximum }} </span> option(s)</p>
                </div>
                <div class="col-sm-12 col-md-8 col-lg-8 mx-auto border shadow" v-for="(option, oi) in question.options" :key="oi">
                    <div class="mb-2 py-2 d-flex">
                        <div class="container">
                            <div class="row">
                               <div class="col-1"> 
                                    <div class="my-auto h3">
                                        <input v-model="option.chosen" role="button" class="check mt-5" type="checkbox" name="" id="">
                                    </div>
                                </div>
                        <!-- <p @click="checkRules(qi, oi)" role="button" class="my-auto mr-4 ml-3 h3">
                            <b-icon v-if="option.chosen" icon="check-circle-fill" variant="success"></b-icon>
                            <b-icon v-else icon="check-circle" variant="dark"></b-icon>
                        </p> -->
                                <div class="col-2">
                                <img v-if="option.image" :src="option.image" class="image my-auto mt-4" role="button">
                                </div>
                                <div class="col-sm">
                                    <h3 class="my-auto float-start mt-5" role="button"> {{option.title}} </h3>
                                </div>
                                <div class="col">
                                    <div @click="toggleDetails(option)" role="button" class="ml-auto my-auto">
                                        <h3 class="h4"><b-icon icon="info-circle-fill" variant="primary" class="float-end mt-5"></b-icon></h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <b-card-group deck class="mx-auto mt-1" style="width:880px">
                <b-card>
                    <div @click="submitBallot">
                        <cl-button buttonLabel="Submit Ballot"></cl-button>
                    </div>
                    <!-- <b-button @click="submitBallot" block variant="success">Submit ballot</b-button> -->
                </b-card>
            </b-card-group>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import VotingCandidateDetail from '../../components/modals/VotingCandidateDetail';
import CLButton from '../../components/UI/CLButton';
import ErrorMessage from '../../components/messages/ErrorMessage';

  export default {

    components: {
        'candidate-detail': VotingCandidateDetail,
        'cl-button': CLButton,
        'error-message': ErrorMessage
    },

    data() {
      return {
          ballotError: ''
      }
    },

    computed: {

        questions() {
            return this.$store.getters['ballotModule/getQuestions'];
        },

        showDetails() {
            return this.$store.getters['votingModule/getShowOption'];
        },

        chosen() {
            return (option) => {
                option.chosen ? true : false;
            }
        },

        error() {
            return this.$store.getters['warningModule/getError'];
        },

        blur() {
            if(this.$store.getters['votingModule/getShowOption'] ||
                this.$store.getters['warningModule/getError'])
                return 'blur';

            return 'not-blur';
        },

        isValid() {
            let valid = true;
            this.questions.forEach(question => {
                let min = question.minimum;
                let max = question.maximum;
                let voted = 0;

                question.options.forEach(option => {
                    if(option.chosen) {
                        voted++;
                    }
                });

                if(min > voted) {
                    this.ballotError = 'You need to choose atleast ' + min + ' option from ' + question.title + ' question';
                    alert('chosen ' + voted);
                    valid = false;
                }
                else if(max < voted) {
                    this.ballotError = 'You can only choose maximum of ' + max + ' options from ' + question.title + ' question';
                    alert('chosen ' + voted);
                    valid =  false;
                }

            });

            return valid;
        }
    },

    methods: {
        submitBallot() {

            this.$store.dispatch('votingModule/ballotValidation', this.questions);

            let validMessage = this.$store.getters['votingModule/getValidated'];

            if(validMessage == 'valid') {

                const payload = {
                    electionId: this.$route.params.electionId,
                    data: {
                        questions: this.questions,
                        fingerprint: localStorage.getItem('fingerprint'),
                    }
                }

                axios({
                    method: 'POST',
                    url: '/api/submitBallot/' + payload.electionId,
                    data: payload.data,
                    headers: {
                        Accept: 'application/json'
                    }
                })
                .then(response => {
                    this.$store.commit('UIModule/SET_LOADING_BUTTON');
                    let date = response.data.voted.created_at.split('T');
                    console.log(response.data.voted.checksum);
                    localStorage.setItem('election_title', response.data.election.title);
                    localStorage.setItem('election_date', date[0]);
                    localStorage.setItem('receipt_number',response.data.voted.checksum);

                    this.$router.replace({name: 'voting_receipt'});
                })
                .catch(error => {
                    console.log(error.response);
                });

            }
            else {
                // alert(validMessage);
                this.$store.commit('warningModule/SET_ERROR');
                this.$store.commit('warningModule/SET_ERROR_MESSAGE', validMessage);
                this.$store.commit('UIModule/SET_LOADING_BUTTON');
            }
        },

        toggleDetails(option) {
            console.log(option);
            this.$store.commit('votingModule/SET_OPTION', option);
            this.$store.commit('votingModule/TOGGLE_SHOW_OPTION');
        },
    },

    beforeMount() {
        if(!localStorage.getItem('fingerprint')) {
            localStorage.removeItem('fingerprint');
            localStorage.removeItem('election_title');
            localStorage.removeItem('election_date');
            localStorage.removeItem('receipt_number');
            this.$router.replace({name: 'voter_login'});
        }
        else {
            const payload = {
                key: localStorage.getItem('fingerprint')
            }
            this.$store.dispatch('votingModule/authenticateVoter', payload)
                .then(() => {})
                .catch(error => {
                    if(error.status == 401) {
                        this.$router.replace({name: 'voter_login'});
                    }
                });
        }
    },

    mounted() {

        this.$store.dispatch('ballotModule/getQuestions', this.$route.params.electionId)
            .then(response => {
                let questions = response.data.questions;
                this.questions.forEach((question) => {
                    question.options.forEach((option) => {
                        option.chosen = false;
                    });
                });

                this.$store.commit('ballotModule/SET_QUESTIONS', questions);
            })
            .catch(error => {
                console.log(error.response);
            });

    }

  }
</script>
<style scoped>

.container {
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
}

.image {
    max-width: 100px;
    max-height: 100px;
}

.blur {
    filter: blur(8px);
}

.check {
    height: 20px;
    width: 20px;
}

</style>
