import { defineStore } from "pinia";

export const useTweetIdStore  = defineStore('tweetId', {

    state: () => ({

        tweetId: null,

        followingTweetId: null,

        followingUsername: null,

    }),

    getters: {

        getTweetId: (state) => state.tweetId,

        getFollowingTweet: (state) => state.followingTweetId,

        getFollowingUsername: (state) => state.followingUsername,

    },

    actions: {

        setTweetId(tweetId) {

            this.tweetId = tweetId;

        },

        clearTweetId() {

            this.tweetId = null;
      
        },

        setFollowingTweetId(followingTweetId) {

            this.followingTweet = followingTweetId;

        },

        setFollowingUsername(followingUsername) {

            this.followingUsername = followingUsername;

        }
      
    },

    persist: true,  

});