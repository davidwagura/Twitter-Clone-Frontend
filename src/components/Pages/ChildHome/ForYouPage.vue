<template>
  <div>
    <h2>For You</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <ul v-else>
      <li v-for="tweet in tweets" :key="tweet.id">{{ tweet.content }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

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
        const response = await axios.get('/api/for-you', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Assuming the token is stored in localStorage
          }
        });
        this.tweets = response.data.tweets;
      } catch (err) {
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
