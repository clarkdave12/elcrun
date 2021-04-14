<template>
    <div class="float-right container border shadow" id="wrapper">
        <div class="row py-3 pl-5 bg-primary" id="header">
            <div class="col-11">
                <h5 class="text-light">Update Voter</h5>
            </div>
            <div class="col-1">
                <h5 @click="toggleUpdate" role="button" class="h2 text-light"><b-icon id="icon" class="float-right" icon="x"></b-icon></h5>
            </div>
        </div>

        <div class="row p-3">

            <div class="col-12 my-3">
                <label for="name">Name</label>
                <input v-model="voter.name" class="form-control" type="text" name="name" id="name" placeholder="John Doe">
            </div>

            <div class="col-6 px-3 my-3">
                <label for="voter_id">Voter ID</label>
                <input v-model="voter.voter_id" class="form-control" placeholder="Voter's ID" type="text" name="voter_id" id="voter_id">
            </div>

            <div class="col-6 px-3 my-3">
                <label for="voter_key">Voter Key</label>
                <input v-model="voter.voter_key" class="form-control" placeholder="Voter's Key" type="text" name="voter_key" id="voter_key">
            </div>

            <div class="col-12 my-3">
                <label for="email">Voter's Email</label>
                <input v-model="voter.email" class="form-control" type="email" name="email" id="email" placeholder="johndoe@gmail.com">
                <button type="button" @click="saveUpdate" class="btn btn-success float-start">Save</button>
                <button type="button" @click="toggleUpdate" class="btn btn-outline-dark" style="margin-left: 10px">Close</button>
                <button type="button" @click="confirmDelete" class="btn btn-danger float-end">Delete</button>
            </div>
        </div>
    </div>
</template>
<style scoped>
.btn{
    margin-top: 10px;
}
</style>

<script>

import {strComp} from '../helpers/generator.js';

export default {

    computed: {
        voter() {
            return this.$store.getters['voterModule/getVoter'];
        }
    },

    methods: {

        toggleUpdate() {
            this.$store.dispatch('voterModule/getVoters', this.$route.params.electionId)
                .then(() => {
                    this.$store.commit('voterModule/SET_UPDATING');
                })
                .catch(error => {
                    console.log(error.response);
                })
        },

        saveUpdate() {

            const electionId = this.$route.params.electionId;
            this.voter.comp_key = strComp(this.voter.id, this.voter.voter_id);
            const payload = {
                electionId: electionId,
                voter: this.voter
            }

            this.$store.dispatch('voterModule/updateVoter', payload)
                .then(() => {
                    this.$store.commit('voterModule/SET_UPDATING');
                })
                .catch(error => {
                    let message = '';
                    let errors = error.response.data.errors;

                    if(errors.email) {
                        message = errors.email[0];
                    }
                    else if(errors.name) {
                        message = errors.name[0];
                    }
                    else if(errors.voter_id) {
                        message = errors.voter_id[0];
                    }
                    else if(errors.voter_key) {
                        message = errors.voter_key[0];
                    }
                    else {
                        message = '500 Server Error';
                    }

                    this.$store.commit('warningModule/SET_ERROR_MESSAGE', message);
                    this.$store.commit('warningModule/SET_ERROR');
                });
        },

        confirmDelete() {
            this.$swal.fire({
                icon: 'warning',
                title: 'Delete voter',
                text: 'Are you sure to remove this voter ?',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            })
            .then(result => {
                if(result.isConfirmed) {
                    this.deleteVoter();
                }
            });
        },

        deleteVoter() {

            const payload = {
                id: this.voter.id,
                electionId: this.$route.params.electionId
            }

            this.$store.dispatch('voterModule/deleteVoter', payload)
                .then(() => {
                    this.$store.dispatch('voterModule/getVoters', payload.electionId)
                        .then(() => {
                            this.$swal.fire(
                                'Deleted',
                                'Voter successfully deleted',
                                'success'
                            );
                            this.$store.commit('voterModule/SET_UPDATING');
                        })
                        .catch(error => {
                            console.log(error);
                        });
                })
                .catch(error => {
                    console.log(error);
                })
        }

    }

}
</script>
