import { defineStore } from 'pinia';

export const useTokenStore = defineStore('token', {

  state: () => ({

    token: null,

  }),

  actions: {

    setToken(token) {

      this.token = token;

    }

  }

});
