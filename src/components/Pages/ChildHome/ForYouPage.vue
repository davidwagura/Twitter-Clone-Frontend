<template>

  <div class="w-full">

    <div>
      
      <ul v-if="tweetsStore.tweets.length > 0">

        <li v-for="tweet in tweetsStore.tweets" :key="tweet.id" class="p-4 border-t hover:cursor-pointer hover:bg-gray-100">

          <router-link v-if="tweet.user" @click="fetchTweet()" :to="`/${tweet.user.username}/status/${tweet.id}`" class="m-1 cursor-pointer">

            <div class="flex items-center justify-between">

              <div class="flex items-center space-x-4">

                <img :src="getRandomImage()" alt="Avatar" class="w-12 h-12 rounded-full" />

                <div >

                  <div class="font-bold text-lg">

                    {{ tweet.user.first_name }} {{ tweet.user.last_name }}

                    <span class="text-gray-400 text-sm mr-2">@{{ tweet.user.username }}</span>

                    <span class="mr-2">.</span>

                    <span class="text-gray-500 text-sm mt-2">{{ formatDate(tweet.created_at) }}</span>

                  </div>

                </div>

              </div>

            </div>
            
            <div class="p-4">

              <div class="flex justify-start ml-12">{{ tweet.body }}</div>

              <div v-if="tweet.image_path" class="flex justify-start ml-12 mt-2">

                <img :src="`http://127.0.0.1:8000/storage/${tweet.image_path}`" alt="Tweet Image" class="rounded-lg max-w-full h-auto" />

              </div>

            </div>

          </router-link>

          <div>

            <div class="flex justify-between -mb-4">

              <!-- Comment icon button -->
              <button @click="addComment(tweet)" class="flex hover:bg-blue-100 rounded-full p-2 items-center">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" class="size-6">

                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />

                </svg>

                <span v-if="tweet.comments.length > 0">{{ tweet.comments.length }}</span>

              </button>

              <!-- ReplyModal component -->
              <ReplyModal :Tweet="tweetToComment" v-if="isModalVisible" @close="closeModal"></ReplyModal>

              <!-- Retweet icon button -->
              <button @click="toggleRetweet(tweet)" class="flex hover:bg-green-100 rounded-full p-2 items-center">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" :stroke="tweet.isRetweeted ? 'green' : 'gray' " class="size-6">

                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />

                </svg>

                <span v-if="tweet.retweets > 0">{{ tweet.retweets }}</span>

              </button>

              <!-- Like icon button -->
              <button @click="toggleLike(tweet)" class="flex hover:bg-red-100 rounded-full p-2 items-center">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" :stroke="tweet.isLiked ? 'red' : 'gray'" class="size-6">

                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />

                </svg>

                <span v-if="tweet.likes > 0">{{ tweet.likes }}</span>

              </button>

            </div>

          </div>

        </li>

      </ul>

      <div v-else class="text-gray-500">No tweets to display</div>

    </div>

  </div>

</template>

<script setup>

  import axiosInstance from '@/axiosInstance';

  import { onMounted, ref } from 'vue';

  import { useRouter } from 'vue-router';

  import { useTweetIdStore } from '@/stores/tweetId.js';

  import { useTweetsStore } from '@/stores/tweets';

  import ReplyModal from '../modal/ReplyModal.vue';


  const userIdStore = useTweetIdStore();

  const tweetIdStore = useTweetIdStore();

  const tweetsStore = useTweetsStore();

  const username = useTweetIdStore();

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


  let isModalVisible = ref(false);

  let tweetToComment = ref(null);


  onMounted(async () => {

    await fetchTweets();

  });

  const fetchTweets = async () => {

    try {

      const response = await axiosInstance.get('/for-you');

      tweetsStore.setTweets(response.data.tweets);

    } catch (error) {

      console.error('Error fetching tweets:', error);

    }

  };

  const formatDate = (dateString) => {

    const options = { minute: 'numeric', hour: 'numeric', year: 'numeric', month: 'short', day: 'numeric' };

    return new Date(dateString).toLocaleDateString(undefined, options);

  };

  const fetchTweet = async (id) => {

    try {

      const response = await axiosInstance.get('/tweet/' + id);

      username.setUsername(response.data.tweet.user.username);

      tweetIdStore.setTweetId(id);

      const user = username.username;

      router.push(`/${user}/status/${id}`);

    } catch (error) {

      console.error('Error fetching tweet:', error);

    }

  };

  const getRandomImage = () => {

    const randomIndex = Math.floor(Math.random() * images.length);

    return images[randomIndex];

  };

  const addComment = (tweet) => {

    tweetToComment.value = tweet;

    isModalVisible.value = true;

  };

  const closeModal = () => {

    isModalVisible.value = false;

  };

  const toggleLike = async (tweet) => {

    try {

      const userId = userIdStore.userId;

      console.log(userId)

      if (tweet.isLiked) {

        await axiosInstance.post(`/unlike/${tweet.id}/${userId}`);

        tweet.likes--;

      } else {

        await axiosInstance.post(`/like/${tweet.id}/${userId}`);

        tweet.likes++;

      }

      tweet.isLiked = !tweet.isLiked;

    } catch (error) {

      console.error('Error toggling like:', error);

    }

  };

  const toggleRetweet = async (tweet) => {

    try {

      const userId = userIdStore.userId;

      if (tweet.isRetweeted) {

        await axiosInstance.post(`/unretweet/${tweet.id}/${userId}`);

        tweet.retweets--;

      } else {

        await axiosInstance.post(`/retweet/${tweet.id}/${userId}`);

        tweet.retweets++;

      }

      tweet.isRetweeted = !tweet.isRetweeted;

    } catch (error) {

      console.error('Error toggling retweet:', error);
      
    }

  };

</script>
