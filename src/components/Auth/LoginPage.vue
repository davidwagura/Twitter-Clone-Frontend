<template>
    <div class="flex justify-center items-center bg-gray-200 h-screen">

        <form @submit.prevent ="loginForm()" class="bg-white shadow-md rounded border px-8 pt-6 pb-8 mb-4 w-1/3">

            <div class="mb-4">

                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">

                    Email

                </label>

                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" v-model="data.email" type="email" placeholder="Email">

            </div>

            <div class="mb-6">

                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">

                    Password

                </label>

                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" v-model="data.password" type="password" placeholder="******************">

            </div>

            <div class="font-medium mb-4">

                <p>Don't have an account? <a href="/" class="text-blue-500">Register</a></p>

            </div>

            <div class="flex items-center justify-between">

                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">

                    Login

                </button>

            </div>

        </form>

        <div v-if="successMessage" class="alert alert-success text-center text-green-400" role="alert">

            {{ successMessage }}

        </div>

    </div>

</template>


<script setup>

    import axios from 'axios';

    import { useTweetIdStore } from '@/stores/tweetId.js';

    import { useRouter } from 'vue-router';


    const userIdStore = useTweetIdStore();

    const tokenStore = useTweetIdStore();

    const router = useRouter();

    const data = {

        email: '',

        password: ''

    };

    let successMessage = '';

    const loginForm = () => {
        
        axios.post('http://127.0.0.1:8000/api/login', data)

        .then(response => {

            console.log(response);

            userIdStore.setUserId(response.data.user.id);

            tokenStore.setToken(response.data.token);

            successMessage = 'You have been successfully logged in!';

            setTimeout(() => {

                successMessage = '';

                router.push('');

            }, 3000);
        })

        .catch(error => {

            console.error('Error logging in user:', error);

            successMessage = 'Failed to login. Try again.';

        });

    };

</script>
