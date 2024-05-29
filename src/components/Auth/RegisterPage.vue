<template>

  <div class="flex justify-center items-center bg-gray-200 h-screen">

    <form @submit.prevent ="submitForm()" class="bg-white shadow-md border rounded px-8 pt-6 pb-8 mb-4 w-1/3">

      <div class="mb-4">

        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">

          Username

        </label>

        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" v-model="data.username" type="text" placeholder="Username">

      </div>

      <div class="mb-4">

        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">

          Email

        </label>

        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" v-model="data.email" placeholder="Email">

      </div>

      <div class="mb-6">

        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">

          Password

        </label>

        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" v-model="data.password" placeholder="******************">

      </div>

      <div class="flex items-center justify-between">

        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">

          Register

        </button>

      </div>

      <div class="mt-4">

        <p>Already have an account? <a class="text-blue-700" href="/login">Login</a></p>

      </div>

      <div v-if="successMessage" class="alert alert-success  text-green-400" role="alert">

        {{ successMessage }}

      </div>

    </form>

  </div>

</template>

<script>

import axios from 'axios';

export default {

  name: 'RegisterPage',

  data() {

    return {

      data: {

        username: '',

        email: '',

        password: '',

      },

      successMessage: '',

    };

  },

  methods: {

    submitForm() {

      axios.post('http://127.0.0.1:8000/api/register', this.data)

        .then(response => {

          console.log(response.data);

          this.successMessage = 'You have been successfully registered!.';

          setTimeout(() => {

            this.successMessage = '';

            this.$router.push('/login');

          }, 3000);                 

        })

        .catch(error => {

          console.error('Error adding user:', error);

          this.successMessage = 'Failed to register your details.Try again.';

        });  
          
    }

  }

}
</script>
