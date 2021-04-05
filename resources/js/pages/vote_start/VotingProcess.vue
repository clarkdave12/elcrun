<template>
    <div>
        <div class="text-center mt-3 mb-3">
            <h2>Election Title</h2>
        </div>

        <b-card-group v-for="question in questions" :key="question.id" deck class="mx-auto my-3" style="width: 800px">

            <b-card
            :header="question.title"
            header-bg-variant="primary"
            class="font-weight-bold text-light"
            style="max-width: 800px"
            >

                <b-card body-text-variant="dark" align="center">
                    <div v-html="question.description" style="width: 100%"></div>
                </b-card>

                <b-card v-if="question.maximum == 1" body-text-variant="dark">
                    <h6 class="float-left mr-2">Select <b-badge variant="primary">1</b-badge> option from list below.</h6>
                    <p class="font-weight-light">* Required</p>
                </b-card>

                <b-card v-else body-text-variant="dark">
                    <h6 class="float-left mr-2">
                        Select minimum of <b-badge variant="primary"> {{ question.minimum }} </b-badge>
                        and maximum of <b-badge variant="primary"> {{ question.maximum }} </b-badge>
                        option from list below.
                    </h6>
                    <p class="font-weight-light">* Required</p>
                </b-card>

                <b-card v-for="option in question.options" :key="option.id" class="mt-2" body-text-variant="dark">
                    <label v-if="question.maximum == 1" class="container">

                        <input type="radio" name="options" @change="checkRules(question, option)" v-model="option.chosen">

                        <b-img style="max-width: 100px; max-height:100px" class="float-center mx-3 my-auto" left :src="option.image" alt="Left image"></b-img>

                        <span class="checkmark mt-5 mr-2"></span>

                        <h6 class="float-left ml-2 mt-5"> {{ option.title }} </h6>
                        <b-icon class="float-right mt-5" icon="info-circle-fill" variant="primary" font-scale="1"></b-icon>
                    </label>

                    <label v-else class="container">

                        <input type="checkbox" name="options" @change="checkRules(question, option)" v-model="option.chosen">

                        <b-img style="max-width: 100px; max-height:100px" class="float-center mx-3 my-auto" left :src="option.image" alt="Left image"></b-img>

                        <span class="checkmark mt-5 mr-2"></span>

                        <h6 class="float-left ml-2 mt-5"> {{ option.title }} </h6>
                        <b-icon class="float-right mt-5" icon="info-circle-fill" variant="primary" font-scale="1"></b-icon>
                    </label>
                </b-card>

                <!-- <div v-for="option in question.options" :key="option.id" class="mx-auto">
                    <div v-if="!option.chosen" class=" mb-2 py-2 border shadow d-flex" >
                        <p class="my-auto mr-4 ml-3 h3"><b-icon icon="check-circle"></b-icon></p>
                        <img src="http://localhost:8000/images/jSF4ord7v6w0OEM.jpg" class="image my-auto">
                        <h3 class="my-auto ml-4">Option Title</h3>
                        <div role="button" class="ml-auto my-auto mr-5">
                            <h3 class="h1"><b-icon icon="info-circle-fill" variant="primary"></b-icon></h3>
                        </div>
                    </div>

                    <div v-else class="w-100 mb-2 py-2 border shadow d-flex bg-primary">
                        <p class="my-auto mr-4 ml-3 h3"><b-icon icon="check-circle-fill" variant="light"></b-icon></p>
                        <img src="http://localhost:8000/images/jSF4ord7v6w0OEM.jpg" class="image my-auto">
                        <h3 class="my-auto ml-4 text-white">Option Title</h3>
                        <div role="button" class="ml-auto my-auto mr-5">
                            <h3 class="h1"><b-icon icon="info-circle-fill" variant="light"></b-icon></h3>
                        </div>
                    </div>
                </div> -->

            </b-card>
        </b-card-group>
        <b-card-group deck class="mx-auto mt-2" style="width: 800px">
            <b-card style="max-width: 800px">
                <b-button @click="submitBallot" block variant="success">Submit ballot</b-button>
            </b-card>
        </b-card-group>
    </div>
</template>

<script>
import axios from 'axios';
  export default {
    data() {
      return {
          questions: [],
      }
    },

    methods: {
        submitBallot() {
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
                let date = response.data.voted.created_at.split('T');
                console.log(response.data.voted.checksum);
                localStorage.setItem('election_title', response.data.election.title);
                localStorage.setItem('election_date', date[0]);
                localStorage.setItem('receipt_number',response.data.voted.checksum);

                this.$router.replace({name: 'voting_receipt'});
            })
            .catch(error => {
                console.log(error);
            });
        },

        checkRules(question, option) {

            let picked = 0;

            question.options.forEach(opt => {
                if(opt.chosen) {
                    picked++;
                }
            });

            if(picked > question.maximum) {
                alert('you can only pick ' + question.maximum +" option(s) from this question");
                option.chosen = false;
            }
            else {
                option.chosen = true;
            }
        }
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
                this.questions = response.data.questions;

                this.questions.forEach((question) => {
                    question.options.forEach((option) => {
                        option.chosen = false;
                    });
                });

                console.log(this.questions);
            })
            .catch(error => {
                console.log(error.response);
            });

    }

  }
</script>
<style scoped>
p{
  color: red;
}
.container {
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 30px;
  width: 30px;
  background-color: #eee;
  border-radius: 50%;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #08d808;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 12px;
  top: 9px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
