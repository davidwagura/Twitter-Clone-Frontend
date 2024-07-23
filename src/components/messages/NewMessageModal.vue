<template>

    <div class="fixed inset-0 bg-gray-600 bg-opacity-70 flex items-center justify-center">

        <div class="bg-white p-6 rounded-lg shadow-lg h-5/6 max-h-fit w-full max-w-xl relative">

            <div class="flex mb-4">

                <button @click="$emit('close')" class="mr-4 solute text-gray-500 text-2xl">&times;</button>

                <h1 class="text-xl font-bold flex">New Message</h1>

                <router-link

                    @click="newMessage"

                    v-for="user in selectedUsers"

                    :key="user.id"

                    :to="`/messages/${user.id}`"

                    class="bg-gray-700 text-white absolute right-2 border rounded-3xl p-1 ml-2 w-16 font-semibold"

                >

                    Next

                </router-link>

            </div>

            <div class="mt-4 border-b">

                <input

                    v-model="searchQuery"

                    type="text"

                    placeholder="Search people"

                    class="mt-1 p-2 w-full border-none rounded-md"

                />

            </div>

            <div v-if="selectedUsers.length" class="mb-4">

                <div class="flex flex-wrap mt-2">

                    <div

                        v-for="user in selectedUsers"

                        :key="user.id"

                        class="flex items-center p-2 border-gray-200 border bg-white rounded-full mr-2 mb-2"

                    >
                        <img :src="getRandomImage()" alt="User avatar" class="w-6 h-6 rounded-full mr-2" />

                        <span>{{ user.first_name }} {{ user.last_name }}</span>

                        <button @click="removeUser(user)" class="ml-2 font-semibold text-blue-500 hover:text-gray-700">

                            &times;

                        </button>

                    </div>

                </div>

            </div>

            <div @click="showModal = true" class="mt-2 hover:bg-gray-100 border-b p-4 text-blue-500 flex">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 mr-4 border rounded-full">

                    <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"/>
                
                </svg>

                <h2>Create a group</h2>

            </div>

            <div

                v-for="user in filteredUsers"

                :key="user.id"

                class="mt-2 hover:bg-gray-100 p-4 cursor-pointer"

                @click="toggleUserSelection(user)"

            >
                <div class="flex items-center">

                    <div class="mr-4">

                        <img :src="getRandomImage() || 'default-avatar.png'" alt="User avatar" class="w-10 h-10 rounded-full"/>

                    </div>

                    <div>

                        <h3 class="text-lg font-normal">{{ user.first_name }} {{ user.last_name }}</h3>

                        <p class="text-gray-500">@{{ user.username }}</p>

                    </div>

                </div>

            </div>

            <create-group-page v-if="showModal" @close="closeModal" />

        </div>

    </div>

</template>

<script setup>

    import { ref, onMounted, computed } from 'vue';

    import CreateGroupPage from '@/components/messages/CreateGroupPage.vue';

    import axios from 'axios';

    import { useTweetIdStore } from '@/stores/tweetId';
    

    const showModal = ref(false);

    const tweetIdStore = useTweetIdStore();

    const conversations = ref([]);

    const selectedUsers = ref([]);

    const allUsers = ref([]);

    const searchQuery = ref('');


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

    const getAllUsers = async () => {

        try {

            const response = await axios.get(`http://127.0.0.1:8000/api/users`);

            allUsers.value = response.data.users;

        } catch (error) {

            console.log(error);

        }

    };

    const getConversations = async () => {

        try {

            const userId = tweetIdStore.userId;

            const response = await axios.get(`http://127.0.0.1:8000/api/conversation/${userId}`);

            conversations.value = response.data.data;

        } catch (error) {

            console.log(error);

        }

    };

    const toggleUserSelection = (user) => {

        const index = selectedUsers.value.findIndex((u) => u.id === user.id);

        if (index > -1) {

            selectedUsers.value.splice(index, 1);

        } else {

            selectedUsers.value.push(user);

        }

    };

    const newMessage = async () => {

        showModal.value = true;

    };

    const removeUser = (user) => {

        selectedUsers.value = selectedUsers.value.filter((u) => u.id !== user.id);

    };

    const getRandomImage = () => {

        const randomIndex = Math.floor(Math.random() * images.length);

        return images[randomIndex];

    };

    const filteredUsers = computed(() => {

        const query = searchQuery.value.toLowerCase();

        return allUsers.value.filter(

            (user) =>

                user.first_name.toLowerCase().startsWith(query) ||

                user.last_name.toLowerCase().startsWith(query)

        );

    });

    onMounted(async () => {

        await getConversations();

        await getAllUsers();

    });

</script>
