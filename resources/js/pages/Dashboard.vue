<template>
    <b-container>
        
        <b-row class="py-3 px-5 shadow">
            <b-col cols="12" md="6">
                <h3>Dashboard</h3>
            </b-col>
            <b-col cols="12" md="6">
                <b-button variant="success" class="float-right">New Election</b-button>
            </b-col>
        </b-row>

        <b-row class="mt-4">
            <b-col cols="12" md="6" class="mb-2">
                <b-form-input placeholder="Search fro election..."></b-form-input>
            </b-col>
            <b-col cols="12" md="6" class="mb-2">
                <select v-model="currentFilter" name="filter" id="filterbox" class="form-control">
                    <option value="" selected disabled> Select Filter</option>
                    <option selected="true" v-for="option in options" v-bind:key="option.id">
                        {{ option.name }}
                    </option>
                </select>
            </b-col>
        </b-row>

        <table class="table table-striped">
            <caption>2 Elections</caption>
            <thead>
                <tr class="dark">
                    <th>TITLE</th>
                    <th>START DATE</th>
                    <th>END DATE</th>
                    <th>STATUS</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="election in elections" v-bind:key="election.id">
                    <td>{{ election.name }}</td>
                    <td>{{ election.start }}</td>
                    <td>{{ election.end }}</td>
                    <td>{{ election.status }}</td>
                </tr>
            </tbody>
        </table>

    </b-container>
</template>

<script>
    export default {
        data() {
            return {
                options: [
                    {
                        id: 1,
                        name: 'Building'
                    },
                    {
                        id: 2,
                        name: 'Running'
                    },
                    {
                        id: 3,
                        name: 'Completed'
                    }
                ],
                currentFilter: '',
                elections: [
                    {
                        id: 1,
                        name: 'Election 1',
                        start: '29-03-2021',
                        end: '04-04-2021',
                        status: 'Running'
                    },
                    {
                        id: 2,
                        name: 'Election 2',
                        start: '29-03-2021',
                        end: '04-04-2021',
                        status: 'Running'
                    },
                    {
                        id: 3,
                        name: 'Election 3',
                        start: '29-03-2021',
                        end: '04-04-2021',
                        status: 'Running'
                    }
                ]
            }
        },
        method: {
            changeFilter() {
                this.data.currentFilter = 'Filter by ' + val;
            }
        }
    }
</script>