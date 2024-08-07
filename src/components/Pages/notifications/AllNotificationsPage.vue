<template>

    <div class="max-h-screen">

        <div

            v-for="notification in notifications" :key="notification.id" 

            :class="{

                'border-t border-gray-200 p-4 flex bg-gray-400 items-start space-x-4 cursor-pointer': notification.seen === 0

            }"
            
        >

            <div class="flex-1 hover:bg-gray-100">

                <div class="flex items-center space-x-2">

                    <img :src="getIcon(notification.action_type)" alt="icon" class="w-8 h-8" />

                    <img :src="getRandomImage()" alt="Avatar" class="w-8 h-8 rounded-full" />

                </div>

                <div class="mt-2 ml-10 text-gray-700">{{ notification.body }}</div>

                <div class="mt-2 ml-10 text-gray-700">

                    <div v-if="notification.related_item">

                        <div v-if="notification.action_type === 'follower'">

                            <span>{{ notification.related_item.first_name }} {{ notification.related_item.last_name }}</span>

                            <span class="text-gray-500"> followed you.</span>

                        </div>

                        <div v-else>

                            <span>{{ notification.action_type }}:</span>

                            <span>{{ notification.related_item.body }}</span>

                        </div>

                    </div>

                    <div v-else class="bg-opacity-85 bg-gray-400">

                        <span>Loading...</span>

                    </div>

                </div>

            </div>

        </div>

    </div>

</template>
  
<script setup>

    import axiosInstance from '@/axiosInstance';

    import { useTweetIdStore } from '@/stores/tweetId';

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

        // await getRelatedItem();

    });
  

    const getRandomImage = () => {

        const randomIndex = Math.floor(Math.random() * images.length);

        return images[randomIndex];

    };
  

    const getNotifications = async () => {

        const userId = userIdStore.userId;

        const response = await axiosInstance.get(`/notifications/${userId}`);

        notificationsStore.setNotifications(response.data.notifications);

    };
  

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

            return require('@/assets/icons/retweet.svg');

            default:

            return '';
            
        }

    };
  
</script>
  