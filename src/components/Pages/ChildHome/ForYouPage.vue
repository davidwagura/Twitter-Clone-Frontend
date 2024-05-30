<template>

  <div class="p-4">

    <h2 class="text-2xl font-bold mb-4">For You</h2>

    <!-- <li v-for="user in users" :key="user.id" class="mb-4 p-2 border rounded">

      <div class="font-bold">{{ user.first_name }} {{ user.last_name }}</div> -->

      <ul>

        <li v-for="tweet in tweets" :key="tweet.id" class="mb-2 p-2 border rounded">

          {{ tweet.body }}

        </li>

      </ul>

    <!-- </li> -->

  </div>

</template>


<script>

import axiosInstance from '@/axiosInstance';

export default {

  data() {

    return {

      tweets: [],

    };

  },

  created() {

    this.fetchTweets();

  },

  methods: {

    async fetchTweets() {

      
      const response = await axiosInstance.get(`/for-you`);

      console.log(response); 

      this.tweets = response.data.tweets;

    },

  },

};

</script>
