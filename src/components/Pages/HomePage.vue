<template>
    
    <nav-page />

    <div class="ml-48 top-0 w-6/12 border min-h-screen h-fit">

        <div class="h-12 flex justify-between items-center relative px-4">

            <button @click="setActiveSection('for-you')" :class=" { 'hover:bg-gray-400 w-40 m-4': activeSection == 'for-you' }">For You</button>

            <button @click="setActiveSection('following')" :class="{ 'hover:bg-gray-400 w-40 m-4': activeSection == 'following' }">Following</button>

        </div>
  
        <div class="border-t h-36 mb-12 p-2">

            <img :src="getRandomImage()" alt="Avatar" class="w-12 h-12 rounded-full" />

            <input type="text" placeholder="What is happening?!" v-model="data.body" class="w-full border-none mb-2 h-20 p-1">

            <hr>

            <div class="flex justify-end">

                <button @click="createTweet()"  class="bg-blue-400 mt-1  text-white font-bold py-2 px-4 rounded-3xl">

                    post

                </button>

            </div>

            <div class="-mt-8 text-green-500">{{ successMessage }}</div>

        </div>

        <div class="component">

            <component :is = "currentSectionComponent"></component> 

        </div>

    </div>

</template>
  
<script>
import NavPage from '../Navigation Page/NavPage.vue';

import ForYouPage from './ChildHome/ForYouPage.vue';

import FollowingPage from './ChildHome/FollowingPage.vue';

import TweetPage from './Tweet/TweetPage.vue';

import axios from 'axios';

    export default {

        name: 'HomePage',

        components: {

            NavPage: NavPage,

            TweetPage: TweetPage,

        },

        data() {

            let id = localStorage.getItem('userId')

            return {

                images: [

                    require('../../assets/images/1.jpeg'),
                    require('../../assets/images/2.jpeg'),
                    require('../../assets/images/3.jpeg'),
                    require('../../assets/images/4.jpeg'),
                    require('../../assets/images/5.jpeg'),
                    require('../../assets/images/6.jpeg'),
                    require('../../assets/images/7.jpeg'),
                    require('../../assets/images/8.jpeg'),
                    require('../../assets/images/9.jpeg'),
                    require('../../assets/images/10.jpeg'),

                ],

                activeSection: 'for-you',

                data: {

                    body: '',

                    user_id: parseInt(id)

                },

                successMessage: '',

                tweet: {},

                comments: [],

                user: {},

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

            getRandomImage() {

                const randomIndex = Math.floor(Math.random() * this.images.length);

                return this.images[randomIndex];

            },

            createTweet() {

                let id = localStorage.getItem('userId')

                let body = this.data.body

                axios.post('http://127.0.0.1:8000/api/tweet', {"body": body, "user_id": parseInt(id)})

                .then(response => {

                    console.log(response);

                    this.successMessage = response.body ? 'Tweet created successfully!' : 'Error creating tweet';

                    this.data.body = '';

                    setTimeout(() =>{

                        this.successMessage = "";

                    }, 2000);    
                                
                })

                .catch(error => {

                    console.error('Error creating tweet:', error);

                    this.successMessage = 'Failed to create tweet.Try again';

                });

            },
            

        },

    };

</script>
