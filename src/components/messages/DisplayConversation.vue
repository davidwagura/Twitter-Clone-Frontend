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
<!-- 
                                        <span class="text-sm text-gray-500"> @{{ conversation.user.username }}</span>

                                        <span class="p-1 text-gray-500">.</span>

                                        <span class="text-sm text-gray-500">{{ formatDate1(conversation.conversation[0].created_at) }}</span>

                                        <p class="text-sm text-gray-500">{{ getLastMessage(conversation.conversation) }}</p> -->

                                    </div>

                                    <div v-else></div>

                                </div>

                            </div>

                        </div>

                        <div v-for="(conversation, index) in conversations" :key="index" @click="defaultConversation(), selectMessage(index)">

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
        <div class="w-2/4">

            <div class="h-full flex flex-col border-r overflow-hidden">

                <div v-for="u in user" :key="u.id" class="m-4 bg-opacity-20 flex">

                    <img :src="getRandomImage()" alt="User Avatar" class="w-10 h-10 rounded-full mr-3" />

                    <span class="font-semibold mt-2">{{ u.first_name }}</span>

                </div>

                <div v-if="redirectConversation" class="flex-1 p-4 overflow-y-auto">

                    <div class="space-y-4">

                        <div v-for="message in redirectConversation" :key="message.id" class="flex items-start mb-4">

                            <div 
                            
                                :class="{

                                    'flex-row-reverse bg-blue-200 w-fit rounded-2xl p-2 ml-auto': message.sender_id === userIdStore.userId,

                                    'flex-row bg-gray-200 w-fit rounded-2xl p-2 mr-auto': message.sender_id !== userIdStore.userId

                                }"
                                
                            >   {{ message.sender_id }}

                                <div v-if="message.image_path" class="w-40">

                                    <img :src="`http://127.0.0.1:8000/storage/${message.image_path}`" alt="Message Image" class="rounded-lg h-auto" />

                                </div>

                                <p class="text-sm pt-2 text-gray-800">{{ message.body }}</p>

                                <p class="text-xs text-gray-500">{{ formatDate(message.created_at) }}</p>

                            </div>
                            
                        </div>
                        
                    </div>


                </div>

                <!-- groupMessages -->

                <!-- <div v-for="group in groups" :key="group.id" class="m-4 bg-opacity-20 flex">

                    <img :src="getRandomImage()" alt="User Avatar" class="w-10 h-10 rounded-full mr-3" />

                    <span class="font-semibold mt-2">{{ group.name }}</span>

                </div> -->

                <div> 

                    <div v-if="groupMessage" class="flex-1 p-4 overflow-y-auto">

                        <div class="space-y-4">

                            <div v-for="message in groupMessage" :key="message.id" class="flex items-start mb-4">

                                <div 
                                
                                    :class="{

                                        'flex-row-reverse bg-blue-200 w-fit rounded-2xl p-2 ml-auto': message.sender_id === userIdStore.userId,

                                        'flex-row bg-gray-200 w-fit rounded-2xl p-2 mr-auto': message.sender_id !== userIdStore.userId

                                    }"
                                    
                                >

                                    <!-- <div v-if="message.image_path" class="w-40">

                                        <img :src="`http://127.0.0.1:8000/storage/${message.image_path}`" alt="Message Image" class="rounded-lg h-auto" />

                                    </div> -->

                                    <p class="text-sm pt-2 text-gray-800">{{ message.body }}</p>

                                    <p class="text-xs text-gray-500">{{ formatDate(message.created_at) }}</p>

                                </div>
                                
                            </div>
                            
                        </div>

                    </div>

                </div>

                <div class="flex items-center bg-gray-200 rounded-3xl border-t m-2 p-1">

                    <div class="flex items-center space-x-2 ml-4">

                        <!-- image icon -->
                        <label for="image" class="cursor-pointer">

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="blue" class="w-5 h-5">

                                <path

                                    fill-rule="evenodd"

                                    d="M1 5.25A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.25A2.25 2.25 0 0 1 1 14.75v-9.5Zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-2.69l-2.22-2.219a.75.75 0 0 0-1.06 0l-1.91 1.909.47.47a.75.75 0 1 1-1.06 1.06L6.53 8.091a.75.75 0 0 0-1.06 0l-2.97 2.97ZM12 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
                                    
                                    clip-rule="evenodd"

                                />

                            </svg>

                            <input name="image" type="file" id="image" style="display: none;" @change="onFileChanged($event)" />

                        </label>

                        <!-- gif icon -->
                        <label>

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="blue" class="w-5 h-5">

                                <path

                                    fill-rule="evenodd"

                                    d="M1 5.25A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.25A2.25 2.25 0 0 1 1 14.75v-9.5Zm4.026 2.879C5.356 7.65 5.72 7.5 6 7.5s.643.15.974.629a.75.75 0 0 0 1.234-.854C7.66 6.484 6.873 6 6 6c-.873 0-1.66.484-2.208 1.275C3.25 8.059 3 9.048 3 10c0 .952.25 1.941.792 2.725C4.34 13.516 5.127 14 6 14c.873 0 1.66-.484 2.208-1.275a.75.75 0 0 0 .133-.427V10a.75.75 0 0 0-.75-.75H6.25a.75.75 0 0 0 0 1.5h.591v1.295c-.293.342-.6.455-.841.455-.279 0-.643-.15-.974-.629C4.69 11.386 4.5 10.711 4.5 10c0-.711.19-1.386.526-1.871ZM10.75 6a.75.75 0 0 1 .75.75v6.5a.75.75 0 0 1-1.5 0v-6.5a.75.75 0 0 1 .75-.75Zm3 0h2.5a.75.75 0 0 1 0 1.5H14.5v1.75h.75a.75.75 0 0 1 0 1.5h-.75v2.5a.75.75 0 0 1-1.5 0v-6.5a.75.75 0 0 1 .75-.75Z"
                                    
                                    clip-rule="evenodd"

                                />

                            </svg>

                        </label>

                        <!-- emoji icon -->
                        <label>

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="blue" class="w-5 h-5">

                                <path

                                    fill-rule="evenodd"
                                
                                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.536-4.464a.75.75 0 1 0-1.061-1.061 3.5 3.5 0 0 1-4.95 0 .75.75 0 0 0-1.06 1.06 5 5 0 0 0 7.07 0ZM9 8.5c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S7.448 7 8 7s1 .672 1 1.5Zm3 1.5c.552 0 1-.672 1-1.5S12.552 7 12 7s-1 .672-1 1.5.448 1.5 1 1.5Z"
                                    
                                    clip-rule="evenodd"

                                />
                                
                            </svg>

                        </label>

                    </div>

                    <div v-if="selectedFileUrl" class="flex justify-center mt-2">

                        <img :src="selectedFileUrl" alt="Image Preview" class="w-24 h-24 object-cover rounded" />

                    </div>

                    <textarea

                        v-model="newMessage"
                        
                        placeholder="Start a new message"
                        
                        class="w-full p-2 border bg-gray-200 rounded"
                    
                    ></textarea>

                    <button @click="sendMessage" class="bg-blue-500 text-white p-2 rounded mr-2">
                    
                        <!-- send icon -->
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                        
                        </svg>
            
                    </button>

                </div>

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

    import { useRoute, useRouter } from 'vue-router';

    import newMessageModal from '@/components/messages/NewMessageModal.vue'


    const conversations = ref({});

    const users = ref({});

    const user = ref({});

    const groups = ref([]);

    const selectedFile = ref(null);

    const selectedFileUrl = ref(null);

    const selectedMessages = ref(null);

    const newMessage = ref('');

    const userIdStore = useTweetIdStore();

    const receiverIdStore = useTweetIdStore();

    const showModal = ref(false);

    const selectedMessagesStore = useTweetIdStore();

    const groupMessage = ref([]);

    const route = useRoute();

    const router = useRouter();

    const redirectConversation = ref(null);


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

        selectedMessagesStore.setSelectedMessages(conversations.value.at(index ).conversation);

        receiverIdStore.setReceiverId(conversations.value.at(index).user.id);

        router.push(`${userIdStore.userId}-${receiverIdStore.receiverId}`)

        getUser();

        defaultConversation();

    };

    const getUser = async () => {

        try {

            const userId = route.params.receiver;

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

    const onFileChanged = (event) => {

        selectedFile.value = event.target.files[0];

        selectedFileUrl.value = URL.createObjectURL(selectedFile.value);

    };

    const sendMessage = async () => {

        const userId = userIdStore.userId;

        const receiverId = receiverIdStore.receiverId;

        try {

            const formData = new FormData();

            formData.append('body', newMessage.value);

            console.log(newMessage.value)

            if(selectedFile.value) {

                formData.append('image_path', selectedFile.value);

            }

            const response = await axios.post(

                `http://127.0.0.1:8000/api/messages/${userId}/${receiverId}`,formData,{

                    headers: { 

                        'Content-Type': 'multipart/form-data',
                    
                    }

                }

            );

            console.log(response)

            selectedMessages.value.push(response.data.data);

            newMessage.value = '';

            selectedFile.value = null;

            selectedFileUrl.value = null;

            defaultConversation();

        } catch (error) {

            console.error('Error sending message:', error);

        }

    };

    const getGroup = async() => {

        try {

            const userId = userIdStore.userId;

            const response = await axios.get(`http://127.0.0.1:8000/api/user/groups/${userId}`)

            // console.log(response.data.group);

            groups.value = response.data.group;

        } catch(error) {

            console.log(error);

        }

    };

    const getMessages = async(id) => {

        router.push(`/messages/${id}`);
        

    };

    const defaultConversation = async() => {

        try {


            const senderId = userIdStore.userId;

            const receiverId = route.params.receiver

            const response = await axios.get(`http://127.0.0.1:8000/api/singleConversation/${senderId}/${receiverId}`);

            redirectConversation.value = response.data.data
            
            getUser();

        } catch(error) {

            console.log(error);

        }

    }

    onMounted(() => {

        fetchMessages();

        getGroup();

        defaultConversation();

    });

</script>