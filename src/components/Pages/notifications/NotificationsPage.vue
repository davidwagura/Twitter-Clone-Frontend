<template>

    <div class="flow-root">

        <nav-page />

        <div class="flex bg-opacity-5 h-fit">

            <div class="ml-48 w-5/12 float-left border min-h-screen h-fit fixed">

                <h1 class="p-3 mb-4 font-sans font-bold">Notifications</h1>

                <div class="h-12 flex justify-between items-center relative px-4">

                    <button

                        @click="setActiveSection('notifications')"

                        :class="[

                            'flex-1 text-center py-2.5 font-semibold',

                            activeSection === 'notifications' ? 'border-b-4 border-blue-500 text-black' : 'text-gray-500 hover:bg-gray-100'

                        ]"

                    >
        
                        All

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
  
                <div class="component overflow-y-scroll h-screen">

                    <component :is="currentSectionComponent"></component>

                </div>

            </div>
  
        </div>
        
        <div class="w-4.5/12 min-h-screen mr-16 mt-10 mb-8 ml-4 rounded-xl float-right">

            <!-- <trends-page-vue></trends-page-vue> -->

        </div>

    </div>

</template>  

<script setup>
    import { ref, computed } from 'vue';

    import NavPage from '@/components/Navigation Page/NavPage.vue';

    import MentionsPage from './MentionsPage.vue';

    import AllNotificationsPage from './AllNotificationsPage.vue';

    import VerifiedPage from './VerifiedPage.vue';

    // import TrendsPageVue from '@/components/Pages/trends/TrendsPage.vue';

    const activeSection = ref('notifications');

    const currentSectionComponent = computed(() => {

        return activeSection.value === 'notifications' ? AllNotificationsPage : (activeSection.value === 'mentions' ? MentionsPage : (activeSection.value === 'verified' ? VerifiedPage : 'defaultPage'));

    });

    function setActiveSection(section) {

        activeSection.value = section;

    }


</script>