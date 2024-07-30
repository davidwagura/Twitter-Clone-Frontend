<template>

  <div class="border-t mt-2 h-screen">

    <ul v-if="comments">

      <li v-for="comment in comments" :key="comment.id" class="p-4 border-t hover:bg-gray-100">

      <router-link :to="`/comments/${comment.id}`" class="m-1 cursor-pointer">

        <div class="flex items-center justify-between">

          <div class="flex items-center space-x-4">


            <img :src="getRandomImage()" alt="Avatar" class="w-12 h-12 rounded-full" />

            <div class="font-bold text-lg">{{ comment.user.first_name }} {{ comment.user.last_name }}

              <span class="text-gray-400 text-sm mr-2">@{{ comment.user.username }}</span>

              <span class="mr-2">.</span>

              <span class="text-gray-500 text-sm mt-2">{{ formatDate(comment.created_at) }}</span>

            </div>

          </div>

        </div>

        <div class="p-4">

          <div class="flex justify-start ml-12">{{ comment.body }}</div>

            <div v-if="comment.image_path" class="flex justify-start ml-12 mt-2">

              <img :src="`http://127.0.0.1:8000/storage/${tweet.image_path}`" alt="Tweet Image" class="rounded-lg max-w-full h-auto" />
                  
            </div>

          <div class="flex justify-between pt-4 -mb-6">

            <!-- The comment icon svg -->
            <button @click="addComment(comment.id)" class="flex hover:bg-blue-100 rounded-full p-2 items-center">

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" class="size-6">

                <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />

              </svg>

              <span class="ml-1" v-if="comment.comment_comment.length > 0">{{ comment.comment_comment.length }}</span>

            </button>

            <comment-reply-modal :Comment="commentId" v-if="isModalVisible" @close="closeModal"></comment-reply-modal>

            <!-- The retweet icon svg -->
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

        </div>

      </router-link>

      </li>

    </ul>

    <div v-else class="text-gray-500">No comments to display</div>
<!-- {{ comments }} -->
  </div>
  
</template>

<script setup>

  import axiosInstance from '@/axiosInstance';

  import { ref, onMounted,defineProps} from 'vue';

  import CommentReplyModal from '../modal/CommentReplyModal.vue';

  import { useTweetIdStore } from '@/stores/tweetId.js';

  const userIdStore =  useTweetIdStore();

  const props = defineProps({

    tweet:  Object    

  });

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


  const comments = ref([]);

  const isModalVisible = ref(false);

  let commentId = ref(null);

  const getComments = async () => {

    try {

      {{  props.tweet.id }}

      const response = await axiosInstance.get('/comments/' + props.tweet.id);

      console.log(response.data.comment)

      comments.value = response.data.comment;

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

  const toggleLike = async (comment) => {

    const userId = userIdStore.userId;

    try {

      if (comment.isLiked) {

        await axiosInstance.post(`/unlikeComment/${comment.id}/${userId}`);

        comment.likes--;

      } else {

        await axiosInstance.post(`/likeComment/${comment.id}/${userId}`);

        comment.likes++;

      }

      comment.isLiked = !comment.isLiked;

    } catch (error) {

      console.error(error);

    }    console.log(comment.id)


  };

  const toggleRetweet = async (comment) => {

    const userId = userIdStore.userId;

    try {

      if (comment.isRetweeted) {

        await axiosInstance.post(`/unretweetComment/${comment.id}/${userId}`);

        comment.retweets--;

      } else {

        await axiosInstance.post(`/retweetComment/${comment.id}/${userId}`);

        comment.retweets++;

      }

      comment.isRetweeted = !comment.isRetweeted;

    } catch (error) {

      console.error(error);

    }

  };

  const addComment = (id) => {

    commentId.value = id;

    console.log(id);

    isModalVisible.value = true;

  };

  const closeModal = () => {

    isModalVisible.value = false;
    
  };

  onMounted(async () => {

    await getComments();

  });

</script>
