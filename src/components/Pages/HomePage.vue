<template>
    
    <nav-page />

    <div class="ml-48 top-0 w-6/12 border h-fit">

        <div class="h-12 flex justify-between items-center relative px-4">

            <button @click="setActiveSection('for-you')" :class=" { 'hover:bg-gray-400 w-40 m-4': activeSection == 'for-you' }">For You</button>

            <button @click="setActiveSection('following')" :class="{ 'hover:bg-gray-400 w-40 m-4': activeSection == 'following' }">Following</button>

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

            <component :is = "currentSectionComponent"></component> 

        </div>

    </div>

</template>
  
<script>
import NavPage from '../Navigation Page/NavPage.vue';

import ForYouPage from './ChildHome/ForYouPage.vue';

import FollowingPage from './ChildHome/FollowingPage.vue';

import axios from 'axios';

    export default {

        name: 'HomePage',

        components: {

            NavPage: NavPage

        },

        data() {

            let id = localStorage.getItem('userId')

            return {

                activeSection: 'for-you',

                data: {

                    body: '',

                    user_id: parseInt(id)

                },

                successMessage: '',

            };

        },

        computed: {

            currentSectionComponent() {

                return this.activeSection === 'for-you' ? ForYouPage : FollowingPage;
            },

        },

        methods: {

            setActiveSection(section) {

                this.activeSection = section;

            },

            createTweet() {


                let id = localStorage.getItem('userId')

                let body = this.data.body

                axios.post('http://127.0.0.1:8000/api/tweet', {"body": body, "user_id": parseInt(id)})

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
