<template>
  <li>
    <div class="flex items-center justify-between">
      <div class="w-full pl-4 flex items-center">
        <!-- Tombol untuk expand/collapse -->
        <button 
          @click="toggleFolder(folder.id)"
          class="text-gray-700 hover:text-blue-500"
        >
          <span v-if="folder.expanded">-</span>
          <span v-else>+</span>
        </button>
        <!-- Nama Folder -->
        <button 
          @click="selectFolder(folder.id)" 
          class="text-left p-2 hover:bg-gray-200 focus:bg-gray-300 transition-all duration-200"
        >
          {{ folder.name }}
        </button>
      </div>
    </div>

    <!-- Subfolder hanya ditampilkan jika folder di-expand -->
    <ul v-if="folder.expanded && folder.children.length" class="ml-4 space-y-2">
      <li v-for="subfolder in folder.children" :key="subfolder.id">
        <FolderItem
          :folder="subfolder"
          :selectFolder="selectFolder"
          :toggleFolder="toggleFolder"
        />
      </li>
    </ul>
  </li>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type {Folder } from './types';

const props = defineProps<{
  folder: Folder;
  selectFolder: (id: number) => void;
  toggleFolder: (id: number) => void;
}>();
</script>
