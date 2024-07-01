<template>

    <div class="flow-root">

        <nav-page />

        <div class="flex bg-opacity-5">
            
            <div class="ml-48 w-5/12 float-left border min-h-screen h-fit fixed">


                <div class="border w-full bg-gray-200 h-32">

                   <img src="''" class=""> 

                </div>

                <div class="flow-root">

                    <div class="ml-8 -mt-8">

                        <img src="../../../assets/images/4.jpeg" alt="image" class="rounded-full h-24 w-24 float-left">

                    </div>

                    <button class="float-right border rounded-3xl mt-12 m-4 p-2 font-semibold">Edit Profile</button>

                </div>

                <div class="ml-6 mt-4  text-lg">

                    <span class="font-semibold">{{ user.first_name }}</span> <br>

                    <span class="text-gray-500 text-base">@{{ user.username }}</span> <br>

                    <span class="text-gray-500 text-base">Joined {{ formatDate(user.created_at) }}</span> <br>

                    <span class="">{{ user.following }} <span class="text-base text-gray-500 mr-4">Following</span> {{ user.followers }}<span class="text-gray-500 text-base"> Followers</span> </span>

                </div>



                <div class="h-12 flex justify-between items-center relative px-4">

                    <button

                        @click="setActiveSection('posts')"

                        :class="[

                            'flex-1 text-center py-2.5 font-semibold',

                            activeSection === 'posts' ? 'border-b-4 border-blue-500 text-black' : 'text-gray-500 hover:bg-gray-100'

                        ]"

                    >
        
                        Posts

                    </button>

                    <button

                        @click="setActiveSection('replies')"

                        :class="[

                            'flex-1 text-center py-2.5 font-semibold',

                            activeSection === 'replies' ? 'border-b-4 border-blue-500 text-black' : 'text-gray-500 hover:bg-gray-100'

                        ]"

                    >
        
                        Replies

                    </button>


                    <button

                        @click="setActiveSection('likes')"

                        :class="[

                            'flex-1 text-center py-2.5 font-semibold',

                            activeSection === 'likes' ? 'border-b-4 border-blue-500 text-black' : 'text-gray-500 hover:bg-gray-100'

                        ]"

                    >

                        Likes
    
                    </button>

                </div>
  
                <div class="component overflow-y-scroll h-screen">

                    <component :is="currentSectionComponent"></component>

                </div>

            </div>
  
        </div>
        
        <div class="w-4.5/12 min-h-screen mr-16 mt-10 mb-8 ml-4 rounded-xl float-right">

            <trends-page-vue></trends-page-vue>

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