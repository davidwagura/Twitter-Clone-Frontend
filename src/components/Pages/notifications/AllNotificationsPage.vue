<template>

    <div class="overflow: -moz-scrollbars-none">

        <div v-for="notification in notifications" :key="notification.id" class="border-t border-gray-200 p-4 justify-center">

            <div class="ml-16">

                <img :src="getRandomImage()" alt="Avatar" class="w-12 h-12 rounded-full" /> <br>

            </div>

            <div class="ml-12">{{ notification.body }}</div>

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

    console.log(notifications);

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

        console.log(response.data.notifications)

    }


</script>