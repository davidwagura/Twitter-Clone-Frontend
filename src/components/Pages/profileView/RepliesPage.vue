<template>

    <div class="w-full rounded-lg">
  
        <div v-if="replies.length > 0">
    
            <ul>
        
                <li v-for="reply in replies" :key="reply.id" class="p-4 border-t hover:cursor-pointer hover:bg-gray-100">
  
                    <div class="cursor-pointer">
                    
                        <div class="flex items-center justify-between">
                    
                            <div class="flex items-center space-x-4">
                    
                                <img :src="getRandomImage()" alt="Avatar" class="w-12 h-12 rounded-full" />
                    
                                <div v-if="reply.user" class="text-lg font-bold">
                        
                                    <button @click="viewUser(reply.user.id, reply.user.username)" class="m-1 cursor-pointer hover:underline">{{ reply.user.first_name }} {{ reply.user.last_name }}</button>
                        
                                    <span class="text-gray-400 text-sm mr-2">@{{ reply.user.username }}</span>
                        
                                    <span class="mr-2">.</span>
                        
                                    <span class="text-gray-500 text-sm">{{ formatDate(reply.created_at) }}</span>
                        
                                </div>
                    
                            </div>
                    
                        </div>
                
                        <div class="p-4">

                            <router-link :to="`/comments/${reply.id}`" class="m-1 cursor-pointer">

                                <div class="ml-12">{{ reply.body }}</div>

                                <div v-if="reply.image_path" class="flex justify-start ml-12 mt-2">

                                    <img :src="`http://127.0.0.1:8000/storage/${tweet.image_path}`" alt="Tweet Image" class="rounded-lg max-w-full h-auto" />
                                
                                </div>

                            </router-link>
                    
                        </div>
                
                    </div>

                    <div class="flex justify-between pt-4">
                
                        <button @click="addComment(reply.id)" class="flex hover:bg-blue-100 rounded-full p-2 items-center">
                    
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" class="w-6 h-6">
                    
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                    
                            </svg>
                    
                            <!-- <span v-if="tweet.comments.length > 0">{{ comments.length }}</span> -->
                    
                        </button>
                    
                        <button @click="toggleRetweet(reply)" class="flex hover:bg-green-100 rounded-full p-2 items-center">
                    
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" :stroke="reply.isRetweeted ? 'green' : 'gray'" class="w-6 h-6">
                    
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                    
                            </svg>
                    
                            <span v-if="reply.retweets > 0">{{ reply.retweets }}</span>
                    
                        </button>
                    
                        <button @click="toggleLike(reply)" class="flex hover:bg-red-100 rounded-full p-2 items-center">
                    
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" :stroke="reply.isLiked ? 'red' : 'gray'" class="w-6 h-6">
                    
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    
                            </svg>
                    
                            <span v-if="reply.likes > 0">{{ reply.likes }}</span>
                    
                        </button>
                    
                    </div>

                </li>

            
            </ul>
        
        </div>
    
        <div v-else class="text-gray-500">No replies to display</div>

    </div>
   
</template>
  
<script setup>
  
    import axiosInstance from '@/axiosInstance';
  
    import { onMounted,ref } from 'vue';
    
    import { useTweetIdStore } from '@/stores/tweetId';

    import { useRouter } from 'vue-router';

    
    const profileIdStore = useTweetIdStore();

    const replies = ref([]);

    const router = useRouter();
    
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
  
  
    const formatDate = (dateString) => {
  
        const options = { minute: 'numeric', hour: 'numeric', year: 'numeric', month: 'short', day: 'numeric' };
    
        return new Date(dateString).toLocaleDateString(undefined, options);
    
    };
  
    onMounted( async () => {
  
        await getReplies();
  
    });

    const viewUser = (userId, username) => {

        profileIdStore.setProfileId(userId);

        router.push(`${username}`);

    };

    const getRandomImage = () => {
  
        const randomIndex = Math.floor(Math.random() * images.length);
    
        return images[randomIndex];
    
    };
  
    const getReplies = async () => {
  
        try {
            
            const userId = profileIdStore.profileId;

            const response = await axiosInstance.get(`commented/comments/${userId}`);

            console.log(response.data.comment);

            replies.value = response.data.comment;
        
        } catch (error) {
    
            console.error('Error fetching replies:', error);
    
        }
    
    };
    
    const toggleLike = async (reply) => {
  
        try {
    
            const userId = profileIdStore.profileId;
    
            if (reply.isLiked) {
    
                await axiosInstance.post(`/unlike/${reply.id}/${userId}`);
        
                reply.likes--;
    
            } else {
    
                await axiosInstance.post(`/like/${reply.id}/${userId}`);
        
                reply.likes++;
    
            }
    
            reply.isLiked = !reply.isLiked;
    
        } catch (error) {
    
            console.error('Error toggling like:', error);
    
        }
    
    };
  
    const toggleRetweet = async (reply) => {
  
        try {
    
            const userId = profileIdStore.profileId;
    
            if (reply.isRetweeted) {
    
                await axiosInstance.post(`/unretweet/${reply.id}/${userId}`);
        
                reply.retweets--;
        
            } else {
    
                await axiosInstance.post(`/retweet/${reply.id}/${userId}`);
        
                reply.retweets++;
    
            }
    
            reply.isRetweeted = !reply.isRetweeted;
    
        } catch (error) {
    
            console.error('Error toggling retweet:', error);
    
        }
  
    };
  
  
  </script>