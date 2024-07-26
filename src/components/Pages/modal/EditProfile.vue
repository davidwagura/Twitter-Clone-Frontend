<template>
  
  <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
    
    <div class="bg-white rounded-lg shadow-lg w-full max-w-xl h-[90vh] overflow-auto p-6">
      
      <div class="flex justify-between">
        
        <h3 class="text-xl font-semibold">Edit Profile</h3>
      
        <button @click="closeModal" class="text-gray-600 hover:text-gray-900">
         
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
           
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
         
          </svg>
        
        </button>
     
      </div>

      <form @submit.prevent="updateProfile()">
        
        <div class="space-y-2">
          <!-- Background Image -->
          
          <div>
           
            <div class="relative">
         
              <div class="w-full h-36 bg-gray-200 rounded-md border border-gray-300 flex items-center justify-center text-gray-500">
               
                <img :src="backgroundImagePreview" v-if="backgroundImagePreview" class="w-full h-32 object-cover rounded-md border border-gray-300">
                
                <label v-if="!backgroundImagePreview" for="backgroundImageUpload" class="cursor-pointer">
                 
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                 
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                  
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                 
                  </svg>
                
                </label>
               
                <input id="backgroundImageUpload" type="file" class="hidden" @change="handleBackgroundImageChange($event)">
              
              </div>
           
            </div>
        
          </div>

          <!-- Profile Image -->
          <div>
        
            <div class="w-24 h-24 bg-gray-200 ml-6 rounded-full border border-gray-300 flex text-gray-500">
         
              <img :src="profileImagePreview" v-if="profileImagePreview" class="w-24 h-24 object-cover rounded-full border border-gray-300 mx-auto">
         
              <label v-if="!profileImagePreview" for="profileImageUpload" class="flex items-center mx-auto justify-center cursor-pointer">
            
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
            
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
             
                </svg>
             
              </label>
            
              <input id="profileImageUpload" type="file" class="hidden" @change="handleProfileImageChange">
         
            </div>
         
          </div>

          <div>
        
            <input type="text" id="name" placeholder="Name" v-model="profile.name" class="mt-1 w-full h-16 p-2 border border-gray-300 rounded-md">
          
          </div>

          <div>
          
            <textarea id="bio" placeholder="Bio" v-model="profile.bio" class="mt-1 h-28 w-full p-2 border border-gray-300 rounded-md"></textarea>
          
          </div>

          <div>
          
            <input type="text" id="location" placeholder="Location" v-model="profile.location" class="mt-1 w-full h-16 p-2 border border-gray-300 rounded-md">
         
          </div>

          <div>
        
            <input type="text" id="website" placeholder="Website" v-model="profile.website" class="mt-1 w-full p-2 h-16 border focus:border-[#5782cd] border-gray-300 rounded-md">
         
          </div>

          <div class="text-gray-500">
         
            <h2>Birth date 
          
              <span>.</span>
       
              <a href="#">Edit</a>
       
            </h2>
         
          </div>

          <div class="flex justify-end mt-4">
        
            <button type="submit" class="text-white p-1 w-16 bg-black rounded-2xl">Save</button>
       
          </div>
        
        </div>
     
      </form>
    
    </div>

  </div>

</template>

<script setup>

  import { ref, defineProps, defineEmits, onMounted } from 'vue';

  import { useTweetIdStore } from '@/stores/tweetId';

  import axios from 'axios';

  const userIdStore = useTweetIdStore();

  const props = defineProps({

    showModal: {

      type: Boolean,

      required: true

    }

  });

  console.log(props)

  const emit = defineEmits(['close', 'update']);

  const profile = ref({

    name: '',

    bio: '',

    location: '',
    
    website: '',

  });


  const backgroundImage = ref(null);

  const profileImage = ref(null);

  const backgroundImagePreview = ref(null);

  const profileImagePreview = ref(null);

  const closeModal = () => {

    emit('close');
    
  };

  const handleBackgroundImageChange = (event) => {

    const file = event.target.files[0];

    if (file) {

      backgroundImage.value = file;

      backgroundImagePreview.value = URL.createObjectURL(file);

    }

  };

  const handleProfileImageChange = (event) => {

    const file = event.target.files[0];

    if (file) {

      profileImage.value = file;

      profileImagePreview.value = URL.createObjectURL(file);

      console.log( profileImage.value);

    }

  };


  const updateProfile = async () => {

    try {

      const formData = new FormData();

      formData.append('name', profile.value.name);
      
      formData.append('bio', profile.value.bio);

      formData.append('location', profile.value.location);

      formData.append('website', profile.value.website);

      if (backgroundImage.value) {

        formData.append('background_img', backgroundImage.value);

      }

      if (profileImage.value) {

        formData.append('profile_img', profileImage.value);

      }


      for (let [key, value] of formData.entries()) {
                
        console.log(`${key}: ${value}`);

      }


      const userId = userIdStore.userId;

      const response = await axios.put(`http://127.0.0.1:8000/api/update/${userId}`, formData, {

        headers: {

          'Content-Type': 'multipart/form-data'

        },
        
        onUploadProgress: (progressEvent) => {

          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);

          console.log(`Upload Progress: ${progress}%`);

        },


      });

      backgroundImage.value = null;

      profileImage.value = null;

      // profile.value = '';


      console.log(response)

      emit('update', response.data);

      closeModal();

    } catch (error) {

      console.error('There was an error updating the profile!', error);

    }

  };


  onMounted(async () => {

    const userId = userIdStore.userId;

    try {

      const response = await axios.get(`http://127.0.0.1:8000/api/getProfile/${userId}`);

      const profileData = response.data.data[0]; 

      backgroundImagePreview.value = profileData.background_image_url || '';

      profileImagePreview.value = profileData.profile_image_url || '';

      profile.value.name = profileData.name;

      profile.value.location = profileData.location;

      profile.value.website = profileData.website;

      profile.value.bio = profileData.bio;   
  
    } catch (error) {

      console.error('There was an error fetching the profile data!', error);

    }

  });
  
</script>
