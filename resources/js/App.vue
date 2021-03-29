<template>
    <main class="main">
        <router-view></router-view>
    </main>
</template>

<script>

    import Navbar from './components/Navbar.vue';

    export default {
        components: {
            'nav-bar': Navbar,
        }
    }
</script>
