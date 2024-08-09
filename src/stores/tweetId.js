import { defineStore } from "pinia";

export const useTweetIdStore  = defineStore('tweetId', {

    state: () => ({

        tweetId: null,

        followingTweetId: null,

        followingUsername: null,

        token: null,

        userId: null,

        username: null,

        receiverId: null,

        selectedMessages: null,

        groupIds: [],

        profileId: null,

        relatedId: null,

        selectUser: null,

    }),

    getters: {

        getTweetId: (state) => state.tweetId,

        getFollowingTweetId: (state) => state.followingTweetId,

        getFollowingUsername: (state) => state.followingUsername,

        getToken: (state) => state.token,

        getUserId: (state) => state.userId,

        getUsername: (state) => state.username,

        getReceiverId: (state) => state.receiverId,

        getSelectedMessages: (state) => state.selectedMessages,

        getGroupIds: (state) => state.groupIds,

        getProfileId:(state) => state.profileId,

        getRelatedId:(state) => state.relatedId,

        getSelectUser:(state) => state.selectUser,

    },

    actions: {

        setTweetId(tweetId) {

            this.tweetId = tweetId;

        },

        clearTweetId() {

            this.tweetId = null;
      
        },

        setFollowingTweetId(followingTweetId) {

            this.followingTweetId = followingTweetId;

        },

        setFollowingUsername(followingUsername) {

            this.followingUsername = followingUsername;

        },

        setToken(token) {

            this.token = token;
      
        },
      
        setUserId(userId) {

            this.userId = userId;
      
        },
        
        setUsername(username) {

            this.username = username;
      
        },
      
        setReceiverId(receiverId) {

            this.receiverId = receiverId;
            
        },

        setSelectedMessages(selectedMessages) {

            this.selectedMessages = selectedMessages;

        },

        setGroupIds(id1, id2) {

            this.groupIds = [id1, id2];

        },

        setProfileId(profileId) {

            this.profileId = profileId;
            
        },

        setRelatedId(relatedId) {

            this.relatedId = relatedId;

        },

        setSelectUser(selectUser) {

            this.selectUser = selectUser;

        },
      
    },

    persist: true,  

});