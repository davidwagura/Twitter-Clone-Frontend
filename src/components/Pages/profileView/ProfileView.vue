<template>

    <div class="flow-root">
        
        <nav-page />

        <div class="flex">

            <div class="border w-6/12 min-h-screen h-fit ml-64">

                <div v-for="u in user" :key="u.id" class="items-center">

                    <div class="flex">

                        <button @click="goBack()" class="mr-4">

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">

                                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />

                            </svg>

                        </button>

                        <h1 class="font-bold text-xl">{{ u.first_name }} {{ u.last_name }}</h1>

                    </div>

                    <span class="ml-10 text-gray-500 text-sm">{{ postCount }} posts</span>
                   
                </div>
        

                <div class="relative">
                    
                    <div class="h-40 bg-gray-200">

                        <img src="../../../assets/images/2.jpeg" alt="Cover Photo" class="w-full h-full object-cover">

                    </div>

                    <div class="absolute -bottom-12 left-6">

                        <img src="../../../assets/images/4.jpeg" alt="Profile Photo" class="rounded-full h-24 w-24 border-4 border-white">

                    </div>

                </div>
        
                <div v-for="u in user" :key="u.id" class="ml-6 mt-16 text-lg">

                    <span class="font-semibold">{{ u.first_name }} {{ u.last_name }}</span><br>

                    <span class="text-gray-500 text-base">@{{ u.username }}</span><br>

                    <span class="text-gray-500 text-base">Joined {{ formatDate(u.created_at) }}</span><br>

                    <span>{{ u.following }} <span class="text-base text-gray-500 mr-4">Following</span> {{ u.followers }}<span class="text-gray-500 text-base"> Followers</span></span>

                </div>
        
                <div class="flex justify-between items-center mt-4 px-4">

                    <button

                        @click="setActiveSection('posts')"

                        :class="['flex-1 text-center py-2.5 font-semibold', activeSection === 'posts' ? 'border-b-4 border-blue-500 text-black' : 'text-gray-500 hover:bg-gray-100']">

                            Posts

                    </button>

                    <button

                        @click="setActiveSection('replies')"

                        :class="['flex-1 text-center py-2.5 font-semibold', activeSection === 'replies' ? 'border-b-4 border-blue-500 text-black' : 'text-gray-500 hover:bg-gray-100']">

                            Replies

                    </button>

                    <button

                        @click="setActiveSection('highlights')"

                        :class="['flex-1 text-center py-2.5 font-semibold', activeSection === 'highlights' ? 'border-b-4 border-blue-500 text-black' : 'text-gray-500 hover:bg-gray-100']">

                            Highlights

                    </button>

                    <button

                        @click="setActiveSection('media')"

                        :class="['flex-1 text-center py-2.5 font-semibold', activeSection === 'media' ? 'border-b-4 border-blue-500 text-black' : 'text-gray-500 hover:bg-gray-100']">

                            Media

                    </button>


                </div>
        
                <div class="mt-4">

                    <component :is="currentSectionComponent"></component>

                </div>

            </div>
    
            <div class="w-4/12 min-h-screen pr-8 pl-8 ml-auto mr-16 mt-10 mb-8 rounded-xl">

                <trends-page-vue />

            </div>

        </div>

    </div>

</template>
  
<script setup>

    import { ref, computed, onMounted } from 'vue';

    import NavPage from '@/components/Navigation Page/NavPage.vue';

    import PostsPage from '../profileView/PostsPage.vue';

    import RepliesPage from '../profileView/RepliesPage.vue';

    import TrendsPageVue from '@/components/Pages/trends/TrendsPage.vue';

    import axiosInstance from '@/axiosInstance';

    import { useTweetIdStore } from '@/stores/tweetId';

    import { useRouter } from 'vue-router';

    
    const profileId = useTweetIdStore();

    const activeSection = ref('posts');

    const user = ref({});
    
    const router = useRouter();

    const postCount = ref(null);


    const currentSectionComponent = computed(() => {

        switch (activeSection.value) {

            case 'posts':

                return PostsPage;

            case 'replies':

                return RepliesPage;

            // case 'highlights':

            //     return HighlightsPage;

            // case 'media':

            //     return MediaPage;

            default:

                return PostsPage;

        }

    });


    function setActiveSection(section) {

        activeSection.value = section;

    }


    const getUser = async () => {

        const userId = profileId.profileId;

        const response = await axiosInstance.get(`/user/${userId}`);

        user.value = response.data.user;

    };

    const getTweets = async () => {
  
        try {
            
            const userId = profileId.profileId;

            const response = await axiosInstance.get(`/user/tweets/${userId}`);

            postCount.value = response.data.tweet.length;
        
        } catch (error) {
    
            console.error('Error fetching tweets:', error);
    
        }
    
    };

    const formatDate = (dateString) => {

        const options = { year: 'numeric', month: 'short'};

        return new Date(dateString).toLocaleDateString(undefined, options);

    };

    const goBack = () => {

        router.push('/home');

    };

    onMounted( async() => {

        await getUser();

        await getTweets();

    });

</script>