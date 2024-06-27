<template>

    <div>

        <nav-page />

        <div class="flex">

            <div class="ml-48 w-8/12 border min-h-screen h-fit">

                <h1 class="p-3 mb-4 font-sans font-bold">Notifications</h1>

                <div class="h-12 flex justify-between items-center relative px-4">

                    <button

                        @click="setActiveSection('notifications')"

                        :class="[

                            'flex-1 text-center py-2.5 font-semibold',

                            activeSection === 'notifications' ? 'border-b-4 border-blue-500 text-black' : 'text-gray-500 hover:bg-gray-100'

                        ]"

                    >
        
                        All Notifications

                    </button>

                    <button

                        @click="setActiveSection('verified')"

                        :class="[

                            'flex-1 text-center py-2.5 font-semibold',

                            activeSection === 'verified' ? 'border-b-4 border-blue-500 text-black' : 'text-gray-500 hover:bg-gray-100'

                        ]"

                    >
        
                        Verified

                    </button>



                    <button

                        @click="setActiveSection('mentions')"

                        :class="[

                            'flex-1 text-center py-2.5 font-semibold',

                            activeSection === 'mentions' ? 'border-b-4 border-blue-500 text-black' : 'text-gray-500 hover:bg-gray-100'

                        ]"

                    >

                        Mentions
    
                    </button>

                </div>
  
                <div class="component">

                    <component :is="currentSectionComponent"></component>

                </div>

            </div>
  
            <div class="w-6/12 ml-6">

                <trends-page-vue></trends-page-vue>

            </div>

        </div>

    </div>

</template>  

<script setup>
    import { ref, computed } from 'vue';

    // import axios from 'axios';

    import NavPage from '@/components/Navigation Page/NavPage.vue';

    import MentionsPage from './MentionsPage.vue';

    import AllNotificationsPage from './AllNotificationsPage.vue';

    import VerifiedPage from './VerifiedPage.vue';

    import TrendsPageVue from '@/components/Pages/trends/TrendsPage.vue';

    // import { useTweetIdStore } from '@/stores/tweetId';
    
    // const userIdStore =  useTweetIdStore();

    // const images = [

    //     require('../../../assets/images/1.jpeg'),
    //     require('../../../assets/images/2.jpeg'),
    //     require('../../../assets/images/3.jpeg'),
    //     require('../../../assets/images/4.jpeg'),
    //     require('../../../assets/images/5.jpeg'),
    //     require('../../../assets/images/6.jpeg'),
    //     require('../../../assets/images/7.jpeg'),
    //     require('../../../assets/images/8.jpeg'),
    //     require('../../../assets/images/9.jpeg'),
    //     require('../../../assets/images/10.jpeg'),
    // ];

    const activeSection = ref('notifications');

    // const userId = userIdStore.userId;

    const currentSectionComponent = computed(() => {

        return activeSection.value === 'notifications' ? AllNotificationsPage : (activeSection.value === 'mentions' ? MentionsPage : (activeSection.value === 'verified' ? VerifiedPage : 'defaultPage'));

    });

    function setActiveSection(section) {

        activeSection.value = section;

    }

    // function getRandomImage() {

    //     const randomIndex = Math.floor(Math.random() * images.length);

    //     return images[randomIndex];

    // }

</script>