<template>

    <div class="fixed inset-0 bg-gray-600 bg-opacity-70 flex items-center justify-center">

        <div class="bg-white p-6 rounded-lg shadow-lg h-5/6 max-h-fit w-full max-w-xl relative">

            <div class="flex mb-4">

                <button @click="$emit('close')" class="mr-4 solute text-gray-500 text-2xl">&times;</button>

                <h1 class="text-xl font-bold flex">New Message</h1>

                <button @click="nextStep()" class="bg-gray-700 text-white absolute right-2 border rounded-3xl w-16 p-1 pl-3 font-semibold">

                    Next

                </button>

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

            <div

                v-for="user in filteredUsers"

                :key="user.id"

                class="mt-2 hover:bg-gray-100 p-4 cursor-pointer"

                @click="toggleUserSelection(user)"

            >

                <div class="flex items-center">

                    <div class="mr-4">

                        <img :src="getRandomImage()" alt="User avatar" class="w-10 h-10 rounded-full" />

                    </div>

                    <div>

                        <h3 class="text-lg font-normal">{{ user.first_name }} {{ user.last_name }}</h3>

                        <p class="text-gray-500">@{{ user.username }}</p>

                    </div>

                </div>

            </div>

        </div>

    </div>

</template>

<script setup>

    import { ref, onMounted, computed, defineEmits } from 'vue';

    import axios from 'axios';

    import { useTweetIdStore } from '@/stores/tweetId';

    import { useRouter } from 'vue-router';


    const userIdStore = useTweetIdStore();

    const conversations = ref([]);

    const selectedUsers = ref([]);

    const allUsers = ref([]);

    const searchQuery = ref('');

    const router = useRouter();

    const emit = defineEmits(['close']);


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

            const userId = userIdStore.userId;

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

                user.first_name.toLowerCase().includes(query) ||

                user.last_name.toLowerCase().includes(query) ||

                user.username.toLowerCase().includes(query)

        );

    });

    const nextStep = async () => {

        if (selectedUsers.value.length > 1) {

            await createGroup();

        } else if (selectedUsers.value.length === 1) {

            await newConversation(selectedUsers.value[0].id);

        }

        const receiverId = selectedUsers.value[0].id;

        router.push(`/messages/${userIdStore.userId}-${receiverId}`);

        emit('close');

    };

    const createGroup = async () => {

        try {

            const response = await axios.post('http://127.0.0.1:8000/api/groups', {

                creator_id: userIdStore.userId,

            });

            const groupId = response.data.group.id;

            await Promise.all(

                selectedUsers.value.map((user) =>

                    axios.post(`http://127.0.0.1:8000/api/groups/${groupId}/members`, {

                        user_id: user.id,

                    })

                )

            );

            alert('Group created successfully!');

            //add id to url
            router.push(`/message/${groupId}`);

        } catch (error) {

            console.log(error);

        }

    };

    const newConversation = async (id) => {

        try {

            const senderId = userIdStore.userId;

            const receiverId = id;

            const response = await axios.post(`http://127.0.0.1:8000/api/messages/${senderId}/${receiverId}`);

            console.log(response.data);

            router.push(`/messages/${receiverId}`);

        } catch (error) {

            console.log(error);

        }

    };

    onMounted(async () => {

        await getConversations();

        await getAllUsers();

    });

</script>
