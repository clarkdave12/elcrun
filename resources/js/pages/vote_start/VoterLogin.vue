<template>
  <div>
    <b-card-group deck class="mx-auto" style="width:400px">
      <b-card
        header="Login to vote"
        header-bg-variant="primary"
        class="mt-5 font-weight-bold text-variant-primary text-light"
        style="max-width: 400px"
      >

        <label class="float-left dark-text font-weight-bold text-dark">Voter ID</label>
        <input v-model="voter.voter_id" type="text" class="form-control"/>

        <label class="mt-3 float-left dark-text font-weight-bold text-dark">Voter key</label>
        <input v-model="voter.voter_key" type="password" class="form-control"/>

      <div class="mt-4">
        <b-button @click="login" block variant="success">Login to vote</b-button>
      </div>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {

    data() {
        return {
            voter: {
                voter_id: '',
                voter_key: ''
            }
        }
    },

    methods: {

        login() {
            const payload = {
                electionId: this.$route.params.electionId,
                voter: this.voter
            }

            this.$store.dispatch('votingModule/login', payload)
                .then(() => {
                    this.$router.replace({ name: 'voting_process' });
                })
                .catch(error => {
                    if(error.status == 401) {
                        alert('Invalid voter credentials');
                    }
                    if(error.status == 422) {
                        alert('All fileds are required');
                    }
                });
        }

    }

}
</script>

<style scoped>

</style>
