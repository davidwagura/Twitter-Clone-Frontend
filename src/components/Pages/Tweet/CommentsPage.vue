<template>

  <div v-if="tweet" class="p-4 border-t">

    <div  class="flex items-center justify-between">

      <div class="flex items-center space-x-4">

        <img :src="getRandomImage()" alt="Avatar" class="w-12 h-12 rounded-full" /> 

        <!-- <div class="font-bold text-lg">{{ tweet.user.first_name }} {{ tweet.user.last_name }} -->

          <!-- <span class="text-gray-400 text-sm mr-2">@{{ tweet.user.username }}</span>  -->

          <span class="mr-2">.</span>

        </div> 

      </div> 

    </div>  

    <div>

      <div class="flex justify-start ml-12 mb-3">{{ tweet.body }}</div>

      <span class="text-gray-500 text-sm ml-12">{{ formatDate(tweet.created_at) }}</span>

    </div>

    <hr>

    <div class="flex justify-between p-6 pt-4 -mb-6">

      <!--The comment icon svg -->
      <button @click="addComment()" class="flex hover:bg-blue-100 rounded-full p-2 items-center">

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="blue" class="size-6">

          <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />

        </svg>
        
      </button>

      <!--The retweet icon svg-->
      <button @click="retweet()" class="flex hover:bg-green-100 rounded-full p-2 items-center">

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="green" class="size-6">

          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />

        </svg>

      </button>

      <!--The like icon svg-->
      <button @click="like()" class="flex hover:bg-red-100 rounded-full p-2 items-center">

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="size-6">

          <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />

        </svg>

      </button>

    </div>

  <!-- </div> -->

  <!-- <div v-else> -->

    <!-- <span>Loading...</span> -->

  <!-- </div> -->


  <div class="border-t h-36 mb-40 p-2">

    <!-- <p class="ml-20">Replying to <span class="text-blue-500">@{{ tweet.user.username }}</span></p> -->

    <img :src="getRandomImage()" alt="Avatar" class="w-12 h-12 rounded-full" /> 

    <div class="m-12 mt-0 mr-0 shadow-lg">

      <input type="text" placeholder="Post your reply" v-model="body" class="w-full border-none p-2 mb-2 h-20 ">

    </div>

    <hr>

    <div class="flex justify-end -mt-12">

      <button @click="commentTweet()"  class="bg-blue-400 mt-1 -mb-4 text-white font-bold py-2 px-4 rounded-3xl">

        Reply

      </button>

    </div>

  </div>


  <div class="border-t mt-20">

    <ul v-if="comments.length">

      <li v-for="comment in comments" :key="comment.id" class="p-4 border-t hover:bg-gray-100">

        <div class="flex items-center justify-between">

          <div class="flex items-center space-x-4">

            <img :src="getRandomImage()" alt="Avatar" class="w-12 h-12 rounded-full" />

            <div v-for="user in users" :key="user.id">

              <div class="font-bold text-lg">{{ user.first_name }} {{ user.last_name }}

                <span class="text-gray-400 text-sm mr-2">@{{ user.username }}</span>

                <span class="mr-2">.</span>

                <span class="text-gray-500 text-sm mt-2">{{ formatDate(comment.created_at) }}</span>

              </div>

            </div>

          </div>

        </div>

        <div class="p-4">

          <div class="flex justify-start ml-12">{{ comment.body }}</div>

          <div class="flex justify-between pt-4 -mb-6">

            <!--The comment icon svg -->
            <button @click="addComment()" class="flex hover:bg-blue-100 rounded-full p-2 items-center">

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="blue" class="size-6">

                <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />

              </svg>
              
            </button>

            <!--The retweet icon svg-->
            <button @click="retweet()" class="flex hover:bg-green-100 rounded-full p-2 items-center">

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="green" class="size-6">

                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />

              </svg>

            </button>

            <!--The like icon svg-->
            <button @click="like()" class="flex hover:bg-red-100 rounded-full p-2 items-center">

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="size-6">

                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />

              </svg>

            </button>

          </div>
          
        </div>

      </li>

    </ul>

    <div v-else class="text-gray-500">No comments to display</div>

  </div>



</template>

<script>
import axiosInstance from '@/axiosInstance';

export default {

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

      comments: [],

      tweet: {},

      users: [],

      body: '',

    }

  },

  async created() {

    await this.getComments();

  },

  methods: {

    async getComments() {

      let id = localStorage.getItem('TweetId');

      try {

        const response = await axiosInstance.get('/comments/' + parseInt(id));

        this.comments = response.data.comment;

        console.log(response);

        //Fetch tweets

        for (const comment of this.comments) {

          const tweetId = comment.tweet_id;

          // console.log(comment[0]);

          const tweetResponse = await axiosInstance.get('/tweet/' + tweetId);

          console.log(tweetResponse.data.tweet);

          this.tweet = tweetResponse.data.tweet;

        }

      } catch (error) {

        console.error(error);

      }

    },


    formatDate(dateString) {

      const options = { minute: 'numeric', hour: 'numeric', year: 'numeric', month: 'short', day: 'numeric' };

      return new Date(dateString).toLocaleDateString(undefined, options);

    },

    getRandomImage() {

      const randomIndex = Math.floor(Math.random() * this.images.length);

      return this.images[randomIndex];

    },


    async commentTweet() {

      try {

        let id = localStorage.getItem('userId')

        let tweetId = localStorage.getItem('TweetId');

        const response = await axiosInstance.post('/tweet/comment/',{"body": this.body, "user_id": parseInt(id), "tweet_id": parseInt(tweetId)});

        console.log(response);
        
        this.body = '';

      } catch(error) {

        console.error(error);

      }

    },    

  },

};
</script>
