<template>

    <div v-if="isVisible" class="fixed inset-0 bg-gray-100 bg-opacity-15 flex items-center justify-center z-50">

        <div  class="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4">

            <div class="border-b px-4 py-2 flex justify-between items-center">

                <h2 class="text-xl font-semibold">Reply to Tweet</h2>

                <button button @click="closeModal" class="text-gray-500 text-2xl">&times;</button>

            </div>

            <div class="p-4" v-if="comment && comment.user">

                <div class="flex items-start space-x-4">

                    <img :src="getRandomImage()" alt="Avatar" class="w-12 h-12 rounded-full" />

                    <div>

                        <div div class="font-bold text-lg mb-3">
                            
                            <span>{{ comment.user.first_name }} {{ comment.user.last_name }}</span>

                            <span class="text-gray-400 text-sm">@{{ comment.user.username }}</span>

                        </div>

                        <div class="text-gray-800 mt-1 mb-3">{{ comment.body }}</div>

                        <span class="text-gray-500 text-sm">{{ formatDate(comment.created_at) }}</span>

                    </div>

                </div>

            </div>

            <div class="px-4 py-2">

                <p class="text-sm text-gray-500 mb-2 flex justify-start ml-12">Replying to <span class="text-blue-500">@{{ comment?.user?.username }}</span></p>

                <div class="flex items-start space-x-4">

                    <img :src="getRandomImage()" alt="Avatar" class="w-12 h-12 rounded-full" />

                    <input v-model="body" placeholder="Post your reply" class="p-2 mb-2 w-full h-24 rounded-lg resize-none"/>

                </div>

                <div class="flex justify-end mt-4">

                    <button @click="commentComment" class="bg-blue-500 text-white font-bold py-2 px-4 rounded-full">Reply</button>

                </div>

            </div>

        </div>

    </div>

</template>
      
<script setup>

    import { ref, onMounted, defineProps, defineEmits } from 'vue';

    import { useTweetIdStore } from '@/stores/tweetId';

    import axiosInstance from '@/axiosInstance';

    const userIdStore = useTweetIdStore();

    const props = defineProps({

        Comment: {

            type: Number,

            required: true,

        },
        
    });

    const emit = defineEmits(['close']);

    const comment = ref({});

    const body = ref('');

    const isVisible = ref(true);

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

    const getComments = async () => {

        const commentId = props.Comment;

        try {

            const response = await axiosInstance.get('/comment/' + commentId);

            comment.value = response.data.Comment;

        } catch (error) {

            console.error(error);

        }
        
    };

    const closeModal = () => {

        isVisible.value = false;

        emit('close');
        
    };

    const formatDate = (dateString) => {

        const options = { minute: 'numeric', hour: 'numeric', year: 'numeric', month: 'short', day: 'numeric' };

        return new Date(dateString).toLocaleDateString(undefined, options);

    };

    const getRandomImage = () => {

        const randomIndex = Math.floor(Math.random() * images.length);

        return images[randomIndex];

    };

    const commentComment = async () => {

        try {

            const userId = userIdStore.userId;

            const commentId = props.Comment;

            await axiosInstance.post('/commentComment/', { body: body.value, user_id: parseInt(userId), comment_id: parseInt(commentId) });

            body.value = '';

            closeModal();

            getComments();

        } catch (error) {

            console.error(error);
            
        }

    };

    onMounted(async () => {

        await getComments();

    });

</script>
