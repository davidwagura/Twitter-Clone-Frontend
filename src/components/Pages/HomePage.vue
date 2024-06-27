<template>

    <div>

        <nav-page />

        <div class="flex">

            <div class="ml-48 w-8/12 border min-h-screen h-fit">

                <div class="h-12 flex justify-between items-center relative px-4">

                    <button

                        @click="setActiveSection('for-you')"

                        :class="[

                            'flex-1 text-center py-2.5 font-semibold',

                            activeSection === 'for-you' ? 'border-b-4 border-blue-500 text-black' : 'text-gray-500 hover:bg-gray-100'

                        ]"

                    >
        
                        For You

                    </button>

                    <button

                        @click="setActiveSection('following')"

                        :class="[

                            'flex-1 text-center py-2.5 font-semibold',

                            activeSection === 'following' ? 'border-b-4 border-blue-500 text-black' : 'text-gray-500 hover:bg-gray-100'

                        ]"

                    >

                        Following
    
                    </button>

                </div>

  
                <div class="border-t h-36 mb-12 p-2">

                    <img :src="getRandomImage()" alt="Avatar" class="w-12 h-12 rounded-full" />

                    <input type="text" placeholder="What is happening?!" v-model="data.body" class="w-full border-none mb-2 h-20 p-1" />

                    <hr />

                    <div class="flex justify-end">

                        <button @click="createTweet()" class="bg-blue-400 mt-1 text-white font-bold py-2 px-4 rounded-3xl">

                            Post

                        </button>

                    </div>

                    <div class="-mt-8 text-green-500">{{ successMessage }}</div>

                </div>
  
                <div class="component">

                    <component :is="currentSectionComponent"></component>

                </div>

            </div>
  
            <div class="w-6/12 ml-6">

                <trends-page-vue></trends-page-vue>

            </div>

        </div>

    </div>

</template>  

<script setup>
    import { ref, computed } from 'vue';

    import axios from 'axios';

    import NavPage from '../Navigation Page/NavPage.vue';

    import ForYouPage from './ChildHome/ForYouPage.vue';

    import FollowingPage from './ChildHome/FollowingPage.vue';

    import TrendsPageVue from '@/components/Pages/trends/TrendsPage.vue'

    import { useTweetIdStore } from '@/stores/tweetId';
    
    const userIdStore =  useTweetIdStore();

    const images = [

        require('../../assets/images/1.jpeg'),
        require('../../assets/images/2.jpeg'),
        require('../../assets/images/3.jpeg'),
        require('../../assets/images/4.jpeg'),
        require('../../assets/images/5.jpeg'),
        require('../../assets/images/6.jpeg'),
        require('../../assets/images/7.jpeg'),
        require('../../assets/images/8.jpeg'),
        require('../../assets/images/9.jpeg'),
        require('../../assets/images/10.jpeg'),
    ];

    const activeSection = ref('for-you');

    const userId = userIdStore.userId;

    const data = ref({

        body: '',

        user_id: parseInt(userId),

    });

    const successMessage = ref('');

    const currentSectionComponent = computed(() => {

        return activeSection.value === 'for-you' ? ForYouPage : FollowingPage;

    });

    function setActiveSection(section) {

        activeSection.value = section;

    }

    function getRandomImage() {

        const randomIndex = Math.floor(Math.random() * images.length);

        return images[randomIndex];

    }

    async function createTweet() {  

        try {

            const response = await axios.post('http://127.0.0.1:8000/api/tweet', {

                body: data.value.body,

                user_id: data.value.user_id,

            });

            successMessage.value = response ? 'Tweet created successfully!' : 'Error creating tweet';

            data.value.body = '';

            setTimeout(() => {

                successMessage.value = '';

            }, 2000);

        } catch (error) {

            console.error('Error creating tweet:', error);

            successMessage.value = 'Failed to create tweet. Try again';

        }

    }
</script>