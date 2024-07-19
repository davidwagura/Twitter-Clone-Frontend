<template>

    <div class="fixed inset-0 bg-gray-600 bg-opacity-70 flex items-center justify-center">

        <div class="bg-white p-6 rounded-lg shadow-lg h-5/6 max-h-fit max-w-md w-full relative">

            <div class="flex items-center pb-2 mb-4">

                <button @click="$emit('close')" class="text-gray-500 text-2xl">

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-6 h-5">

                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />

                    </svg>

                </button>

                <h1 class="text-xl ml-4 font-bold">Create a group</h1>

                <button class="bg-gray-700 text-white absolute right-2 border rounded-3xl p-1 w-16 font-semibold">Next</button>

            </div>
    
            <div class="block ml-12 -mt-6">

                <span class="text-sm">Add people</span>

            </div>
    
            <div class="mt-4 border-b">

                <input type="number" placeholder="Search people" name="wallet" class="mt-1 p-2 w-full border-none font-thin rounded-md" />

            </div>

            <!-- <div class="flex justify-center">

                <button class="bg-blue-500 text-white w-full px-4 py-2 rounded-md">Search</button>

            </div> -->

        </div>

    </div>

  </template>
  