<template>
    <main class="main">
        <router-view></router-view>
    </main>
</template>

<script>

export default {

    mounted() {
        if(!localStorage.getItem('access_token')) {
            localStorage.setItem('access_token', 'TBD');
        }
    }

}

</script>
