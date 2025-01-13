<template>
  <div class="flex h-screen">
    <!-- Folder Structure -->
    <FolderStructure
      :folders="folders"
      :toggleFolder="toggleFolder"
      :selectFolder="selectFolder"
      @update:searchQuery="handleFolderSearchQuery"
    />
    
    <!-- Subfolders -->
    <Subfolders
      :selectedFolder="selectedFolder"
      @update:selectedFolder="handleFolderSelect"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import FolderStructure from './components/FolderStructure.vue';
import Subfolders from './components/Subfolders.vue';
import type {Folder} from './components/types';
import { useFolderApi } from '../../api/folderApi';

const { fetchFolders } = useFolderApi();

const folders = ref<Folder[]>([]); // Menyimpan folder yang diterima dari API
const selectedFolder = ref<Folder | null>(null); // Menyimpan folder yang sedang dipilih

// Ambil data folder dari API saat komponen di-mount
onMounted(async () => {
  const response = await fetchFolders();;
  folders.value = response
});


// Toggle ekspansi folder
function toggleFolder(folderId: number) {
  const folder = findFolder(folders.value, folderId);
  if (folder) {
    folder.expanded = !folder.expanded;
  }
}

// Pilih folder dan tampilkan isinya
function selectFolder(folderId: number) {
  const folder = findFolder(folders.value, folderId);
  if (folder) {
    selectedFolder.value = folder;
  }
}

// Helper function untuk mencari folder berdasarkan ID (untuk folder yang bertingkat)
function findFolder(folders: Folder[], folderId: number): Folder | undefined {
  for (const folder of folders) {
    if (folder.id === folderId) return folder;
    const found = findFolder(folder.children, folderId);
    if (found) return found;
  }
  return undefined;
}

// Handle perubahan folder yang dipilih
async function handleFolderSelect(folder: Folder) {

  const response = await fetchFolders();;
  folders.value = response
  selectedFolder.value = response;
}

async function handleFolderSearchQuery(query: string) {
  const response = await fetchFolders(query);
  folders.value = response;
}
</script>
