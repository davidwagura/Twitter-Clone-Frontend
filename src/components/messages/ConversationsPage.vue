<template>

    <div class="flex h-screen overflow-hidden">
        
        <div class="justify-end">

            <nav-page />
            
        </div>
    
        <!-- Sidebar -->
        <div class="w-2/5">

            <div class="ml-48 border overflow-auto h-full">

                <div class="p-4">

                    <h2 class="text-lg font-semibold">Messages</h2>

                    <div class="flex justify-end top-0 pb-6 -mt-6">
                        
                        <button @click="showModal = true" class="focus:outline-none">

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                
                            </svg>

                        </button>
                        
                    </div>

                    <input type="text" placeholder="Search Direct Message" class="border p-2 border-gray-500 w-full rounded-3xl" />

                    <div class="space-y-4 mt-6">
                        
                        <div v-for="group in groups" :key="group" @click="getMessages(group.id)">

                            <div class="cursor-pointer p-2 hover:bg-gray-100 rounded">

                                <div class="flex items-center">

                                    <img :src="getRandomImage()" alt="User Avatar" class="w-10 h-10 rounded-full mr-3" />

                                    <div v-if="group">

                                        <span class="font-semibold">{{ group.name }}</span>

                                    </div>

                                    <div v-else></div>

                                </div>

                            </div>

                        </div>

                        <div v-for="(conversation, index) in conversations" :key="index" @click="selectMessage(index)">

                            <div class="cursor-pointer p-2 hover:bg-gray-100 rounded">

                                <div v-if="conversation.user" class="flex items-center">

                                    <img :src="getRandomImage()" alt="User Avatar" class="w-10 h-10 rounded-full mr-3" />

                                    <div>

                                        <span class="font-semibold">{{ conversation.user.first_name }}</span>

                                        <span class="text-sm text-gray-500"> @{{ conversation.user.username }}</span>

                                        <span class="p-1 text-gray-500">.</span>

                                        <span class="text-sm text-gray-500">{{ formatDate1(conversation.conversation[0].created_at) }}</span>

                                        <!-- last-message in conversation-->

                                        <p class="text-sm text-gray-500">{{ getLastMessage(conversation.conversation) }}</p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
  
      <!-- Main Content -->
        <div class="flex-1 p-4 flex flex-col items-center mt-8 justify-center">

            <h1 class="m-1 font-black text-3xl text-black">Select a message</h1>

            <div class="mt-4">

                <span class="text-gray-500 block">Choose from your existing conversations, start a new one,</span>

                <span class="text-gray-500 block">or just keep swimming.</span>

            </div>

            <div class="mt-8">

                <button @click="showModal = true" class="bg-blue-400 rounded-3xl p-4 w-48 text-white">New message</button>

            </div>

        </div>

        <new-message-modal v-if="showModal" @close="closeModal" />

    </div>

</template>
  
<script setup>

    import axios from 'axios';

    import NavPage from '../Navigation Page/NavPage.vue';

    import { useTweetIdStore } from '@/stores/tweetId';

    import { ref, onMounted } from 'vue';

    import { useRouter } from 'vue-router';

    import newMessageModal from '@/components/messages/NewMessageModal.vue'


    const conversations = ref({});

    const users = ref({});

    const user = ref({});

    const groups = ref([]);

    const selectedMessages = ref(null);

    const userIdStore = useTweetIdStore();

    const receiverIdStore = useTweetIdStore();

    const showModal = ref(false);

    const selectedMessagesStore = useTweetIdStore();

    const groupMessage = ref([]);

    const router = useRouter();


    const closeModal = () => {

        showModal.value = false;

    };

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

    const getLastMessage = (conversation) =>  {

        return conversation.length > 0 ? conversation[conversation.length - 1].body : '';

    }


    const getRandomImage = () => {

        const randomIndex = Math.floor(Math.random() * images.length);

        return images[randomIndex];

    };

    const selectMessage = (index) => {

        selectedMessages.value = conversations.value.at(index).conversation;

        selectedMessagesStore.setSelectedMessages(conversations.value.at(index).conversation);

        receiverIdStore.setReceiverId(conversations.value.at(index).user.id);

        const receiverId = receiverIdStore.receiverId;

        getUser();

        const user = userIdStore.userId;

        router.push(`messages/${user}-${receiverId}`)

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

    const getGroup = async() => {

        try {

            const userId = userIdStore.userId;

            const response = await axios.get(`http://127.0.0.1:8000/api/user/groups/${userId}`)

            groups.value = response.data.group;

        } catch(error) {

            console.log(error);

        }

    };

    const getMessages = async(id) => {

        try {

            const response = await axios.get(`http://127.0.0.1:8000/api/group/messages/${id}`);

            console.log(response.data);

            groupMessage.value = response.data.data;

        } catch(error) {

            console.log(error);

        }

    };

    onMounted(() => {

        fetchMessages();

        getGroup();


    });

</script>
