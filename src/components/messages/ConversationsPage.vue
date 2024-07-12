<template>
    <div class="flex h-screen">

        <div class="justify-end">

            <nav-page />

        </div>
    
        <!-- Sidebar -->
        <div class="w-6/12 ml-48 border justify-center h-full">

            <div class="p-4">

                <h2 class="text-lg font-semibold mb-4">Messages</h2>

                <div class="space-y-4">

                    <div

                        v-for="message in messages"

                        :key="message.id"

                        @click="selectMessage(message)"

                        class="cursor-pointer p-2 hover:bg-gray-100 rounded"

                    >

                    {{ message }}

                        <div class="flex items-center">

                            <img

                                :src="getRandomImage()"

                                alt="User Avatar"

                                class="w-10 h-10 rounded-full mr-3"

                            />

                            <div>

                                <h3 class="font-semibold">

                                    <span>{{ message.first_name }}</span>

                                    <span class="text-gray-500 font-medium"> @{{ message.username }}</span>

                                    <span>{{ formatDate(message.message[0].created_at) }}</span>

                                </h3>

                                <p class="text-sm text-gray-500">{{ message.message[0].body }}</p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    
        <!-- Main Content -->
        <div class="w-3/4 h-full flex flex-col">

            <div v-if="selectedMessage" class="flex-1 p-4 overflow-y-auto">

                <div class="flex items-center mb-4">

                    <img

                        :src="getRandomImage()"

                        alt="User Avatar"

                        class="w-12 h-12 rounded-full mr-4"

                    />

                    <h2 class="text-xl font-semibold">{{ selectedMessage.username }}</h2>
                
                </div>

                <div class="space-y-4">

                    <div

                        v-for="message in selectedMessage.message"

                        :key="message.id"

                        class="flex items-start"

                    >
                        <img

                            :src="getRandomImage()"

                            alt="User Avatar"

                            class="w-8 h-8 rounded-full mr-3"

                        />

                        <div>

                            <p class="text-sm text-gray-800">{{ message.body }}</p>

                            <p class="text-xs text-gray-500">{{ formatDate(message.created_at) }}</p>

                        </div>

                    </div>

                </div>

            </div>
    
            <div

                v-else

                class="flex-1 p-4 flex items-center justify-center text-gray-500"

            >

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

    const messages = ref([]);

    let selectedMessage = ref(null);

    console.log(selectedMessage)

    let newMessage = ref('');

    const userIdStore = useTweetIdStore();


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

            const response = await axios.get(`http://127.0.0.1:8000/api/user/${userId}`);

            messages.value = response.data.user;

            console.log(response.data.user[0].message);


        } catch (error) {

            console.error('Error fetching messages:', error);

        }

    };

    function getRandomImage() {

        const randomIndex = Math.floor(Math.random() * images.length);

        return images[randomIndex];

    }


    const selectMessage = (message) => {

        selectedMessage.value = message;

        console.log(message.message[0].receivers_id)

    };

    const formatDate = (dateString) => {

        const options = { minute: 'numeric', hour: 'numeric', year: 'numeric', month: 'short', day: 'numeric' };

        return new Date(dateString).toLocaleDateString(undefined, options);

    };


    const sendMessage = async () => {

        if (!newMessage.value) return;

        try {

            const userId = userIdStore.userId;

            const receiverId = selectedMessage.value.user.id;

            const response = await axios.post(

                `http://127.0.0.1:8000/api/messages/${userId}/${receiverId}`,

                {

                body: newMessage.value,

                // user_id: userId,

                receivers_id: receiverId,

                }

            );

            selectedMessage.value.conversation.push(response.data);


            newMessage.value = '';  

        } catch (error) {

            console.error('Error sending message:', error);

        }

    };

    onMounted(() => {

        fetchMessages();

    });

</script>