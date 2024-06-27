import { defineStore } from "pinia";

export const useTweetsStore  = defineStore('tweets', {

    state: () => ({

        tweets: [],

        tweet: {},

        trends: [],

    }),

    getters: {

        getTweets: (state) => state.tweets,

        getTweet: (state) => state.tweet,

        getTrends: (state) => state.trends,

    },

    actions: {

        setTweets(tweets) {

            this.tweets = tweets;

        },

        setTweet(tweet) {

            this.tweet = tweet;

        },
        
        setTrends(trends) {

            this.trends = trends;
        }
      
    },

    persist: true,  

});