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

                <router-link @click="openPopUp" to="" class="flex items-center">

                    <span data-tooltip="More">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">

                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />

                        </svg>

                    </span>

                </router-link>
                
            </div>


            <!--More popup-->
            <div v-if="morePopUp"  class="bottom-28 fixed top-0 left-16 h-fit w-72 bg-[#fff] rounded-2xl shadow-xl">

                <div class="flex items-center justify-between mb-2">

                    <button @click="openPopUp" class="text-gray-400 hover:text-gray-600">×</button>

                </div>


                <div v-for="u in user" :key="u.id" class="border-t border-gray-200 ">

                    <!-- lists -->
                    <div class="flex m-5">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8 ">
                        
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                        
                        </svg>

                        <span class="mt-2 ml-6 font-extrabold">Lists</span>

                    </div>

                    <!-- premium -->
                    <div class="flex m-5">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
                        
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        
                        </svg>

                        <span class="mt-2 ml-6 font-extrabold">Premiums</span>

                    </div>

                    <!-- bookmarks -->
                    <div class="flex m-5">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
                        
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                        
                        </svg>

                        <span class="mt-2 ml-6 font-extrabold">Bookmarks</span>

                    </div>

                    <!-- monetization -->
                    <div class="flex m-5">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
                        
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                        
                        </svg>

                        <span class="mt-2 ml-6 font-extrabold">Monetization</span>

                    </div>

                    <!-- verified orgs-->
                    <div class="flex m-5">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
                        
                            <path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                        
                        </svg>

                        <span class="mt-2 ml-6 font-extrabold">Verified Orgs</span>

                    </div>

                    <!-- adds -->
                    <div class="flex m-5">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8 ">
                        
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />

                        </svg>

                        <span class="mt-2 ml-6 font-extrabold">Ads</span>

                    </div>


                    <!-- jobs -->
                    <div class="flex m-5">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
                    
                            <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                        
                        </svg>

                        <span class="mt-2 ml-6 font-extrabold">Jobs</span>

                    </div>

                    <!-- space -->
                    <div class="flex m-5">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
                        
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                        
                        </svg>

                        <span class="mt-2 ml-6 font-extrabold">Create your Space</span>

                    </div>

                    <!-- setting -->
                    <div class="flex ml-5">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
                        
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                        
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />

                        </svg>

                        <span class="mt-2 ml-6 font-extrabold">Settings and Privacy</span>

                    </div>
               
                </div>

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

            <div v-if="showPopUp"  class="fixed bottom-28 left-12  w-64 bg-[#fff] rounded-2xl shadow-xl p-4">

                <div class="flex items-center justify-between mb-2">

                    <div class="font-bold">Account Info</div>

                    <button @click="togglePopUp" class="text-gray-400 hover:text-gray-600">×</button>

                </div>

                <div v-for="u in user" :key="u.id" class="border-t border-gray-200 pt-2">

                    <button @click="addAccount" class="w-full text-left p-2 hover:bg-gray-100 rounded-md">Add an existing account</button>
                    
                    <button @click="logout" class="w-full text-left p-2 hover:bg-gray-100 rounded-md">Logout @{{ u.username }}</button>
               
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

    const morePopUp = ref(false);

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

    const openPopUp = () => {

        morePopUp.value = !morePopUp.value;

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