<template>
    <div class="container">
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
                    :state="userNameState"
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
                    :state="emailState"
                    placeholder="johndoe@email.com"
                    class="form-control" />
                </div>
                 <div class="mb-3">
                    <label for="password">Password</label>
                    <b-form-input type="password"
                    name="password"
                    id="password"
                    :state="passwordState"
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
</template>

<script>

    export default {

        data() {
            return {
                user: {
                    name: '',
                    email: '',
                    password: '',
                    passwordConfirmation: ''
                },

                errors: {
                    nameError: '',
                    emailError: '',
                    passwordError: ''
                },

                reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
            }
        },

        computed: {

            userNameState() {
                if(this.user.name == '') {
                    this.errors.nameError = 'Name is required';
                    return false;
                }
                this.errors.nameError = '';
                return true;
            },

            emailState() {
                if(this.user.email == '') {
                    this.errors.emailError = 'Email is required';
                    return false;
                }
                if(this.reg.test(this.user.email)) {
                    this.errors.emailError = '';
                    return true;
                }
                else {
                    this.errors.emailError = 'Invalid email address';
                    return false;
                }
            },

            passwordState() {
                if(this.user.password == '') {
                    this.errors.passwordError = 'Password is required';
                    return false;
                }
                if(this.user.password.length < 6) {
                    this.errors.passwordError = 'Must be atleast 6 characters';
                    return false;
                }
                if(this.user.password != this.user.passwordConfirmation) {
                    this.errors.passwordError = 'The password do not match';
                    return false;
                }
                this.errors.passwordError = '';
                return true;
            }

        },

        methods: {

            navigate(name) {
                this.$router.push({name: name});
            },

            register() {

                if(this.errors.emailError == '' && this.errors.nameError == '' && this.errors.passwordError == '') {

                   this.$store.dispatch('userModule/registerUser', this.user)
                        .then(response => {
                            this.user = {
                                            name: '',
                                            email: '',
                                            password: '',
                                            passwordConfirmation: ''
                                        }

                            this.$router.replace('/');
                        })
                        .catch(error => {
                            console.log(error.response);
                        });
                }
                else {
                    console.log('Invalid inputs');
                }
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
</style>
