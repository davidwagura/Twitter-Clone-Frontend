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
                        <div class="flex items-center">

                            <img

                                :src="message.user.avatar"

                                alt="User Avatar"

                                class="w-10 h-10 rounded-full mr-3"

                            />

                            <div>

                                <h3 class="font-semibold">{{ message.user.name }}</h3>

                                <p class="text-sm text-gray-500">{{ message.text }}</p>

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

                        :src="selectedMessage.user.avatar"

                        alt="User Avatar"

                        class="w-12 h-12 rounded-full mr-4"

                    />

                    <h2 class="text-xl font-semibold">{{ selectedMessage.user.name }}</h2>
                
                </div>

                <div class="space-y-4">

                    <div

                        v-for="message in selectedMessage.conversation"

                        :key="message.id"

                        class="flex items-start"

                    >

                        <img

                            :src="message.user.avatar"

                            alt="User Avatar"

                            class="w-8 h-8 rounded-full mr-3"

                        />

                        <div>

                            <p class="text-sm text-gray-800">{{ message.text }}</p>

                            <p class="text-xs text-gray-500">{{ message.timestamp }}</p>

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

    import { ref, onMounted } from 'vue';

    const messages = ref([]);

    let selectedMessage = ref(null);

    let newMessage = ref('');

    const fetchMessages = async () => {

        try {

            const userId = localStorage.getItem('userId');

            const response = await axios.get(`http://127.0.0.1:8000/api/user/${userId}`);

            messages.value = response.data.messages;

        } catch (error) {

            console.error('Error fetching messages:', error);

        }

    };

    const selectMessage = (message) => {

        selectedMessage.value = message;

    };

    const sendMessage = async () => {

        if (!newMessage.value) return;


        try {

        const senderId = localStorage.getItem('userId');

        const receiverId = selectedMessage.value.user.id;

        const response = await axios.post(

            `http://127.0.0.1:8000/api/messages/${senderId}/${receiverId}`,

            {

            body: newMessage.value,

            sender_id: senderId,

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