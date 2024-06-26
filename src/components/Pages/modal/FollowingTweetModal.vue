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

                    <input v-model="body" placeholder="Post your reply" class="p-2 mb-2 w-full h-24 rounded-lg resize-none"/>

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

</template>
  
<script setup>

    import { ref, onMounted, defineProps, defineEmits } from 'vue';

    import { useTweetIdStore } from '@/stores/tweetId';

    import axiosInstance from '@/axiosInstance';

    const userIdStore =  useTweetIdStore();

    const props = defineProps({

        Tweet: {

            type: Number,

            required: true,

        },

    });

    const emit = defineEmits(['close']);

    const tweet = ref({});

    const user = ref({});

    const body = ref('');

    const isVisible = ref(true);

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

    const getTweet = async () => {

        const id = props.Tweet;

        try {

            const tweetResponse = await axiosInstance.get('/tweet/' + id);

            tweet.value = tweetResponse.data.tweet;

            user.value = tweetResponse.data.tweet.user;

        } catch (error) {

            console.error(error);

        }

    };

    const closeModal = () => {

        isVisible.value = false;

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

            const id = userIdStore.userId;

            const tweetId = props.Tweet;

           await axiosInstance.post('/tweet/comment/', { body: body.value, user_id: parseInt(id), tweet_id: parseInt(tweetId) });

            body.value = '';

            closeModal();

            getTweet();

        } catch (error) {

            console.error(error);

        }

    };

    onMounted(async () => {

        await getTweet();

    });

</script>