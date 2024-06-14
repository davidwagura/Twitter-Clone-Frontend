import { defineStore } from 'pinia';

export const useAlertsStore = defineStore('alerts', {

  state: () => ({

    comment: {},

    tweet: null, // Add tweet state here

  }),


  actions: {

    async fetchComments(data) {

      this.comments = data;

      console.log(data);

    },

    setTweet(tweet) { // Add an action to set the tweet

      this.tweet = tweet;

    },

  },

});
