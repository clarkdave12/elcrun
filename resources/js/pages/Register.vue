<template>
    <div class="container">

        <error-422 v-if="has422"></error-422>

        <div :class="blur">
            <h2 class="outside-text my-3">ElectionRunner</h2>
            <div role="group" class="row">
                <div class="col-sm-12 col-md-3"></div>
                <div class="col-sm-12 col-md-6 shadow border p-3">
                    <div class="row mb-3 justify-content-center" id="title-row">
                        <h2 id="title-1" class="mr-2">Sign Up for</h2>
                        <h2 id="title-2">Free</h2>
                    </div>
                    <div class="mb-3">
                        <label for="name">Name</label>
                        <b-form-input type="text"
                        name="name"
                        id="name"
                        v-model="user.name"
                        placeholder="John Doe"
                        aria-describedby="name-feedback"
                        />
                    </div>
                    <div class="mb-3">
                        <label for="email">Email Address</label>
                        <b-form-input type="email"
                        name="email"
                        id="email"
                        v-model="user.email"
                        placeholder="johndoe@email.com"
                        class="form-control" />
                    </div>
                    <div class="mb-3">
                        <label for="password">Password</label>
                        <b-form-input type="password"
                        name="password"
                        id="password"
                        v-model="user.password"
                        placeholder="Password"
                        class="form-control" />
                    </div>
                    <div class="mb-3">
                        <label for="re-password">Re-enter Password</label>
                        <input type="password"
                        name="re-password"
                        id="re-password"
                        v-model="user.passwordConfirmation"
                        placeholder="Enter password again"
                        class="form-control" />
                    </div>
                    <div class="mt-4">
                        <b-button @click="register" variant="success" class="py-2" block>Continue</b-button>
                    </div>
                </div>
                <div class="col-sm-12 col-md-3"></div>
            </div>
            <h4 class="outside-text link my-3" @click="navigate('login')">I already have an account.</h4>
        </div>
    </div>
</template>

<script>
import Error_422 from '../components/messages/Error_422.vue';
    export default {

        components: {
            'error-422': Error_422
        },

        data() {
            return {
                user: {
                    name: '',
                    email: '',
                    password: '',
                    passwordConfirmation: ''
                },

                errors: [],

                reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
            }
        },

        computed: {

            has422() {
                return this.$store.getters['warningModule/get422HasError'];
            },

            blur() {
                if(this.$store.getters['warningModule/get422HasError']) {
                    return 'blur';
                }

                return 'not-blur';
            }

        },

        methods: {

            navigate(name) {
                this.$router.push({name: name});
            },

            register() {

                this.$store.dispatch('userModule/registerUser', this.user)
                    .then(response => {
                        this.user = {
                                        name: '',
                                        email: '',
                                        password: '',
                                        passwordConfirmation: ''
                                    }

                        this.$router.push({name: 'login'});
                    })
                    .catch(error => {
                        const errs = error.response.data.errors;
                        this.errors = [];
                        if(errs.email)
                            this.appendErrors(errs.email);
                        if(errs.name)
                            this.appendErrors(errs.name);
                        if(errs.password)
                            this.appendErrors(errs.password);

                        this.$store.commit('warningModule/SET_REGISTER_422', this.errors);
                        this.$store.commit('warningModule/TOGGLE_HAS_ERROR_422');
                    });
            },

            appendErrors(errs) {
                errs.forEach(error => {
                    this.errors.push(error);
                });
            }
        }
    }
</script>

<style scoped>
    .outside-text {
        text-align: center;
    }

    .container {
        padding-top: 5%;
    }

    #title-1 {
        font-weight: 100;
        text-align: center;
    }

    .link {
        color: blue;
    }

    .link:hover {
        cursor: pointer;
    }

    #title-2 {
        text-align: center;
    }

    label {
        font-weight: bold;
    }

    .blur {
        filter: blur(8px);
    }

</style>
