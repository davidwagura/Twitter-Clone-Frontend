<template>

  <div class="">

    <div  class="w-full ">

      <ul v-if="tweets.length">

        <li v-for="tweet in tweets" :key="tweet.id" class="p-4 border-t hover:cursor-pointer hover:bg-gray-100">

          <div @click="fetchTweet(tweet.id)">

            <div class="flex items-center justify-between">

              <div class="flex items-center space-x-4">

                <img :src="getRandomImage()" alt="Avatar" class="w-12 h-12 rounded-full" />

                <div v-if="tweet.user">

                  <div class="font-bold text-lg">{{ tweet.user.first_name }} {{ tweet.user.last_name }}
                  
                    <span class="text-gray-400 text-sm mr-2">@{{ tweet.user.username }}</span>

                    <span class="mr-2">.</span>

                    <span class="text-gray-500 text-sm mt-2">{{ formatDate(tweet.created_at) }}</span>
                  
                  </div>

                </div>

              </div>

            </div>

            <div class="p-4">

              <div class="flex justify-start ml-12">{{ tweet.body }}</div>

            </div>

          </div>
          
          <div>

            <div class="flex justify-between pt-4 -mb-4">

              <!--The comment icon svg -->
              <button @click="addComment(tweet.id)" class="flex hover:bg-blue-100 rounded-full p-2 items-center">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="blue" class="size-6">

                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />

                </svg>

                <!-- <span class="ml-1">{{ tweet }}</span> -->

                <ReplyModal v-if="isModalVisible"></ReplyModal>

              </button>

                <!-- <div v-if="isModalVisible" class="fixed flex justify-center z-50">

                  <div class="bg-white rounded-lg shadow-lg p-6 m-4">

                    <h1 class="text-2xl font-bold text-center mb-4">This is a modal</h1>

                    <hr class="mb-4">

                    <h2 class="text-lg text-center">Here is its content</h2>

                  </div>

                </div> -->
                
              <!--The retweet icon svg-->
              <button @click="toggleRetweet" class="flex hover:bg-green-100 rounded-full p-2 items-center">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" :stroke="isretweeted ? 'green' : 'gray'" class="size-6">

                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />

                </svg>

                <span class="ml-1">{{ tweet.retweets }}</span>

              </button>

              <!--The like icon svg-->
              <button @click="toggleLike" class="flex hover:bg-red-100 rounded-full p-2 items-center">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" :stroke="isLiked ? 'red' : 'gray'" class="size-6">

                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />

                </svg>

                <span class="ml-1">{{ tweet.likes }}</span>

              </button>

            </div>

          </div>
          

        </li>

      </ul>


      <div v-else class="text-gray-500">No tweets to display</div>

    </div>

  </div>

</template>


<script>

import axiosInstance from '@/axiosInstance';

import ReplyModal from '../modal/ReplyModal.vue'

export default {

  components: {

    ReplyModal

  },

  data() {

    return {

      images: [

        require('../../../assets/images/1.jpeg'),
        require('../../../assets/images/2.jpeg'),
        require('../../../assets/images/3.jpeg'),
        require('../../../assets/images/4.jpeg'),
        require('../../../assets/images/5.jpeg'),
        require('../../../assets/images/6.jpeg'),
        require('../../../assets/images/7.jpeg'),
        require('../../../assets/images/8.jpeg'),
        require('../../../assets/images/9.jpeg'),
        require('../../../assets/images/10.jpeg'),

      ],

      tweets: [],

      isLiked: false,

      isretweeted: false,

      isModalVisible: false,

    };

  },

  created() {

    this.fetchTweets();

  },

  methods: {

    async fetchTweets() {
      
      const response = await axiosInstance.get(`/for-you`);

      this.tweets = response.data.tweets;

      // this.fetchTweets();

    },

    formatDate(dateString) {

      const options = {minute: 'numeric', hour: 'numeric', year: 'numeric', month: 'short', day: 'numeric' };

      return new Date(dateString).toLocaleDateString(undefined, options);

    },

    async fetchTweet(id) {
      
      const response = await axiosInstance.get('/tweet/' + id);
 
      localStorage.setItem('TweetId', id);

      localStorage.setItem('username', response.data.tweet.user.username);

      const user = response.data.tweet.user.username;

      this.$router.push(`/${user}/status/${id}`);

      // this.fetchTweets();

    },

    getRandomImage() {

      const randomIndex = Math.floor(Math.random() * this.images.length);

      return this.images[randomIndex];

    },

    addComment(id) {

      this.isModalVisible = !this.isModalVisible;

      console.log(id);

    },
    
    async toggleLike() {
            
      try {

        let userId = localStorage.getItem('userId');

        let tweetId = localStorage.getItem('TweetId');

        const likesId = parseInt(localStorage.getItem('likesId'));

        console.log(likesId);
        

        if (this.isLiked) {

          const response =  await axiosInstance.post(`/unlike/${tweetId}/${userId}`);

          console.log(response)

          this.tweet.likes--;

        } else {

          const response = await axiosInstance.post(`/like/${tweetId}/${userId}`);

          console.log(response)

          this.tweet.likes++;

        }

          this.isLiked = !this.isLiked;

      } catch (error) {

        console.error(error);

      }

    },

    async toggleRetweet() {
            
      try {

        let userId = localStorage.getItem('userId');

        let tweetId = localStorage.getItem('TweetId');

        if (this.isretweeted) {

          const response =  await axiosInstance.post(`/unretweet/${tweetId}/${userId}`);

          console.log(response)

          this.tweet.retweets--;

        } else {

          const response = await axiosInstance.post(`/retweet/${tweetId}/${userId}`);

          console.log(response)

          this.tweet.retweets++;

        }

          this.isretweeted = !this.isretweeted;

      } catch (error) {

          console.error(error);

      }
        
    },

  },

};

</script>






