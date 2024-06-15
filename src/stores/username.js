import { defineStore } from 'pinia';

export const useTokenStore = defineStore('username', {

  state: () => ({

    username: null,

  }),

  actions: {

    setUsername(username) {

      this.username = username;

    }

  }

});
