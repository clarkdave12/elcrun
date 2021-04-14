<template>
    <div class="container">

        <error-422 v-if="has422"></error-422>

        <div :class="blur">
            <h2 class="mb-4 outside-text">ElectionRunner</h2>

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
                    <div @click="login">
                        <div class="d-grid mb-2">
                            <button class="btn btn-success" type="button">Login</button>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-md-4"></div>
            </div>
            <h5 class="outside-text my-3" id="link" @click="navigate('register')">Don't have an account yet? Register now.</h5>
        </div>
    </div>
</template>

<script>

import Error422 from '../components/messages/Error_422.vue';
import CLButton from '../components/UI/CLButton.vue';

export default {

    components: {
        'error-422': Error422,
        'cl-button': CLButton,
    },

    data() {
        return {
            user: {
                email: '',
                password: ''
            }
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

        closeAlert() {
            this.err = '';
        },

        login() {

            this.$store.dispatch('userModule/loginUser', this.user)
                .then(response => {
                    this.$store.commit('UIModule/SET_LOADING_BUTTON');
                    localStorage.setItem('access_token', response.data.access_token);
                    this.$router.push('/');

                })
                .catch(error => {
                    let status = error.response.status;

                    if(status == 401 || status == 422) {
                        this.$store.commit('UIModule/SET_LOADING_BUTTON');
                        this.$swal.fire({
                            icon: 'error',
                            title: 'Invalid Credentials',
                            text: 'The email and password is incorrect'
                        });
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

    .blur {
        filter: blur(8px);
    }
</style>
