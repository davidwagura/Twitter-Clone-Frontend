<template>
    
    <nav-page />

    <div class="ml-48 top-0 w-6/12 border h-fit">

        <div class="h-12 flex justify-between items-center relative px-4">

            <button @click="navigateTo('for-you')" class="hover:bg-gray-400 w-40 m-4">For You</button>

            <button @click="navigateTo('following')" class="hover:bg-gray-400 w-40 m-4">Following</button>

        </div>
  
        <div class="border h-36 p-2">

            <input type="text" placeholder="What is happening?!" v-model="data.body" class="w-full border-none mb-2 h-20 p-1 border rounded">


            <hr>

            <div class="flex justify-end">

                <button @click="createTweet()"  class="bg-blue-400 mt-1  text-white font-bold py-2 px-4 rounded-3xl">

                    post

                </button>

            </div>

        </div>
  
        <div class="content p-4">

            <router-view></router-view> 

        </div>

    </div>

</template>
  
<script>
import NavPage from '../Navigation Page/NavPage.vue';

import axios from 'axios';

    export default {

        name: 'HomePage',

        components: {

            NavPage: NavPage

        },

        data() {

            return {

                data: {

                    body: '',

                    user_id: localStorage.getItem('userId')

                },

                successMessage: '',

            };

        },


        methods: {

            createTweet() {

                axios.post('http://127.0.0.1:8000/api/tweet', this.data)

                .then(response => {

                    console.log(response);

                    this.successMessage = 'Tweet created successfully!';

                    setTimeout(() => {

                        this.successMessage = '';

                    }, 3000);

                })

                .catch(error => {

                    console.error('Error creating tweet:', error);

                    this.successMessage = 'Failed to create tweet.Try again';

                });

            },

            navigateTo(child) {

                this.$router.push(`/${child}`);

            },

        },

    };

</script>
