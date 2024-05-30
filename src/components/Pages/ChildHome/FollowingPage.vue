<template>
    <div class="p-4">
      <h2 class="text-2xl font-bold mb-4">For You</h2>
      <div v-if="loading" class="text-gray-500">Loading...</div>
      <div v-else-if="error" class="text-red-500">{{ error }}</div>
      <ul v-else>
        <li v-for="tweet in tweets" :key="tweet.id" class="mb-2 p-2 border rounded">
          {{ tweet.content }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axiosInstance from '@/axiosInstance';
  
  export default {
    data() {
      return {
        tweets: [],
        loading: true,
        error: null,
      };
    },
    created() {
      this.fetchTweets();
    },
    methods: {
      async fetchTweets() {
        try {
          const userId = localStorage.getItem('userId');
          // Retrieve user ID from local storage
          const response = await axiosInstance.get(`/user/tweets/${userId}`);
          console.log('API Response:', response); // Log the API response for debugging
          this.tweets = response.data.tweets;
        } catch (err) {
          console.error('Error fetching tweets:', err); // Log the error for debugging
          this.error = 'Failed to load tweets';
        } finally {
          this.loading = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any additional styling if needed */
  </style>
  