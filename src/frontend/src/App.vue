<template>
  <div>
    <nav class="p-4 bg-gray-800 text-white">
      <router-link to="/" class="mr-4">Home</router-link>
      <router-link to="/folder">Folder View</router-link>
    </nav>
    <router-view />
  </div>
</template>