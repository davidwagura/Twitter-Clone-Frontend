<template>

    <div class="max-h-screen">

        <div v-for="notification in notifications" :key="notification.id" class="border-t border-gray-200 p-4 flex items-start space-x-4 hover:bg-gray-100 cursor-pointer">

            <div class="flex-1">

                <div class="flex items-center space-x-2">

                    <img :src="getIcon(notification.action_type)" alt="icon" class="w-8 h-8" />

                    <img :src="getRandomImage()" alt="Avatar" class="w-8 h-8 rounded-full" />

                </div>

                <div class="mt-2 ml-10 text-gray-700">{{ notification.body }}</div>

                <div class="mt-2 ml-10 text-gray-700">{{ getRelatedItem(notification) }}</div>

            </div>

        </div>

    </div>

</template>
  
<script setup>

    import axiosInstance from '@/axiosInstance';

    import { useTweetIdStore } from '@/stores/tweetId'

    import { useTweetsStore } from '@/stores/tweets';

    import { onMounted } from 'vue';

    const userIdStore = useTweetIdStore();

    const notificationsStore = useTweetsStore();

    let notifications = notificationsStore.notifications;

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
    
    onMounted(async () => {

        await getNotifications();

    });

    function getRandomImage() {

        const randomIndex = Math.floor(Math.random() * images.length);

        return images[randomIndex];

    }

    const getNotifications = async () => {

        const userId = userIdStore.userId;

        const response = await axiosInstance.get(`/notifications/${userId}`);

        notificationsStore.setNotifications(response.data.notifications);

    }

    const getIcon = (action_type) => {

        switch (action_type) {

            case 'like':

                return require('@/assets/icons/like.svg');

            case 'notification':

                return require('@/assets/icons/notification.svg');

            case 'comment':

                return require('@/assets/icons/star.svg');

            case 'follower':

                return require('@/assets/icons/profile.svg');

            case 'retweet': 

                return require('@/assets/icons/retweet.svg')

        }

    }

    const getRelatedItem = async (notification) => {

        const id = notification.related_item_id; 
        
        let response;

        // try {

            if (notification.action_type) {

                response = await axiosInstance.get(`/user/${id}`);


            } else {

                response = await axiosInstance.get(`/tweet/${id}`);
            }

            return response.data.tweet;

        // } catch (error) {

        //     console.error('Error fetching related item:', error);

        //     return null;

        // }

    }

</script>