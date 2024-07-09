<template>

    <div class="flow-root">

        <nav-page />

        <div class="flex">

            <div class="ml-48 w-6/12 border min-h-screen h-fit">

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


                    <div class="flex justify-center">

                        <!-- image icon --> 
                        <label for="image" class="ml-8">
                            
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="blue" class="size-5">
                                
                                <path fill-rule="evenodd" d="M1 5.25A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.25A2.25 2.25 0 0 1 1 14.75v-9.5Zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-2.69l-2.22-2.219a.75.75 0 0 0-1.06 0l-1.91 1.909.47.47a.75.75 0 1 1-1.06 1.06L6.53 8.091a.75.75 0 0 0-1.06 0l-2.97 2.97ZM12 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" clip-rule="evenodd" />
                            
                            </svg>

                            <input name="image" type="file" @change="onFileChanged( $event )">
                        
                        </label>

                        <!-- gif icon -->
                        <label class="ml-8">
                            
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="blue" class="size-5">
                               
                                <path fill-rule="evenodd" d="M1 5.25A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.25A2.25 2.25 0 0 1 1 14.75v-9.5Zm4.026 2.879C5.356 7.65 5.72 7.5 6 7.5s.643.15.974.629a.75.75 0 0 0 1.234-.854C7.66 6.484 6.873 6 6 6c-.873 0-1.66.484-2.208 1.275C3.25 8.059 3 9.048 3 10c0 .952.25 1.941.792 2.725C4.34 13.516 5.127 14 6 14c.873 0 1.66-.484 2.208-1.275a.75.75 0 0 0 .133-.427V10a.75.75 0 0 0-.75-.75H6.25a.75.75 0 0 0 0 1.5h.591v1.295c-.293.342-.6.455-.841.455-.279 0-.643-.15-.974-.629C4.69 11.386 4.5 10.711 4.5 10c0-.711.19-1.386.526-1.871ZM10.75 6a.75.75 0 0 1 .75.75v6.5a.75.75 0 0 1-1.5 0v-6.5a.75.75 0 0 1 .75-.75Zm3 0h2.5a.75.75 0 0 1 0 1.5H14.5v1.75h.75a.75.75 0 0 1 0 1.5h-.75v2.5a.75.75 0 0 1-1.5 0v-6.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                            
                            </svg>
                       
                        </label>

                        <!-- emoji icon -->
                        <label class="ml-8">
                            
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="blue" class="size-5">
                                
                                <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.536-4.464a.75.75 0 1 0-1.061-1.061 3.5 3.5 0 0 1-4.95 0 .75.75 0 0 0-1.06 1.06 5 5 0 0 0 7.07 0ZM9 8.5c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S7.448 7 8 7s1 .672 1 1.5Zm3 1.5c.552 0 1-.672 1-1.5S12.552 7 12 7s-1 .672-1 1.5.448 1.5 1 1.5Z" clip-rule="evenodd" />
                            
                            </svg>
                        
                        </label>

                        <div class="mb-2">

                            <button @click="createTweet()" class="bg-blue-400 p-1 text-white font-bold  rounded-3xl">

                                <span class="p-4">Post</span>

                            </button>

                        </div>

                    
                    </div>

                    <hr />

                    <div class="-mt-6 text-green-500">{{ successMessage }}</div>

                </div>
  
                <div class="component">

                    <component :is="currentSectionComponent"></component>

                </div>

            </div>
  
            <div class="w-4.5/12 min-h-screen mr-16 mt-10 mb-8 ml-4 rounded-xl float-right">

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

    import TrendsPageVue from '@/components/Pages/trends/TrendsPage.vue';

    import { useTweetIdStore } from '@/stores/tweetId';

    const userIdStore = useTweetIdStore();

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

    const selectedFile = ref(null);

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

    const onFileChanged = (event) => {

        console.log(event.target.files[0]);

        selectedFile.value = event.target.files[0];

    };

    const createTweet = async () => {

        try {

            const formData = new FormData();

            formData.append('body', data.value.body);

            formData.append('user_id', data.value.user_id);


            if (selectedFile.value) {

                formData.append('image_path', selectedFile.value);
                
            }

            // Debugging: Check the FormData contents
            for (let pair of formData.entries()) {
                
                console.log(pair[0] + ', ' + pair[1]);
                
            }

            const response = await axios.post('http://127.0.0.1:8000/api/tweet', formData, {

                headers: {

                    'Content-Type': 'multipart/form-data',

                },

            });

            successMessage.value = response ? 'Tweet created successfully!' : 'Error creating tweet';

            data.value.body = '';

            selectedFile.value = null;

            setTimeout(() => {

                successMessage.value = '';

            }, 2000);

        } catch (error) {

            console.error('Error creating tweet:', error);

            if (error.response) {

                console.error('Error response data:', error.response.data);

            }

            successMessage.value = 'Failed to create tweet. Try again';

        }

    };
    
</script>
