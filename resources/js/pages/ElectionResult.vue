<template>
    <div>
        <div class="row shadow border py-2 px-3 mb-4">
            <h4>Result</h4>
        </div>

        <div class="row border p-4 mb-3">
            <div class="col-sm-12 col-md-6">
                <apexchart
                    height="300"
                    type="pie"
                    :options="{
                        series: [votes.voted, votes.not_voted],
                        labels: ['Voted', 'Not yet Voted']
                    }">
                </apexchart>
            </div>
        </div>

        <div v-for="question in questions" :key="question.id" class="row border p-4 mb-3">
            <div class="col-sm-12 col-md-4 col-lg-4">
                <h3>{{ question.title }}</h3>
                <div class="row" v-for="option in question.options" :key="option.id">
                    <span><p><b> {{ option.title }}: </b>( {{ option.votes }} votes )</p></span>
                </div>
            </div>

            <div class="col-sm-12 col-md-8 col-lg-8 shadow p-2">
                <apexchart
                    height="300"
                    type="bar"
                    :options="{
                        chart: { id: question.id },
                        xaxis: { categories: question.options.map(option => option.title) }
                    }"
                    :series="[{
                        name: 'votes',
                        data: question.options.map(option => option.votes)
                    }]">
                </apexchart>
            </div>
        </div>

    </div>
</template>

<script>

import axios from 'axios';

export default {

    data() {
        return {
            questions: [],
            votes: {},
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },

    mounted() {

        axios({
            method: 'GET',
            url: '/api/election_result/' + this.$route.params.electionId,
            headers: {
                Accept: 'application/json'
            }
        })
        .then(response => {
            this.questions = response.data.result;
            console.log(this.questions);
        })
        .catch(error => {
            console.log(error.response);
        });

        axios({
            method: 'GET',
            url: '/api/voter_participation/' + this.$route.params.electionId,
            headers: {
                Accept: 'application/json'
            }
        })
        .then(response => {
            console.log(response.data);
            this.votes = response.data;
        })
        .catch(error => {
            console.log(error.response);
        });

    }
}
</script>
