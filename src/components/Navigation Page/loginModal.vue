<template>

    <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center z-50 ">

      <div class="fixed inset-0 bg-black opacity-50" @click="$emit('close')"></div>
  
      <div class="bg-white shadow-lg rounded-lg border w-full max-w-sm p-12 relative">

        <button class="absolute top-3 right-3 text-gray-500 hover:text-gray-700" @click="$emit('close')">

          &times;

        </button>

        <div class="mb-3">

          <img class="h-8 m-3 flex justify-center items-center mx-auto" alt="Icon" src="../../assets/icon.svg">

        </div>
  
        <h2 class="text-2xl font-bold mb-6">Sign in to X</h2>
  
        <button class="w-full border p-4 text-gray-600 font-bold py-2 px-4 rounded-3xl mb-4 flex items-center justify-center">

          
            <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M23.94 12.26c0-.96-.08-1.89-.24-2.8H12v5.34h6.58c-2.98 2.77-7.01 4.64-11.58 4.64-7.59 0-13.75-6.16-13.75-13.75s6.16-13.75 13.75-13.75c8.18 0 14.82 6.63 14.82 14.82z" fill="#4285F4"/><path d="M12 2.11C6.48 2.11 1.84 6.78 1.84 12.35c0 2.66.69 5.2 1.89 7.43l-6.72 6.72C-1.72 23.53 0 25.8 2.52 27.3l6.58-6.58c-1.91-3.54-3.01-7.69-3.01-12.29C6.37 8.29 9.9 4.33 14.56 1.55l-1.48 2.37C11.72 6.35 9.5 8.82 8.4 11.92L12 2.11z" fill="#34A853"/><path d="M23.94 12.26c0-.96-.08-1.89-.24-2.8H12v5.34h6.58c-2.98 2.77-7.01 4.64-11.58 4.64-7.59 0-13.75-6.16-13.75-13.75s6.16-13.75 13.75-13.75c8.18 0 14.82 6.63 14.82 14.82z" fill="#FBB040"/></svg>
          
            Sign in with Google

        </button>
  
        <button class="w-full border text-[#000000] font-bold py-2 px-4 rounded-3xl mb-4 flex items-center justify-center">
        
            <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M18.686 17.657c0 1.519-.458 3.008-1.325 4.275-1.265 1.912-3.235 2.989-5.935 2.989-2.41 0-4.471-1.167-5.686-3.016-1.026-1.58-1.56-3.498-1.56-5.822 0-1.451.288-2.964.821-4.284 1.35-2.794 3.886-4.443 6.687-4.443 1.264 0 2.473.462 3.446 1.237.526.379.952.855 1.295 1.384.27.346.606.679.922.967.556.48 1.32.84 2.065.84.126 0 .246-.017.368-.053.491-.155.82-.612.82-1.099v-2.067c0-.773-.597-1.395-1.333-1.395-.557 0-1.094.223-1.507.616-.596.607-1.351.876-2.148.876-.704 0-1.435-.315-1.914-.722-.333-.2-.665-.443-.953-.723-.88-.716-1.767-1.398-2.613-2.045-.313-.23-.593-.475-.85-.752-.292-.292-.523-.644-.681-1.027-.156-.384-.237-.798-.237-1.236 0-1.389.528-2.579 1.324-3.47.935-1.039 2.09-1.698 3.495-1.698 1.433 0 2.655.747 3.528 1.786.464.513.834 1.151 1.051 1.837.128.4.237.776.237 1.182v2.843c0 .727-.294 1.408-.816 1.911-.964.736-2.075 1.15-3.223 1.15-1.12 0-2.229-.367-3.149-1.021-.726-.486-1.344-1.071-1.944-1.648-.42-.367-.818-.757-1.188-1.167.046.081.098.15.15.232.557.741 1.039 1.57 1.485 2.422.356.74.676 1.493.939 2.283.303.826.597 1.686.747 2.575.061.279.119.576.119.872z"/></svg>
          
            Sign in with Apple

        </button>

        <hr> 
  
        <div class="mb-4 mt-4">

          <input class="border rounded-lg p-2 h-12 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-1 focus:ring-blue-400" v-model="data.email" type="text" placeholder="Phone, email, or username" required>
        
        </div>
  
        <div class="flex items-center justify-center mb-4 focus:">

          <button class="bg-[#000000] w-full  text-white font-bold py-2 px-4 rounded-3xl" type="submit">
            
            Next

          </button>

        </div>
  
        <div class="text-center border w-full rounded-3xl p-2">

          <a href="#" class="text-[#000000] font-bold text-sm">Forgot password?</a>

        </div>

      </div>

    </div>

</template>
  
<script setup>

    import { ref } from 'vue';

    import axios from 'axios';

    import { useTweetIdStore } from '@/stores/tweetId.js';

    import { useRouter } from 'vue-router';

    
    const data = ref({

        email: '',

        password: ''
        
    });
    
    const successMessage = ref('');

    const isModalOpen = ref(true);
    
    const userIdStore = useTweetIdStore();

    const tokenStore = useTweetIdStore();

    const router = useRouter();
    
    const loginForm = () => {

        axios.post('http://127.0.0.1:8000/api/login', data.value)

        .then(response => {

          console.log(response);

          userIdStore.setUserId(response.data.user.id);

          tokenStore.setToken(response.data.token);

          successMessage.value = 'You have been successfully logged in!';

          successMessage.value = '';

          router.push('');

        })

        .catch(error => {

            console.error('Error logging in user:', error);

            successMessage.value = 'Failed to login. Try again.';

        });

    };

    loginForm()

  </script>
  
