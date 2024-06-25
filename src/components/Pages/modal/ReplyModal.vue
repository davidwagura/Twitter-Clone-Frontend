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

                    <div>

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

                    <button @click="commentTweet" class="bg-blue-500 text-white font-bold py-2 px-4 rounded-full">

                        Reply

                    </button>

                </div>

            </div>

        </div>

    </div>

    <div v-else class="flex items-center justify-center h-screen">

      <span>Loading...</span>

    </div>

</template>
  
<script setup>

    import axiosInstance from '@/axiosInstance';

    import { ref, onMounted, defineProps, defineEmits } from 'vue';

    import { useUserIdStore } from '@/stores/userId.js';

    const props = defineProps({

        Tweet: Object, 

    });
    
    const emit = defineEmits(['close']);
    
    const userIdStore = useUserIdStore();
    
    const tweet = ref({});

    const user = ref({});

    const body = ref('');
    
    const images = [

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
    ];
    
    onMounted(async () => {

        await fetchTweet();

    });
    
    const fetchTweet = async () => {

        try {

        const response = await axiosInstance.get('/tweet/' + props.Tweet.id);

        tweet.value = response.data.tweet;

        user.value = response.data.tweet.user;

        } catch (error) {

            console.error('Error fetching tweet:', error);

        }

    };
    
    const closeModal = () => {

        emit('close');

    };
    
    const formatDate = (dateString) => {

        const options = { minute: 'numeric', hour: 'numeric', year: 'numeric', month: 'short', day: 'numeric' };

        return new Date(dateString).toLocaleDateString(undefined, options);

    };
    
    const getRandomImage = () => {

        const randomIndex = Math.floor(Math.random() * images.length);

        return images[randomIndex];

    };
    
    const commentTweet = async () => {

        try {

        const userId = userIdStore.userId;

        const tweetId = props.Tweet.id;

        const response = await axiosInstance.post('/tweet/comment/', { body: body.value, user_id: userId, tweet_id: tweetId });

        body.value = '';

        console.log(response);

        } catch (error) {

            console.error('Error commenting on tweet:', error);

        }

    };

</script>
  