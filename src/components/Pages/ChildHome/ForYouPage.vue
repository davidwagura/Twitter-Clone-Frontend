<template>

  <div class="">

    <h2 class="text-2xl font-bold mb-4">For You</h2>

    <div class="tweet-container">

      <ul v-if="tweets.length">

        <li v-for="tweet in tweets" :key="tweet.id" class="p-4 border hover:bg-gray-100">

          <div class="flex items-center justify-between">

            <div class="flex items-center space-x-4">

              <img :src="'./src'" alt="Avatar" class="w-12 h-12 rounded-full" />

              <div v-if="tweet.user">

                <div class="font-bold text-lg">{{ tweet.user.first_name }} {{ tweet.user.last_name }}</div>

                <div class="text-gray-500">@{{ tweet.user.username }}</div>

              </div>

            </div>

            <button @click="followUser(tweet.user.id)" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full">

              Follow

            </button>

          </div>

          <div class="p-4">

            <div>{{ tweet.body }}</div>

            <div class="text-gray-500 text-sm mt-2">{{ formatDate(tweet.created_at) }}</div>

          </div>

        </li>

      </ul>

      <div v-else class="text-gray-500">No tweets to display</div>

    </div>

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

    formatDate(dateString) {

      const options = { year: 'numeric', month: 'short', day: 'numeric' };

      return new Date(dateString).toLocaleDateString(undefined, options);

    },

  },

};

</script>
