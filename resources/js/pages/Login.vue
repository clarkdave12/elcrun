<template>
    <div class="container">
        <h2 class="mb-4 outside-text">ElectionRunner</h2>

        <div v-if="err" class="alert alert-danger" role="alert">

            <b> {{ err }} </b>

            <button type="button" class="close" @click="closeAlert">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

        <div class="row">
            <div class="col-sm-12 col-md-4"></div>
            <div class="col-sm-12 col-md-4 px-3 border shadow">
                <div class="my-3">
                    <label for="email">Email Address</label>
                    <input type="email" placeholder="johndoe@email.com" name="email" id="email" class="form-control" v-model="user.email">
                </div>
                <div class="my-3">
                    <label for="password">Password</label>
                    <input type="password" placeholder="*******" name="password" id="password" class="form-control" v-model="user.password">
                </div>
                <b-button @click="login" block class="my-3" variant="success">Login</b-button>
            </div>
            <div class="col-sm-12 col-md-4"></div>
        </div>
        <h5 class="outside-text my-3" id="link" @click="navigate('register')">Don't have an account yet? Register now.</h5>
    </div>
</template>

<script>
export default {

    data() {
        return {
            user: {
                email: '',
                password: ''
            },

            err: ''
        }
    },

    methods: {
        navigate(name) {
            this.$router.push({name: name});
        },

        closeAlert() {
            this.err = '';
        },

        login() {

            this.$store.dispatch('userModule/loginUser', this.user)
                .then(response => {
                    this.$router.replace('/');
                })
                .catch(error => {
                    if(error.response.status != 500) {
                        this.err = "Invalid credentials";
                        console.log(this.err);
                    }
                });
        }
    }
}
</script>

<style scoped>
    .outside-text {
        text-align: center;
    }

    #link {
        color: blue;
    }

    #link:hover {
        cursor: pointer;
    }

    .container {
        margin-top: 5%;
    }
</style>
