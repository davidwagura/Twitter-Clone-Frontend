<template>

    <div class="flex flex-row  min-h-screen justify-center items-center bg-gray-400">

        <div class="bg-[#fff] p-9 rounded-xl">

            <img class="h-8 m-3 flex justify-center items-center mx-auto" alt="Icon" src="../../assets/icon.svg">

            <h1 class="font-semibold">Log out of X?</h1>

            <span class="font-sm mt-1 text-gray-500">

                You can always log back in at any 
                <br> time. If you just want to switch 
                <br> you can do that by adding 
                <br> an existing account.

            </span>

            <div class="w-full mt-4 border font-bold bg-[#000000] text-[#fff] rounded-3xl p-2 flex justify-center">

                <button @click="logout">Log out</button>

            </div>

            <div class="w-full mt-4 border font-bold p-2 rounded-3xl flex justify-center">

                <button @click="cancel">Cancel</button>

            </div>

        </div>

    </div>

</template>

<script setup>

    import {  useRouter } from 'vue-router'

    const router = useRouter()

    const logout = () => {

        
    }

    const cancel = () => {

        router.push('/home');

    }

</script>