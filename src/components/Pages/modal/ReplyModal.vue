<template>

    <div v-if="user.username" class="m-4 mt-0 border h-96 ml-6 bg-white fixed rounded-lg items-center shadow-lg">

        <div class="flex items-center justify-between">

            <div class="flex items-center space-x-4">

                <img :src="getRandomImage()" alt="Avatar" class="w-12 h-12 rounded-full" /> 

                <div class="font-bold text-lg">{{ user.first_name }} {{ user.last_name }}

                    <span class="text-gray-400 text-sm mr-2">@{{ user.username }}</span> 

                </div> 

            </div> 

        </div>  

        <div class="">

            <div class="flex justify-start ml-12 mb-3">{{ tweet.body }}</div>

                <span class="text-gray-500 text-sm mb-12 flex justify-start">{{ formatDate(tweet.created_at) }}</span>

            </div>


        </div>

        <div v-else>

            <span>Loading...</span>

        </div>
  
        <div class="h-36 mb-40 pb-8 mt-12 w-fit p-12 mr-8 fixed pt-32">

            <p class="ml-20">Replying to <span class="text-blue-500">@{{ tweet.user.username }}</span></p>

            <img :src="getRandomImage()" alt="Avatar" class="w-12 h-12 rounded-full" /> 

            <div class=" mt-0 mr-0 shadow-lg">

                <input type="text" placeholder="Post your reply" v-model="body" class="border-none p-2 mb-2 h-20 ">

            </div>

            <hr>

            <div class="flex justify-end -mt-12">

            <button @click="commentTweet()"  class="bg-blue-400 mt-1 -mb-4 text-white font-bold py-2 px-4 rounded-3xl">

                Reply

            </button>

        </div>

    </div>


</template>

<script>
import axiosInstance from '@/axiosInstance';


export default {


    data () {

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

            tweet: {},

            user: {},

            body: '',
            
        }

    },
    

    async created() {

        await this.getTweet();

    },

    methods: {

        //Get tweet by Id.
        async getTweet() {

            let id = localStorage.getItem('TweetId');

            try {

                const tweetResponse = await axiosInstance.get('/tweet/' + id);

                this.tweet = tweetResponse.data.tweet;

                this.user = tweetResponse.data.tweet.user;

            } catch (error) {

                console.error(error);

            }   

        },

        //Generate date function and show random picture as profile function.
        formatDate(dateString) {

            const options = { minute: 'numeric', hour: 'numeric', year: 'numeric', month: 'short', day: 'numeric' };

            return new Date(dateString).toLocaleDateString(undefined, options);

        },

        getRandomImage() {

            const randomIndex = Math.floor(Math.random() * this.images.length);

            return this.images[randomIndex];

        },

        //Creating a tweet comment.
        async commentTweet() {

            try {

                let id = localStorage.getItem('userId');

                let tweetId = localStorage.getItem('TweetId');

                await axiosInstance.post('/tweet/comment/',{"body": this.body, "user_id": parseInt(id), "tweet_id": parseInt(tweetId)});
                
                this.body = '';

                await this.getComments();

            } catch(error) {

                console.error(error);

            }

        },

    }

}

</script>

