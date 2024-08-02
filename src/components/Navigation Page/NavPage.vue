<template>

    <div>

        <div class="fixed top-0 left-0 w-48  h-screen">

            <div>

                <img class="h-8 ml-28 m-3" alt="Icon" src="../../assets/icon.svg">

            </div>


            <div class="hover:bg-gray-300  hover:font-medium mr-6 mt-2 rounded-full p-3 ml-28">

                <router-link to="/home" class="flex items-center">

                    <!-- @click="changeRoute('home')"  -->

                    <span data-tooltip="Home">


                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">

                            <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />

                            <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />

                        </svg>

                    </span>

                </router-link>
                    
            </div>

            <div class="hover:bg-gray-300 hover:font-medium mr-6 mt-2 rounded-full p-3 ml-28">

                <router-link to="" class="flex items-center">

                    <span data-tooltip="Explore">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">

                            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />

                        </svg>

                    </span>

                </router-link>
                    
            </div>


            <div class="hover:bg-gray-300 hover:font-medium mr-6 mt-2 rounded-full p-3 ml-28">

                <router-link to="/notifications" class="flex items-center">

                    <span data-tooltip="Notifications">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">

                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />

                        </svg>

                    </span>

                </router-link>
             
            </div>

            <div class="hover:bg-gray-300 hover:font-medium mr-6 mt-2 rounded-full p-3 ml-28">

                <router-link to="/messages" class="flex items-center">
                    
                    <!-- @click="changeRoute('messages')" -->

                    <span data-tooltip="Messages">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">

                            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />

                        </svg>
                        
                    </span>

                </router-link>               

            </div>

            <div class="hover:bg-gray-300 hover:font-medium mr-6 mt-2 rounded-full p-3 ml-28">

                <router-link to="" class="flex items-center">

                    <span data-tooltip="Grok">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">

                            <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z" />

                        </svg>

                    </span>

                </router-link>
                
            </div>

            <div class="hover:bg-gray-300 hover:font-medium mr-6 mt-2 rounded-full p-3 ml-28">

                <router-link to="" class="flex items-center">

                    <span data-tooltip="Communities">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">

                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />

                        </svg>

                    </span>

                </router-link>
               
            </div>

            <div class="hover:bg-gray-300 hover:font-medium mr-6 mt-2 rounded-full p-3 ml-28">

                <router-link to="/profile" class="flex items-center">

                    <span data-tooltip="Profile">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">

                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />

                        </svg>

                    </span>

                </router-link>
                
            </div>

            <div class="hover:bg-gray-300 hover:font-medium mb-2 mr-6 mt-2 rounded-full p-3 ml-28">

                <router-link to="" class="flex items-center">

                    <span data-tooltip="More">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">

                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />

                        </svg>

                    </span>

                </router-link>
                
            </div>

            <button @click="addTweet" class="bg-blue-500 text-white rounded-3xl w-36 ml-4 h-10">

                Post

            </button>

            <post-modal v-if="isModalVisible" @close="closeModal"/>

            <div @click="togglePopUp" v-for="u in user" :key="u.id" class="flex items-center space-x-3 bottom-0 m-4 rounded-3xl p-2 hover:bg-gray-200 cursor-pointer">

                <img :src="getRandomImage()" alt="Avatar" class="w-10 h-10 rounded-full" />

                <div>

                    <div class="font-bold">{{ u.first_name }}</div>

                    <div class="text-gray-400 text-sm">@{{ u.username }}</div>

                </div>

            </div>

            <div v-if="showPopUp" class="fixed bottom-28 left-12  w-64 bg-[#fff] rounded-2xl shadow-xl p-4">

                <div class="flex items-center justify-between mb-2">

                    <div class="font-bold">Account Info</div>

                    <button @click="togglePopUp" class="text-gray-400 hover:text-gray-600">×</button>

                </div>

                <div class="border-t border-gray-200 pt-2">

                    <button @click="addAccount" class="w-full text-left p-2 hover:bg-gray-100 rounded-md">Add an existing account</button>
                    
                    <button @click="logout" class="w-full text-left p-2 hover:bg-gray-100 rounded-md">Logout @{{ currentUsername }}</button>
               
                </div>

            </div>

        </div>

    </div>

</template>

  
<script setup>

    import { ref, onMounted } from 'vue';

    import axios from 'axios';

    import { useTweetIdStore } from '@/stores/tweetId';

    import PostModal from '@/components/Pages/modal/PostModal.vue'


    const userIdStore = useTweetIdStore();
     
    const user = ref({});

    const showPopUp = ref(false);

    const isModalVisible = ref(false);


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
        require('../../assets/images/10.jpeg')
    ];

    const addTweet = () => {

        isModalVisible.value = true;

    };

    const togglePopUp = () => {
        
        showPopUp.value = !showPopUp.value;

    };


    const closeModal = () => {

        isModalVisible.value = false;

    };

    const getRandomImage = () => {

        const randomIndex = Math.floor(Math.random() * images.length);

        return images[randomIndex];

    };

    const getUser = async () => {

        try {

            const userId = userIdStore.userId;

            const response = await axios.get(`http://127.0.0.1:8000/api/user/${userId}`);

            user.value = response.data.user;
                
        } catch (error) {

            console.error('Error fetching messages:', error);

        }

    };

    onMounted( async() => {

        await getUser();

    })

</script>





<style>

    [data-tooltip] {

        position: relative;

        cursor: hand

    }

    [data-tooltip]::after {

        position: absolute;

        opacity: 0;

        pointer-events: none;

        content: attr(data-tooltip);

        left: 0;

        top: calc(100% + 10px);

        border-radius: 3px;

        box-shadow: 0 0 5px 2px rgba(100, 100, 100, 0.6);

        background-color: rgb(62, 61, 61);

        color: white;

        font-size: 12px;

        padding: 2px;

        z-index: 10;

        transform: translateY(-20px);

        transition: all 150ms cubic-bezier(.25, .8, .25, 1);
    }

    [data-tooltip]:hover::after {

        opacity: 1;

        transform: translateY(0);

        transition-duration: 300ms;

    }

</style>