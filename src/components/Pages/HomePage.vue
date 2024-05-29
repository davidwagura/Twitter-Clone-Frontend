<template>

    <div class="fixed ml-48 top-0 w-6/12 border h-screen">

        <div class=" h-12 flex justify-between items-center relative px-4">

            <button @click="getForYou()" class="hover:bg-gray-400 w-40 m-4">For You</button>

            <button @click="gatFollowing()" class="hover:bg-gray-400 w-40 m-4">Following</button>

        </div>

        <div class="border h-28">

            <input type="text" placeholder="What is happening?!"><hr>

            <button class="bg-blue-500 flex justify-end">Post</button>

        </div>

        <div>

        </div>

    </div>

</template>

<script>

    export default {
       
        name
        
    }

</script>