<template>

    <div class="fixed ml-48 top-0 w-6/12 border h-screen">

        <div class="h-12 flex justify-between items-center relative px-4">

            <button @click="navigateTo('for-you')" class="hover:bg-gray-400 w-40 m-4">For You</button>

            <button @click="navigateTo('following')" class="hover:bg-gray-400 w-40 m-4">Following</button>

        </div>
  
        <div class="border h-28 p-2">

            <input type="text" placeholder="What is happening?!" class="w-full mb-2 p-1 border rounded">

            <hr>

            <button class="bg-blue-500 text-white px-4 py-2 rounded">Post</button>

        </div>
  
        <div class="content p-4">

            <router-view></router-view> 

        </div>

    </div>

</template>
  
<script>

    export default {

        name: 'HomePage',

        methods: {

            navigateTo(child) {

                this.$router.push(`/${child}`);

            },

        },

    };

</script>
  
