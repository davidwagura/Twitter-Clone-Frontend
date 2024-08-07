<template>

    <div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">

        <div class="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4">

            <div class="flex justify-between items-center p-4">

                <button @click="closeModal" class="text-black text-2xl">&times;</button>

            </div>

            <div class="h-36 mb-12 p-4">

                <img :src="getRandomImage()" alt="Avatar" class="w-12 h-12 rounded-full" />

                <div class="ml-12 -mt-6">

                    <input type="text" placeholder="What is happening?!" v-model="body" class="w-full border-none mb-2 min-h-20 p-1" >

                    <div v-if="selectedFileUrl" class="flex justify-center mt-2">

                        <img :src="selectedFileUrl" alt="Image Preview" class="w-24 h-24 object-cover rounded" />

                    </div>

                </div>

                <div class="flex justify-center">

                    <!-- image icon --> 
                    <label for="image" class="ml-8 cursor-pointer">
                        
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="blue" class="size-5">
                            
                            <path fill-rule="evenodd" d="M1 5.25A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.25A2.25 2.25 0 0 1 1 14.75v-9.5Zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-2.69l-2.22-2.219a.75.75 0 0 0-1.06 0l-1.91 1.909.47.47a.75.75 0 1 1-1.06 1.06L6.53 8.091a.75.75 0 0 0-1.06 0l-2.97 2.97ZM12 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" clip-rule="evenodd" />

                        </svg>

                        <input name="image" type="file" id="image" style="display: none;" @change="onFileChanged($event)">
                    
                    </label>

                    <!-- gif icon -->
                    <label class="ml-8">
                        
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="blue" class="size-5">
                        
                            <path fill-rule="evenodd" d="M1 5.25A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.25A2.25 2.25 0 0 1 1 14.75v-9.5Zm4.026 2.879C5.356 7.65 5.72 7.5 6 7.5s.643.15.974.629a.75.75 0 0 0 1.234-.854C7.66 6.484 6.873 6 6 6c-.873 0-1.66.484-2.208 1.275C3.25 8.059 3 9.048 3 10c0 .952.25 1.941.792 2.725C4.34 13.516 5.127 14 6 14c.873 0 1.66-.484 2.208-1.275a.75.75 0 0 0 .133-.427V10a.75.75 0 0 0-.75-.75H6.25a.75.75 0 0 0 0 1.5h.591v1.295c-.293.342-.6.455-.841.455-.279 0-.643-.15-.974-.629C4.69 11.386 4.5 10.711 4.5 10c0-.711.19-1.386.526-1.871ZM10.75 6a.75.75 0 0 1 .75.75v6.5a.75.75 0 0 1-1.5 0v-6.5a.75.75 0 0 1 .75-.75Zm3 0h2.5a.75.75 0 0 1 0 1.5H14.5v1.75h.75a.75.75 0 0 1 0 1.5h-.75v2.5a.75.75 0 0 1-1.5 0v-6.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                        
                        </svg>
                
                    </label>

                    <!-- emoji icon -->
                    <label class="ml-8">
                        
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="blue" class="size-5">
                            
                            <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.536-4.464a.75.75 0 1 0-1.061-1.061 3.5 3.5 0 0 1-4.95 0 .75.75 0 0 0-1.06 1.06 5 5 0 0 0 7.07 0ZM9 8.5c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S7.448 7 8 7s1 .672 1 1.5Zm3 1.5c.552 0 1-.672 1-1.5S12.552 7 12 7s-1 .672-1 1.5.448 1.5 1 1.5Z" clip-rule="evenodd" />
                        
                        </svg>
                    
                    </label>


                </div>

                <div class="flex justify-end -mt-6">

                    <button @click="addTweet()" class="bg-blue-400 p-1 text-white font-bold  rounded-3xl">

                        <span class="p-4">Post</span>

                    </button>

                </div>


                <div class="-mt-6 text-green-500">{{ successMessage }}</div>

            </div>

        </div>

    </div>

</template> 


<script setup>

    import { ref, defineEmits } from 'vue';

    import { useTweetIdStore } from '@/stores/tweetId';

    import axios from 'axios';
    
    const emit = defineEmits(['close']);
    
    const userIdStore =  useTweetIdStore();
    
    const body = ref('');

    const selectedFile = ref(null);

    const selectedFileUrl = ref(null);

    const successMessage = ref('');
    
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
    
    const closeModal = () => {

        emit('close');

    };
    
    const getRandomImage = () => {

        const randomIndex = Math.floor(Math.random() * images.length);

        return images[randomIndex];

    };
    
    const onFileChanged = (event) => {

        selectedFile.value = event.target.files[0];

        selectedFileUrl.value = URL.createObjectURL(selectedFile.value);

        console.log('Selected file:', selectedFile.value);

    };


    const addTweet = async () => {

        if(body.value || selectedFile.value) {

            const userId = userIdStore.userId;

            try {

                const formData = new FormData();

                formData.append('body', body.value);

                formData.append('user_id', userId);

                if (selectedFile.value) {

                    formData.append('image_path', selectedFile.value);

                }

                // Log form data
                for (let [key, value] of formData.entries()) {
                    
                    console.log(`${key}: ${value}`);

                }

                const response = await axios.post('http://127.0.0.1:8000/api/tweet', formData, {

                    headers: {

                        'Content-Type': 'multipart/form-data',

                    },

                    onUploadProgress: (progressEvent) => {

                        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);

                        console.log(`Upload Progress: ${progress}%`);

                    },

                });

                successMessage.value = response ? 'Tweet created successfully!' : 'Error creating tweet';

                body.value = '';

                selectedFile.value = null;

                selectedFileUrl.value = null;

                setTimeout(() => {
                    
                    successMessage.value = '';

                    emit('close');

                }, 2000);

            } catch (error) {

                console.error('Error creating tweet:', error);

                if (error.response) {

                    console.error('Error response data:', error.response.data);

                }

                successMessage.value = 'Failed to create tweet. Try again';

            }

        }

    }

</script>
  