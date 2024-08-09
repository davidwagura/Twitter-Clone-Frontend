<template>

    <div class="max-h-screen flow-root">

        <div

            v-for="notification in notifications" :key="notification.id" 

            :class="{

                'border-t border-gray-300 bg-[#d9e7eb]': notification.seen === 0

            }"

            @click="changeStatus(notification.id, notification.related_item_id, notification.action_type)"
            
        >

            <div class="flex-1 border-t border-gray-200 p-4 hover:bg-gray-100 items-start space-x-4 cursor-pointer">

                <div class="flex items-center space-x-2">

                    <img :src="getIcon(notification.action_type)" alt="icon" class="w-8 h-8" />

                    <img :src="getRandomImage()" alt="Avatar" class="w-8 h-8 rounded-full" />

                </div>


                <div class="mt-2 ml-10 text-gray-700">

                    <div v-if="notification.related_item">

                        <div v-if="notification.action_type === 'follower'">

                            <span class="ml-10">{{ notification.related_item.first_name }} {{ notification.related_item.last_name }}</span>

                            <span class="text-gray-500"> followed you.</span>

                        </div>

                        <div v-else>

                            <div class="mt-2 ml-10 text-gray-700">{{ notification.body }}</div>

                            <span class="ml-10">{{ notification.action_type }}:</span>

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

    import axios from 'axios';

    import { useTweetIdStore } from '@/stores/tweetId';

    import { useTweetsStore } from '@/stores/tweets';

    import { onMounted } from 'vue';

    import { useRouter } from 'vue-router';

    const userIdStore = useTweetIdStore();

    const notificationsStore = useTweetsStore();

    let notifications = notificationsStore.notifications;

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
  
    onMounted(async () => {

        await getNotifications();

    });

    const getRandomImage = () => {

        const randomIndex = Math.floor(Math.random() * images.length);

        return images[randomIndex];

    };

    const getNotifications = async () => {

        const userId = userIdStore.userId;

        const response = await axios.get(`http://127.0.0.1:8000/api/notifications/${userId}`);

        notificationsStore.setNotifications(response.data.notifications);

    };

    const changeStatus = async(notificationId, related_item, action_type) => {

        await axios.put(`http://127.0.0.1:8000/api/notification/update/${notificationId}`);

        getNotifications();

        const userId = userIdStore.userId;

        const user = await axios.get(`http://127.0.0.1:8000/api/user/${userId}`);

        const username = user.data.user[0].username;

        if (action_type === 'like') {

            router.push(`${username}/status/${related_item}`);

        } 
        
        else if(action_type === 'retweet'){

            router.push(`${username}/status/${related_item}`);

        }else {

            ''

        }

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
  