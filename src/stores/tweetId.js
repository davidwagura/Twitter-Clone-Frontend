import { defineStore } from "pinia";

export const useTweetIdStore  = defineStore('tweetId', {

    state: () => ({

        tweetId: null,

    }),

    getters: {

        getTweetId: (state) => state.tweetId,

    },

    actions: {

        setTweetId(tweetId) {

            this.tweetId = tweetId;

        },

        clearTweetId() {

            this.tweetId = null;
      
        },
      
    },

    persist: true,  

});