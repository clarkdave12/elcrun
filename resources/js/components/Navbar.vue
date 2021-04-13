<template>
    <div>
        <b-navbar class="px-5" toggleable="lg" type="dark" variant="primary">

            <b-navbar-brand class="ml-3" to="/">
                <h3>electionrunner</h3>
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item to="/">Dashboard</b-nav-item>
                    <!-- <b-nav-item href="#">Settings</b-nav-item> -->
                </b-navbar-nav>

            <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">

                    <b-nav-item>
                        <b-icon icon="bell-fill" variant="light" class="mx-3"></b-icon>
                    </b-nav-item>

                    <b-nav-item-dropdown right class="mr-3">
                        <!-- Using 'button-content' slot -->
                        <template #button-content>
                        <em>{{ user.name }}</em>
                        </template>
                        <b-dropdown-item href="#">Profile</b-dropdown-item>
                        <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
export default {
    computed: {
        user() {
            return this.$store.getters['userModule/getUser'];
        }
    },

    methods: {
        logout() {
            localStorage.removeItem('access_token');
            this.$router.replace('/login');
        }
    }
}
</script>
