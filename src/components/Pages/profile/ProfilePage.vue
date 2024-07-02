<template>

    <div class="flow-root">
        
        <nav-page />

        <div class="flex">

            <div class="w-5/12 border min-h-screen h-fit fixed ml-64">

                <div class="relative">
                    
                    <div class="h-40 bg-gray-200">

                        <img src="https://via.placeholder.com/1500x500" alt="Cover Photo" class="w-full h-full object-cover">

                    </div>

                    <div class="absolute -bottom-12 left-6">

                        <img src="../../../assets/images/4.jpeg" alt="Profile Photo" class="rounded-full h-24 w-24 border-4 border-white">

                    </div>

                    <button class="absolute right-4 bottom-4 border rounded-3xl mt-12 m-4 p-2 font-semibold">Edit Profile</button>

                </div>
        
                <div class="ml-6 mt-16 text-lg">

                    <span class="font-semibold">{{ user.first_name }} {{ user.last_name }}</span><br>

                    <span class="text-gray-500 text-base">@{{ user.username }}</span><br>

                    <span class="text-gray-500 text-base">Joined {{ formatDate(user.created_at) }}</span><br>

                    <span>{{ user.following }} <span class="text-base text-gray-500 mr-4">Following</span> {{ user.followers }}<span class="text-gray-500 text-base"> Followers</span></span>

                </div>
        
                <div class="flex justify-between items-center border-b mt-4 px-4">

                    <button

                        @click="setActiveSection('posts')"

                        :class="['flex-1 text-center py-2.5 font-semibold', activeSection === 'posts' ? 'border-b-4 border-blue-500 text-black' : 'text-gray-500 hover:bg-gray-100']">

                            Tweets

                    </button>

                    <button

                        @click="setActiveSection('replies')"

                        :class="['flex-1 text-center py-2.5 font-semibold', activeSection === 'replies' ? 'border-b-4 border-blue-500 text-black' : 'text-gray-500 hover:bg-gray-100']">

                            Replies

                    </button>

                    <button

                        @click="setActiveSection('likes')"

                        :class="['flex-1 text-center py-2.5 font-semibold', activeSection === 'likes' ? 'border-b-4 border-blue-500 text-black' : 'text-gray-500 hover:bg-gray-100']">

                            Likes

                    </button>

                </div>
        
                <div class="component overflow-y-scroll h-screen mt-4">

                    <component :is="currentSectionComponent"></component>

                </div>

            </div>
    
            <div class="w-4/12 min-h-screen p-8 ml-auto mr-16 mt-10 mb-8 rounded-xl">

                <trends-page-vue />

            </div>

        </div>

    </div>

</template>
  
<script setup>
    import { ref, computed,onMounted } from 'vue';

    import NavPage from '@/components/Navigation Page/NavPage.vue';

    import LikesPage from './LikesPage.vue';

    import PostsPage from './PostsPage.vue';

    import RepliesPage from './RepliesPage.vue';

    import TrendsPageVue from '@/components/Pages/trends/TrendsPage.vue';

    import axiosInstance from '@/axiosInstance';

    import { useTweetIdStore } from '@/stores/tweetId';

    
    const userIdStore = useTweetIdStore();

    const activeSection = ref('posts');

    let user = ref({});

    const currentSectionComponent = computed(() => {

        return activeSection.value === 'posts' ? PostsPage : (activeSection.value === 'replies' ? RepliesPage : (activeSection.value === 'likes' ? LikesPage : 'defaultPage'));

    });

    function setActiveSection(section) {

        activeSection.value = section;

    }

    const getUser = async () => {

        const userId = userIdStore.userId;

        const response = await axiosInstance.get(`/user/${userId}`);

        user.value = response.data.user;

    };

    const formatDate = (dateString) => {

        const options = { year: 'numeric', month: 'short'};

        return new Date(dateString).toLocaleDateString(undefined, options);

    };


    onMounted( async() => {

        await getUser();

    });

</script>