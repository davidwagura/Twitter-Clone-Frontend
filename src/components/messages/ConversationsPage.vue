<template>

    <div class="flex h-screen">

        <div class="justify-end">

            <nav-page />

        </div>
        
        <!-- Sidebar -->
        <div class="min-w-1/4 ml-48 border w-fit overflow-auto justify-center h-screen min-h-full">

            <div class="p-4">

                <h2 class="text-lg font-semibold mb-4">Messages</h2>

                <div class="space-y-4">

                    <div v-for="(conversation, index) in conversations" :key="index" @click="selectMessage(index)">

                        <div class="cursor-pointer p-2 hover:bg-gray-100 rounded">

                            <div class="flex items-center">

                                <img
                                
                                    :src="getRandomImage()"
                                    
                                    alt="User Avatar"

                                    class="w-10 h-10 rounded-full mr-3"

                                />

                                <div>

                                    <span class="font-semibold">{{ conversation.user.first_name }}</span>

                                    <span class="text-sm text-gray-500"> @{{ conversation.user.username }}</span>

                                    <span class="text-sm text-gray-500">{{ formatDate1(conversation.conversation[0].created_at) }}</span>

                                    <p class="text-sm text-gray-500">Click to view messages</p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
        
        <!-- Main Content -->
        <div class="w-2/4 h-fit min-h-full flex flex-col mr-28 border-r overflow-hidden">

            <div v-for="u in user" :key="u.id" class="m-4 flex">

                <img

                    :src="getRandomImage()"

                    alt="User Avatar"

                    class="w-10 h-10 rounded-full mr-3"

                />

                <span class="font-semibold mt-2">{{ u.first_name }}</span>

            </div>

            <div v-if="selectedMessages" class="flex-1 p-4 overflow-y-auto">

                <div class="space-y-4">

                    <div

                        v-for="message in selectedMessages"

                        :key="message.id"

                        :class="{

                            'flex-row-reverse bg-blue-200 w-fit rounded-2xl p-4 ml-auto': message.sender_id === userIdStore.userId,

                            'flex-row bg-gray-200 w-fit rounded-2xl p-4 mr-auto': message.sender_id !== userIdStore.userId

                        }"

                        class="flex items-start mb-4"

                    >

                        <div>

                            <p class="text-sm text-gray-800">{{ message.body }}</p>

                            <p class="text-xs text-gray-500">{{ formatDate(message.created_at) }}</p>

                        </div>
                    
                    </div>

                </div>

            </div>
            
            <div v-else class="flex-1 p-4 flex items-center justify-center text-gray-500">

                Select a message to view details

            </div>
            
            <div class="border-t p-4">

                <input

                    type="text"

                    v-model="newMessage"

                    placeholder="Start a new message"

                    class="w-full p-2 border rounded"

                />

                <button

                    @click="sendMessage"

                    class="bg-blue-500 text-white px-4 py-2 mt-2 rounded"

                >

                    Send

                </button>

            </div>

        </div>

    </div>

</template>

<script setup>

    import axios from 'axios';

    import NavPage from '../Navigation Page/NavPage.vue';

    import { useTweetIdStore } from '@/stores/tweetId';

    import { ref, onMounted } from 'vue';

    const conversations = ref({});

    const users = ref({});

    const user = ref({});

    const selectedMessages = ref(null);

    const newMessage = ref('');

    const userIdStore = useTweetIdStore();

    const receiverIdStore = useTweetIdStore();

    const images = [

        require('../../assets/images/1.jpeg'),
        require('../../assets/images/2.jpeg'),
        require('../../assets/images/3.jpeg'),
        require('../../assets/images/4.jpeg'),
        require('../../assets/images/5.jpeg'),
        require('../../assets/images/6.jpeg'),
        require('../../assets/images/7.jpeg'),
        require('../../assets/images/8.jpeg'),
        require('../../assets/images/9.jpeg'),
        require('../../assets/images/10.jpeg'),

    ];

    const fetchMessages = async () => {

        try {

            const userId = userIdStore.userId;

            const response = await axios.get(`http://127.0.0.1:8000/api/conversation/${userId}`);

            const { data } = response.data;

            conversations.value = data;

            for (const key in data) {

                users.value = response.data.data[key].user;

                conversations.value = response.data.data;

            }

        } catch (error) {

            console.error('Error fetching messages:', error);

        }

    };

    const getRandomImage = () => {

        const randomIndex = Math.floor(Math.random() * images.length);

        return images[randomIndex];

    };

    const selectMessage = (index) => {

        selectedMessages.value = conversations.value.at(index).conversation;

        receiverIdStore.setReceiverId(conversations.value.at(index).user.id);

        getUser();

    };

    const getUser = async () => {

        try {

            const userId = receiverIdStore.receiverId;

            const response = await axios.get(`http://127.0.0.1:8000/api/user/${userId}`);
            
            user.value = response.data.user;

        } catch(error) {

            console.log(error);

        }

    };

    const formatDate1 = (dateString) => {

        const options = { month: 'short', day: 'numeric' };

        return new Date(dateString).toLocaleDateString(undefined, options);

    };

    const formatDate = (dateString) => {

        const options = { minute: 'numeric', hour: 'numeric', year: 'numeric', month: 'short', day: 'numeric' };

        return new Date(dateString).toLocaleDateString(undefined, options);

    };

    const sendMessage = async () => {

        if (!newMessage.value) return;

        try {

            const userId = userIdStore.userId;

            const receiverId = receiverIdStore.receiverId;

            const response = await axios.post(

                `http://127.0.0.1:8000/api/messages/${userId}/${receiverId}`,

                { 'body': newMessage.value }

            );

            selectedMessages.value.push(response.data.data);

            newMessage.value = '';

            fetchMessages();

        } catch (error) {

            console.error('Error sending message:', error);

        }

    };

    onMounted(() => {

        fetchMessages();

    });

</script>
