<template>

    <div class="flow-root">
        
        <nav-page />

        <div class="flex">

            <div class="w-5/12 border min-h-screen h-fit ml-64">

                <div class="relative">
                    
                    <div class="h-40 bg-gray-200">

                        <img src="../../../assets/images/2.jpeg" alt="Cover Photo" class="w-full h-full object-cover">

                    </div>

                    <div class="absolute -bottom-12 left-6">

                        <img src="../../../assets/images/4.jpeg" alt="Profile Photo" class="rounded-full h-24 w-24 border-4 border-white">

                    </div>

                    <button @click="openModal" class="absolute right-4 bottom-4 border rounded-3xl -mb-20 m-4 p-2 font-semibold">Edit Profile</button>

                    <EditProfile :showModal="showModal" @close="closeModal" />

                </div>
        
                <div v-for="u in user" :key="u.id" class="ml-6 mt-16 text-lg">

                    <span class="font-semibold">{{ u.first_name }} {{ u.last_name }}</span><br>

                    <span class="text-gray-500 text-base">@{{ u.username }}</span><br>

                    <span class="text-gray-500 text-base">Joined {{ formatDate(u.created_at) }}</span><br>

                    <span>{{ u.following }} <span class="text-base text-gray-500 mr-4">Following</span> {{ u.followers }}<span class="text-gray-500 text-base"> Followers</span></span>

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
        
                <div class="mt-4">

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

    import EditProfile from '@/components/Pages/modal/EditProfile.vue'

    import TrendsPageVue from '@/components/Pages/trends/TrendsPage.vue';

    import axiosInstance from '@/axiosInstance';

    import { useTweetIdStore } from '@/stores/tweetId';

    
    const userIdStore = useTweetIdStore();

    const activeSection = ref('posts');

    const showModal = ref(false);

    const user = ref({});

    const currentSectionComponent = computed(() => {

        return activeSection.value === 'posts' ? PostsPage : (activeSection.value === 'replies' ? RepliesPage : (activeSection.value === 'likes' ? LikesPage : 'defaultPage'));

    });


    const openModal = () => {

        showModal.value = true;

    };

    const closeModal = () => {

        showModal.value = false;

    };

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