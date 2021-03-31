<template>
    <div class="container p-3">
        <h1 id="title" class="mb-3">Create an Election</h1>
        <div class="border row p-3">
            <div class="col-12 my-2">
                <label for="elect-title">
                    <h6>Title</h6>
                </label>
                <input type="text" v-model="input.title" name="elec-title" class="form-control"/>
            </div>

            <div class="col-sm-12 col-md-6 my-2">
                <label for="start-date">
                    <h6>Start Date</h6>
                </label>
                <input type="date" v-model="input.start" name="start-date" class="form-control"/>
            </div>

            <div class="col-sm-12 col-md-6 my-2">
                <label for="end-date">
                    <h6>End Date</h6>
                </label>
                <input type="date" v-model="input.end" name="end-date" class="form-control"/>
            </div>

            <div class="col-12 my-2">
                <label for="timezone">
                    <h6>Timezone</h6>
                </label>
                <select v-model="input.timezone" class="form-control" name="timezone" id="timezone-box">
                    <option>Timezone 1</option>
                    <option>Timezone 2</option>
                    <option>Timezone 3</option>
                    <option>Timezone 4</option>
                    <option>Timezone 5</option>
                </select>
            </div>
            <div class="col-12 my-2">
                <button @click="createElection" class="btn btn-success px-3">Continue</button>
            </div>
        </div>
    </div>
</template>

<script>

import {strGen} from '../helpers/generator.js';
import conf from '../config';

export default {
    data() {
        return {
            input: {
                title: '',
                start: '',
                end: '',
                timezone: '',
            }
        }
    },

    methods: {

        createElection() {
            let baseURL = conf.BASE_URL;
            let randStr = strGen();
            let data = {
                'title': this.input.title,
                'start_date': this.input.start,
                'end_date': this.input.end,
                'timezone': this.input.timezone,
                'election_url': baseURL + '/election/vote/' + randStr,
                'short_url': baseURL + '/election/short/' + randStr,
                'preview_url': baseURL + '/election/preview/vote/' + randStr,
            }

            this.$store.dispatch('electionModule/addElection', data)
                .then(response => {
                    this.$router.push('/');
                })
                .catch(error => {
                    console.log(error.response);
                });
        }

    }
}
</script>

<style scoped>
    #title {
        text-align: center;
    }
</style>
