<template>

    <div class="fixed inset-0 bg-gray-600 bg-opacity-70 flex items-center justify-center">

        <div class="bg-white p-6 rounded-lg shadow-lg h-5/6 max-h-fit w-full max-w-xl relative">

            <div class="flex items-center pb-2 mb-4">

                <button @click="$emit('close')" class="text-gray-500 text-2xl">

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-6 h-5">

                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />

                    </svg>
                    
                </button>

                <h1 class="text-xl ml-4 font-bold">New message</h1>

                <button @click="createGroup" class="bg-gray-700 text-white absolute right-2 border rounded-3xl p-1 w-16 font-semibold">Next</button>

            </div>

            <div class="block ml-12 -mt-6">

                <span class="text-sm">Add people</span>

            </div>

            <div class="mt-4 border-b">

                <input type="text" v-model="searchQuery" @input="getUsers" placeholder="Search people" class="mt-1 p-2 w-full border-none font-thin rounded-md" />
            
                <div v-if="selectedUsers.length" class="mb-4">

                    <div class="flex flex-wrap mt-2">

                        <div v-for="user in selectedUsers" :key="user.id" class="flex items-center p-2 border-gray-200 border bg-white rounded-full mr-2 mb-2">

                            <img :src="getRandomImage()" alt="User avatar" class="w-6 h-6 rounded-full mr-2" />

                            <span>{{ user.first_name }} {{ user.last_name }}</span>

                            <button @click="removeUser(user)" class="ml-2 font-semibold text-blue-500 hover:text-gray-700">

                                &times;

                            </button>

                        </div>
                    
                    </div>

                </div>


            </div>

            <div class="mt-4">

                <div v-for="conversation in conversations" :key="conversation.user.id" class="mt-2 hover:bg-gray-100 p-4 cursor-pointer" @click="toggleUserSelection(conversation.user)">

                    <div class="flex items-center">

                        <img :src="getRandomImage()" alt="User avatar" class="w-10 h-10 rounded-full mr-4" />

                        <div>

                            <h3 class="text-lg font-normal">{{ conversation.user.first_name }} {{ conversation.user.last_name }}</h3>

                            <p class="text-gray-500">@{{ conversation.user.username }}</p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>

</template>
  
<script setup>

    import { ref, onMounted } from 'vue';

    import axios from 'axios';

    import { useTweetIdStore } from '@/stores/tweetId';
    
    const tweetIdStore = useTweetIdStore();
    
    const conversations = ref([]);

    const selectedUsers = ref([]);

    const searchQuery = ref('');

    const suggestions = ref([]);
    
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
    
    const getConversations = async () => {

        try {

            const userId = tweetIdStore.userId;

            const response = await axios.get(`http://127.0.0.1:8000/api/conversation/${userId}`);

            conversations.value = response.data.data;

        } catch (error) {

            console.log(error);

        }

    };
    
    const getUsers = async () => {

        try {

        const response = await axios.get(`http://127.0.0.1:8000/api/users?letter=${searchQuery.value}`);

            suggestions.value = response.data.users;

        } catch (error) {

            console.log(error);

        }

    };
    
    const toggleUserSelection = (user) => {

        const index = selectedUsers.value.findIndex(u => u.id === user.id);

        if (index > -1) {

            selectedUsers.value.splice(index, 1);

        } else {

            selectedUsers.value.push(user);

        }

    };
    
    const removeUser = (user) => {

        selectedUsers.value = selectedUsers.value.filter(u => u.id !== user.id);

    };
    
    const createGroup = async () => {

        try {

        const response = await axios.post('http://127.0.0.1:8000/api/groups', {

            name: 'New Group',

            creator_id: tweetIdStore.userId,

        });

        const groupId = response.data.group.id;

        await Promise.all(selectedUsers.value.map(user => axios.post(`http://127.0.0.1:8000/api/groups/${groupId}/members`, {

            user_id: user.id,

        })));

        alert('Group created successfully!');

        } catch (error) {

            console.log(error);

        }

    };
    
    const getRandomImage = () => {

        const randomIndex = Math.floor(Math.random() * images.length);

        return images[randomIndex];

    };
    
    onMounted(async () => {

        await getConversations();

    });
    
</script>
  