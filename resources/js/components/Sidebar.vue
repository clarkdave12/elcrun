<template>
  <div id="sidebar">
        <b-list-group id="group">
            <b-list-group-item @click="navigate('dashboard')" button class="d-flex justify-content-between align-items-center">
                ElectionRunner
            </b-list-group-item>

            <b-list-group-item @click="navigate('overview')" button class="d-flex justify-content-between align-items-center">
                <b-icon icon="house-door-fill"></b-icon>
                Overview
            </b-list-group-item>

            <b-list-group-item @click="navigate('settings')" button class="d-flex justify-content-between align-items-center">
                <b-icon icon="gear-fill"></b-icon>
                Settings
            </b-list-group-item>

            <b-list-group-item button @click="navigate('voters')" class="d-flex justify-content-between align-items-center">
                <b-icon icon="people-fill"></b-icon>
                Voters
            </b-list-group-item>

            <b-list-group-item button @click="navigate('ballot')" class="d-flex justify-content-between align-items-center">
                <b-icon icon="menu-button-wide-fill"></b-icon>
                Ballot
            </b-list-group-item>

            <b-list-group-item button @click="navigate('result')" class="d-flex justify-content-between align-items-center">
                <b-icon icon="menu-button-wide"></b-icon>
                Result
            </b-list-group-item>

            <b-list-group-item button @click="navigate('vote_view')" class="d-flex justify-content-between align-items-center">
                <b-icon icon="eye-fill"></b-icon>
                Votes View
            </b-list-group-item>

        </b-list-group>
    </div>
</template>

<script>
export default {
    methods: {
        navigate(name) {
            this.$router.push({name: name})
                .catch(()=>{});
        }
    }
}
</script>

<style>
    #sidebar {
        background: #0000;
        height: 100vh;
    }
    #group {
        background: black;
    }
</style>
