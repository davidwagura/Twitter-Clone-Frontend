<template>

    <div class="flow-root">

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

                    <div>

                        <!-- <input type="text" placeholder="What is happening?!" v-model="data.body" class="w-full border-none mb-2 min-h-20 p-1" > -->


                        <textarea 

                            v-model="data.body"

                            @input="checkForMention"

                            :class="{

                                'text-blue-400': selectUser
                                
                            }"

                            placeholder="What's happening?!"

                            class="w-full border-none mb-2 min-h-20 p-1"

                        ></textarea>

                            <ul v-if="isDropdownVisible && matchingUsers.length > 0" class="border rounded mt-2 w-full max-h-40 overflow-y-auto">

                                <li 
                                    v-for="user in matchingUsers" 

                                    :key="user.id" 

                                    @click="selectUser(user)"

                                    class="p-2 cursor-pointer hover:bg-gray-100"

                                >
                                    {{ user.first_name }} {{ user.last_name }} ({{ user.username }})

                                </li>

                            </ul>


                        <div v-if="selectedFileUrl" class="flex justify-center mt-2">

                            <img :src="selectedFileUrl" alt="Image Preview" class="w-24 h-24 object-cover rounded" />

                        </div>

                    </div>

                    <div class="flex justify-center">

                        <!-- image icon --> 
                        <label for="image" class="ml-8 cursor-pointer">
                            
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="blue" class="size-5">
                                
                                <path fill-rule="evenodd" d="M1 5.25A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.25A2.25 2.25 0 0 1 1 14.75v-9.5Zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-2.69l-2.22-2.219a.75.75 0 0 0-1.06 0l-1.91 1.909.47.47a.75.75 0 1 1-1.06 1.06L6.53 8.091a.75.75 0 0 0-1.06 0l-2.97 2.97ZM12 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" clip-rule="evenodd" />

                            </svg>

                            <input name="image" type="file" id="image" style="display: none;" @change="onFileChanged($event)">
                        
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

                        <div class="mb-4 ml-64">

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
  
            <div class="w-7/12 min-h-screen mr-6 mt-10 mb-8 ml-4 rounded-xl float-right">

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

    const matchingUsers = ref([]);

    const isDropdownVisible = ref(false);

    const selectUserStore = useTweetIdStore();


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

    const selectedFileUrl = ref(null);


    const data = ref({

        body: '',

        user_id: parseInt(userId),

    });

    const successMessage = ref('');

    const relatedIdStore = useTweetIdStore();

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

        selectedFile.value = event.target.files[0];

        selectedFileUrl.value = URL.createObjectURL(selectedFile.value);

        console.log('Selected file:', selectedFile.value);

    };

    const createTweet = async () => {

        if (data.value.body || selectedFile.value) {

            try {

                const formData = new FormData();

                formData.append('body', data.value.body);

                formData.append('user_id', data.value.user_id);

                if (selectedFile.value) {

                    formData.append('image_path', selectedFile.value);

                }

                for (let [key, value] of formData.entries()) {

                    console.log(`${key}: ${value}`);

                }

                const response = await axios.post('http://127.0.0.1:8000/api/tweet', formData, {

                    headers: {

                        'Content-Type': 'multipart/form-data',

                    },

                    onUploadProgress: (progressEvent) => {

                        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);

                        console.log(`Upload Progress: ${progress}%`);

                    },

                });

                relatedIdStore.setRelatedId(response.data.data.id);

                successMessage.value = response ? 'Tweet created successfully!' : 'Error creating tweet';

                data.value.body = '';

                selectedFile.value = null;

                selectedFileUrl.value = null;

                successMessage.value = '';

                await sendMentionNotification();

            } catch (error) {

                console.error('Error creating tweet:', error);

                if (error.response) {

                    console.error('Error response data:', error.response.data);

                }

                successMessage.value = 'Failed to create tweet. Try again';

            }

        }

    };

    const checkForMention = async () => {

        const lastWord = data.value.body.split(' ').pop();

        if (lastWord.startsWith('@') && lastWord.length > 1) {

            const searchTerm = lastWord.slice(1);

            try {

                const response = await axios.get(`http://127.0.0.1:8000/api/users/search?query=${searchTerm}`);

                matchingUsers.value = response.data.users;

                isDropdownVisible.value = true;

            } catch (error) {

                console.error('Error fetching users:', error);

                isDropdownVisible.value = false;

            }

        } else {

            isDropdownVisible.value = false;

        }

    };

    const selectUser = async (user) => {

        await createTweet();

        selectUserStore.setSelectUser(user.id);

        console.log(user.id);

    };

    const sendMentionNotification = async () => {

        try {

            const createdBy = userIdStore.userId;

            const user_id = selectUserStore.selectUser;

            const response = await axios.post(`http://127.0.0.1:8000/api/mention/${createdBy}/${user_id}`, {

                'related_item_id': relatedIdStore.relatedId

            });

            console.log('Mention notification sent:', response);

        } catch (error) {

            console.error('Error sending mention notification:', error);
            
        }

    };

</script>
