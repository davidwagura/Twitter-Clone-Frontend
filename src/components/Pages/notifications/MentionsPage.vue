<template>

    <div class="max-h-screen">

        <div v-for="mention in mentions" :key="mention.id" class="border-t border-gray-200 p-4 flex items-start space-x-4 hover:bg-gray-100 cursor-pointer">

            <img :src="getRandomImage()" alt="Avatar" class="w-12 h-12 rounded-full" />

            <div class="flex-1">

                <div class="flex items-center space-x-2 mt-6">

                    <div class="mt-2 text-gray-700">{{ mention.body }}</div>

                </div>


            </div>

        </div>

    </div>

</template>
  
<script setup>

    import axios from 'axios';

    import { useTweetIdStore } from '@/stores/tweetId'

    import { useTweetsStore } from '@/stores/tweets';

    import { onMounted } from 'vue';

    const userIdStore = useTweetIdStore();

    const mentionsStore = useTweetsStore();

    let mentions = mentionsStore.mentions;

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

        await getMentions();

    });

    function getRandomImage() {

        const randomIndex = Math.floor(Math.random() * images.length);

        return images[randomIndex];

    }

    const getMentions = async () => {

        const userId = userIdStore.userId;

        const response = await axios.get(`http://127.0.0.1:8000/api/mentions/${userId}/mention`);

        console.log(response.data)

        mentionsStore.setMentions(response.data.mentions);

        console.log(response.data.mentions)

    }

</script>