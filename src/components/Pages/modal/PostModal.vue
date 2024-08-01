<template>

    <div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">

        <div class="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4">

            <div class="flex justify-between items-center p-4">

                <button @click="closeModal" class="text-black text-2xl">&times;</button>

            </div>

            <div class="flex items-start space-x-4 p-4">

                <img :src="getRandomImage()" alt="Avatar" class="w-12 h-12 rounded-full" />

                <div class="flex-1">

                    <textarea v-model="body" placeholder="What's happening?" class="w-full p-2 rounded-lg resize-none h-32"></textarea>

                </div>

            </div>

            <div class="flex justify-end p-4 border-t">

                <button @click="addTweet" class="bg-blue-500 text-white font-bold py-2 px-4 rounded-full">

                    post

                </button>

            </div>

        </div>

    </div>

</template> 


<script setup>

    import axiosInstance from '@/axiosInstance';

    import { ref, defineEmits } from 'vue';

    import { useTweetIdStore } from '@/stores/tweetId';
    
    const emit = defineEmits(['close']);
    
    const userIdStore =  useTweetIdStore();
    
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
    
    const closeModal = () => {

        emit('close');

    };
    
    const getRandomImage = () => {

        const randomIndex = Math.floor(Math.random() * images.length);

        return images[randomIndex];

    };
    
    const addTweet = async () => {

        try {

        const userId = userIdStore.userId;

        const response = await axiosInstance.post('/tweet/', { body: body.value, user_id: userId });

        body.value = '';

        emit('close');

        console.log(response);

        } catch (error) {

            console.error('Error commenting on tweet:', error);

        }

    };

</script>
  