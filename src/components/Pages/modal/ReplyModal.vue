<template>

    <div v-if="tweet.user" class="fixed inset-0 bg-gray-100 bg-opacity-5 flex items-center justify-center z-50">

        <div class="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4">

            <div class="border-b px-4 py-2 flex justify-between items-center">

                <h2 class="text-xl font-semibold">Reply to Tweet</h2>

                <button @click="closeModal" class="text-gray-500 text-2xl">&times;</button>

            </div>

            <div class="p-4">

                <div class="flex items-start space-x-4">

                    <img :src="getRandomImage()" alt="Avatar" class="w-12 h-12 rounded-full" />

                    <div class="">

                        <div class="font-bold text-lg mb-3">{{ user.first_name }} {{ user.last_name }}

                            <span class="text-gray-400 text-sm">@{{ user.username }}</span>

                        </div>

                        <div class="text-gray-800 mt-1 mb-3">{{ tweet.body }}</div>

                        <span class="text-gray-500 text-sm">{{ formatDate(tweet.created_at) }}</span>

                    </div>

                </div>

            </div>

            <div class="px-4 py-2">

                <p class="text-sm text-gray-500 mb-2 flex justify-start ml-12">Replying to <span class="text-blue-500">@{{ tweet.user.username }}</span></p>

                <div class="flex items-start space-x-4">

                    <img :src="getRandomImage()" alt="Avatar" class="w-12 h-12 rounded-full" />

                    <input v-model="body" placeholder="Post your reply" class="border p-2 mb-2 w-full h-24 rounded-lg resize-none"/>

                </div>

                <div class="flex justify-end mt-4">

                    <button @click="commentTweet()" class="bg-blue-500 text-white font-bold py-2 px-4 rounded-full">

                        Reply

                    </button>

                </div>

            </div>

        </div>

    </div>
  
    <div v-else class="flex items-center justify-center h-screen">

      <span>Loading...</span>

    </div>

    <!-- {{ tweetId }} -->

</template>
  
<script>
import axiosInstance from '@/axiosInstance';


export default {

    props: {

        Tweet: {

            type: [Number], 

        }

    },

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

            let id = this.$props.Tweet;

            try {

                const tweetResponse = await axiosInstance.get('/tweet/' + id);

                this.tweet = tweetResponse.data.tweet;

                this.user = tweetResponse.data.tweet.user;

            } catch (error) {

                console.error(error);

            }   

        },

        closeModal() {

            this.$emit('close');

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

                const id = localStorage.getItem('userId');

                let tweetId = this.$props.Tweet;

                console.log(tweetId)

                const res = await axiosInstance.post('/tweet/comment/',{"body": this.body, "user_id": parseInt(id), "tweet_id": parseInt(tweetId)});
                
                this.body = '';

                console.log(res)

            } catch(error) {

                console.error(error);

            }

        },

    }

}

</script>

