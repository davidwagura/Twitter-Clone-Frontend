<template>

  <div class="fixed inset-0 bg-gray-600 bg-opacity-70 flex items-center justify-center">

      <div class="bg-white p-6 rounded-lg shadow-lg h-4/6 max-w-md w-full relative">

          <button @click="$emit('close')" class="absolute top-2 right-2 text-gray-500 text-2xl">

              &times;

          </button>

          <h1 class="text-xl font-bold mb-4 flex">New Message</h1>

          <div class="mt-4 border-b">

              <input type="number" placeholder="Search people" name="wallet" class="mt-1 p-2 w-full border-none  rounded-md" />

          </div>

          <div class="flex justify-center mt-20">

              <button class="bg-blue-700 text-white w-full px-4 py-2 rounded-xl font-thin">Search people</button>

          </div>

      </div>

  </div>

</template>

