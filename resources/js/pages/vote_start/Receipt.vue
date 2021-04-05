<template>
    <div class="container">

        <div class="row">
            <div class="col-2"></div>
            <div class="col-8">
                <div class="py-2 my-3 mx-auto border shadow">

                <div class="py-3 border-bottom wrapper">
                    <label class="mx-auto">Election</label>
                    <br>
                    <h5 class="mx-auto my-auto"> {{electionName}} </h5>
                </div>

                <div class="py-3 border-bottom wrapper">
                    <label>Voting Date</label>
                    <br>
                    <p class="mx-auto my-auto"><b> {{ votedDate }} </b></p>
                </div>

                <div class="py-3 border-bottom wrapper">
                    <label>Receipt Number</label>
                    <br>
                    <p class="mx-auto my-auto"><b> {{ receiptNumber }} </b></p>
                </div>

            </div>

            <div class="mx-auto">
                <button class="btn btn-success">SAVE</button>
            </div>

            </div>
            <div class="col-2"></div>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            electionName: '',
            votedDate: '',
            receiptNumber: ''
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
        this.electionName = localStorage.getItem('election_title');
        this.votedDate = localStorage.getItem('election_date');
        this.receiptNumber = localStorage.getItem('receipt_number');
        console.log(localStorage.getItem('election_name'));
    }
}
</script>

<style>
.wrapper {
    width: 100%;
    text-align: center;
}
</style>
