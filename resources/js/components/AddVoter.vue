<template>
    <div class="float-right container border shadow" id="wrapper">
        <div class="row py-3 pl-5 bg-primary" id="header">
            <div class="col-11">
                <h5 class="text-light">Add Voter</h5>
            </div>
            <div class="col-1">
                <h5 @click="toggleAdd" class="h2 text-light"><b-icon id="icon" class="float-right" icon="x"></b-icon></h5>
            </div>
        </div>

        <div class="row p-3">

            <div class="col-12 my-3">
                <label for="name">Name</label>
                <input v-model="voter.name" class="form-control" type="text" name="name" id="name" placeholder="John Doe">
            </div>

            <div class="col-6 px-3 my-3">
                <label for="voter_id">Voter ID</label>
                <div class="input-group">
                    <input v-model="voter.voter_id" class="form-control" placeholder="Voter's ID" type="text" name="voter_id" id="voter_id">
                    <div class="input-group-append">
                        <button @click="generateString('voter_id')" class="btn btn-outline-secondary">
                            <b-icon icon="lightning-fill"></b-icon>
                        </button>
                    </div>
                </div>
            </div>

            <div class="col-6 px-3 my-3">
                <label for="voter_key">Voter Key</label>
                <div class="input-group">
                    <input v-model="voter.voter_key" class="form-control" placeholder="Voter's Key" type="text" name="voter_key" id="voter_key">
                    <div class="input-group-append">
                        <button @click="generateString('voter_key')" class="btn btn-outline-secondary">
                            <b-icon icon="lightning-fill"></b-icon>
                        </button>
                    </div>
                </div>
            </div>

            <div class="col-12 my-3">
                <label for="email">Voter's Email</label>
                <input v-model="voter.email" class="form-control" type="email" name="email" id="email" placeholder="johndoe@gmail.com">
            </div>
        </div>

        <div class="row p-3" >
            <b-button @click="addVoter" variant="success" class="mr-4">Add Voter</b-button>
            <b-button @click="toggleAdd" variant="secondary" class="mr-4">Cancel</b-button>
        </div>
    </div>
</template>

<script>
import {strGen, strComp} from '../helpers/generator.js';
export default {

    data() {
        return {
            voter: {
                name: '',
                voter_id: '',
                voter_key: '',
                email: '',
                comp_key: ''
            }
        }
    },

    methods: {

        toggleAdd() {
            this.$store.commit('voterModule/SET_ADDING');
        },

        generateString(tag) {

            if(tag == 'voter_id') {
                this.voter.voter_id = strGen(8);
            }

            if(tag == 'voter_key') {
                this.voter.voter_key = strGen(8);
            }

        },

        addVoter() {
            const electionId = this.$route.params.electionId;

            const data = {
                voter: this.voter,
                electionId: electionId
            }

            this.$store.dispatch('voterModule/addVoter', data)
                .then(() => {
                    this.$store.commit('voterModule/SET_ADDING');
                })
                .catch(error => {
                    console.log(error.response);
                });
        }

    }

}
</script>

<style>
#wrapper {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
    height: 100vh;
    width: 40%;
    background: whitesmoke;
}

#icon {
    right: 0;
    cursor: pointer;
}
</style>
