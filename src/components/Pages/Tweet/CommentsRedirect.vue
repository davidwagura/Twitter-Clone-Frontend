<template>

    <div class="flow-root">

        <div>

            <nav-page/>

        </div>

        <div class="flex">

            <div class="w-6/12 border ml-48 overflow-auto">

                <!-- Header with back arrow and Post title -->
                <div class="flex items-center p-4 ">

                    <button @click="goBack()" class="mr-4">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">

                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />

                        </svg>

                    </button>

                    <h1 class="font-bold text-xl">Post</h1>

                </div>

                <div v-if="comment.user && comment" class="p-4">

                    <div class="flex items-center justify-between">

                        <div class="flex items-center space-x-4">

                            <img :src="getRandomImage()" alt="Avatar" class="w-12 h-12 rounded-full" />

                            <div class="font-bold text-lg mb-2">

                                <span>{{ comment.user.first_name }} {{ comment.user.last_name }}</span> <br>

                                <span class="text-gray-400 text-sm block mr-2">@{{ comment.user.username }}</span>

                            </div>

                        </div>

                    </div>

                    <div>

                        <div class="flex justify-start ml-12 mb-3">{{ comment.body }}</div>

                            <!-- <div v-if="comment.image_path" class="flex justify-start ml-12 mt-2">

                                <img :src="`http://127.0.0.1:8000/storage/${comment.image_path}`" alt="comment Image" class="rounded-lg max-w-full h-auto" />
                            
                            </div> -->

                        <span class="text-gray-500 text-sm ml-12">{{ formatDate(comment.created_at) }}</span>

                    </div>

                    <hr> 

                    <div class="flex justify-between p-6 pt-4 -mb-6">

                        <!-- The comment icon svg -->
                        <button @click="commentComment" class="flex hover:bg-blue-100 rounded-full p-2 items-center">

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" class="size-6">

                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />

                            </svg>

                            <!-- <span class="ml-1" v-if="comment.comment_comment.length > 0">{{ comment.comment_comments.length }}</span> -->

                            {{ comment.comment_comment.length }}

                        </button>
            
                        <button @click="toggleRetweet(comment)" class="flex hover:bg-green-100 rounded-full p-2 items-center">

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" :stroke="comment.isRetweeted ? 'green' : 'gray'" class="size-6">

                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />

                            </svg>

                            <span class="ml-1" v-if="comment.retweets > 0">{{ comment.retweets }}</span>

                        </button>
                
                        <!-- The like icon svg -->
                        <button @click="toggleLike(comment)" class="flex hover:bg-red-100 rounded-full p-2 items-center">
                            
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" :stroke="comment.isLiked ? 'red' : 'gray'" class="size-6">

                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />

                            </svg>

                            <span class="ml-1" v-if="comment.likes > 0">{{ comment.likes }}</span>

                        </button>

                    </div> 

                    <!-- comment content -->
                    <div class="border-t h-36 mb-20 p-2">
                        
                        <p class="ml-20">Replying to <span class="text-blue-500">@{{ comment.user.username }}</span></p>

                        <img :src="getRandomImage()" alt="Avatar" class="w-12 h-12 rounded-full" />
                        
                        <div class="m-12 mt-0 mr-0">

                            <input type="text" placeholder="Post your reply" v-model="body" class="w-full border-none p-2 mb-2 h-20">

                        </div>

                        <hr>

                        <div class="flex justify-end -mt-12">

                            <button @click="addComment" class="bg-blue-400 mt-1 -mb-4 text-white font-bold py-2 px-4 rounded-3xl">Reply</button>

                        </div>

                    </div>
                    

                    <comment-comment :comment = "comment"></comment-comment>

                </div>
        
                <div v-else class="flex items-center justify-center h-screen">

                    <span>Loading...</span>

                </div>

            </div>

            <div class="w-4/12 min-h-screen p-8 ml-auto mr-16 mt-1 mb-8 rounded-xl">

                <trends-page/>

            </div>

        </div>

    </div>

</template>
  
<script setup>

    import { useRouter } from 'vue-router';

    import axiosInstance from '@/axiosInstance';

    import commentComment from '@/components/Pages/Tweet/commentComments.vue'

    import NavPage from '@/components/Navigation Page/NavPage.vue';

    import TrendsPage from '../trends/TrendsPage.vue';

    import { ref, onMounted } from 'vue';

    import { useTweetIdStore } from '@/stores/tweetId.js';

    import { watch } from 'vue';
    
    const router = useRouter();

    const userIdStore = useTweetIdStore();
    
    import { useRoute } from 'vue-router';

    const route = useRoute();

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
    
    let comment = ref({});

    let body = '';

    const getComment = async () => {

        let id = route.params.id;

        console.log(route.params.id)

        try {

            const response = await axiosInstance.get('/comment/' + id);

            comment.value = response.data.Comment;

            console.log(response.data.Comment);


        } catch (error) {

            console.error(error);

        }

    };
    
    const formatDate = (dateString) => {

        const options = { minute: 'numeric', hour: 'numeric', year: 'numeric', month: 'short', day: 'numeric' };

        return new Date(dateString).toLocaleDateString(undefined, options);

    };
    
    const getRandomImage = () => {

        const randomIndex = Math.floor(Math.random() * images.length);

        return images[randomIndex];

    };
    
    const addComment = async () => {

        try {

            let id = parseInt(userIdStore.userId);

            const commentId = route.params.id;

            const res = await axiosInstance.post('/comment', { body, user_id: parseInt(id), comment_id: parseInt(commentId) });

            body = '';

            getComment();

            console.log(res);

        } catch (error) {

            console.error(error);

        }

    };
    
    const toggleLike = async (comment) => {

        try {

        const userId = userIdStore.userId;

        const commentId = route.params.id;

        if (comment.isLiked) {

            const response = await axiosInstance.post(`/unlikeComment/${commentId}/${userId}`);

            console.log(response);

            comment.likes--;

        } else {

            const response = await axiosInstance.post(`/likeComment/${commentId}/${userId}`);

            console.log(response);

            comment.likes++;

        }

        comment.isLiked = !comment.isLiked;

        } catch (error) {

            console.error(error);

        }

    };
    
    const toggleRetweet = async (comment) => {

        try {

        const userId = userIdStore.userId;

        const commentId = route.params.id;

        if (comment.isRetweeted) {

            const response = await axiosInstance.post(`/unretweetComment/${commentId}/${userId}`);

            console.log(response);

            comment.retweet--;

        } else {

            const response = await axiosInstance.post(`/retweetComment/${commentId}/${userId}`);

            console.log(response);

            comment.retweet++;

        }

        comment.isRetweeted = !comment.isRetweeted;

        } catch (error) {

            console.error(error);

        }

    }; 
    
    const goBack = () => {

        router.push('/home');

    };
    
    onMounted(async () => {

        await getComment();
        
    });

    watch(

        () => route.params.id,

        async () => {

            await getComment();

        }

    );

</script>
  