<template>
<div>
            <div class="col-1 text- left mt-2 mb-2">


            </div>
                <b-card-group deck class="mx-auto" style="width: 800px">

                  <b-card
                    header="Duplicate Election"
                    header-bg-variant="primary"
                    class="font-weight text-light"
                    style="max-width: 800px margin-left: 150px"
                    >

                        <b-form-group
                        >
                        <b-card class="text-lefts">
                        <b-card-text class="dup">Duplicating your election allows to use this election as the base for a new election. It copies the election details, settings, ballot, and voters.
                        </b-card-text>
                        <b-card-text class="dup">After duplicating your election, please verify that the settings were copied over correctly. Your election’s title will be
                            <b>(COPY) (COPY) OMSMC DEMO ELECTION.</b>
                        </b-card-text>
                        </b-card>
                        <p></p>
                            <!-- <b-button style="max-width: 140px" class="botdup" block variant="success">Duplicate Election</b-button> -->
                            <div @click="confirmDuplicate" style="max-width: 200px">
                                <cl-button buttonLabel="Duplicate Election"></cl-button>
                            </div>
                        </b-form-group>

                    </b-card>
                </b-card-group>

    </div>
</template>

<script>

import CLButton from '../UI/CLButton';

export default {

    components: {
        'cl-button': CLButton,
    },

    methods: {

        confirmDuplicate() {

            this.$swal.fire({
                icon: 'warning',
                title: 'Duplicate Election',
                text: 'Are you sure to duplicate this election?',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, duplicate it!'
            })
            .then(result => {
                if(result.isConfirmed) {
                    this.duplicateElection();
                }
            });

        },

        duplicateElection() {
            const id = this.$route.params.electionId;

            this.$store.dispatch('electionModule/duplicateElection', id)
                .then(() => {

                    this.$swal.fire(
                        'Duplicated',
                        'Election has been duplicated',
                        'success'
                    );

                    this.$store.commit('UIModule/SET_LOADING_BUTTON');
                    this.$router.push({name: 'dashboard'});
                })
                .catch(error => {
                    this.$swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!'
                    });
                    console.log(error.response);
                });
        }
    }

}
</script>

<style>
.botdup{
    font-size: 14px;
    size: 100px;
    background-color:#30F404;
}
    .dup{
        color: #302B2A;
        font-family: Arial;
        font-size: 15px;
    }
</style>
