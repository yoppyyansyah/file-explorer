<template>
  <div class="w-1/3 border-r border-blue-300 overflow-y-auto bg-gray-50">
    <h2 class="text-lg font-bold p-4 bg-blue-100 text-gray-700">Folder Structure</h2>

    <!-- Pencarian -->
    <div class="p-4">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Search folders..." 
        class="w-full p-2 border border-gray-300 rounded-md"
        @input="handleSearch"
      />
    </div>

    <ul class="space-y-2">
      <FolderItem
        v-for="folder in props.folders"
        :key="folder.id"
        :folder="folder"
        :toggleFolder="toggleFolder"
        :selectFolder="selectFolder"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import FolderItem from '../components/FolderItem.vue'; 

const emit = defineEmits<{
  (event: 'update:searchQuery', query: string): void;
}>();

const props = defineProps<{
  folders: any[];
  toggleFolder: (id: number) => void;
  selectFolder: (id: number) => void;
}>();

const searchQuery = ref('');

console.log('searchQuery', searchQuery);

const handleSearch = async () => {
  emit('update:searchQuery', searchQuery.value); 
};

</script>
