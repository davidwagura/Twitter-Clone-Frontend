<template>
    
    <nav-page />

    <div class="fixed ml-48 top-0 w-6/12 border h-screen">

        <div class="h-12 flex justify-between items-center relative px-4">

            <button @click="navigateTo('for-you')" class="hover:bg-gray-400 w-40 m-4">For You</button>

            <button @click="navigateTo('following')" class="hover:bg-gray-400 w-40 m-4">Following</button>

        </div>
  
        <div class="border h-36 p-2">

            <input type="text" placeholder="What is happening?!" class="w-full border-none mb-2 h-20 p-1 border rounded">

            <hr>

            <div class="flex justify-end">

                <button class="bg-blue-300 mt-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl">

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

    export default {

        name: 'HomePage',

        components: {

            NavPage: NavPage

        },


        methods: {

            navigateTo(child) {

                this.$router.push(`/${child}`);

            },

        },

    };

</script>
