<template>
    <b-container> 
        <b-card style="max-width: 100% max-heigth: 200px">
            <h3>Election Title</h3>
        </b-card>
        <b-card class="mt-2 ">  
            <b-card-text class="float-left"><h3>Voters</h3></b-card-text>
            <b-button variant="outline-dark" class="float-right ml-2">●●●</b-button>
            <b-button variant="success" class="float-right">Add Voter</b-button>
            <b-button variant="outline-primary" class="float-right mr-2">Import</b-button>
        </b-card>
        <b-row class="mt-4">
            <b-col cols="12" md="6" class="mb-2">
                <b-form-input placeholder="Search..."></b-form-input>
            </b-col>
        </b-row>

        <table class="table table-striped">
            <caption>3 voters</caption>
            <thead class="thead-dark">
                <tr class="dark">
                    <th>Voted?</th>
                    <th>Name</th>
                    <th>Voter ID</th>
                    <th>Voter Key</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="voter in voters" v-bind:key="voter.id">
                    <td>{{ voter.voted }}</td>
                    <td>{{ voter.voterName }}</td>
                    <td>{{ voter.voterID }}</td>
                    <td>{{ voter.voterKey }}</td>
                </tr>
            </tbody>
        </table>
    </b-container>
</template>

<script>
    export default {
        data() {
            return {
                currentFilter: '',
                voters: [
                    {
                        id: 1,
                        voted: '',
                        voterName: 'Francis Jay Perlas',
                        voterID: '88F3RTNZ',
                        voterKey: 'GGVYHEEB'
                    },
                    {
                        id: 2,
                        voted: '',
                        voterName: 'Test 2',
                        voterID: 'G1DB13R5',
                        voterKey: '9MPQCX6W'
                    },
                    {
                        id: 3,
                        voted: '',
                        voterName: 'Test 3',
                        voterID: 'SAJ459N1',
                        voterKey: 'HB796JJG'
                    }
                ]
            }
        },
    }
</script>