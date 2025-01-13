<template>
  <div class="w-2/3 p-4 overflow-y-auto">
    <h2 class="text-lg font-bold mb-4">Subfolders</h2>
    
    <!-- Tombol untuk menambah folder -->
    <div class="mb-4">
      <button
        @click="showAddFolderModal = true; showEditFolderModal = false"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Add Folder
      </button>
    </div>

    <!-- Form untuk tambah folder -->
    <div v-if="showAddFolderModal" class="modal">
      <div class="modal-content mb-4">
        <h3>Add New Folder</h3>
        <input v-model="newFolderName" type="text" placeholder="Folder Name" class="p-2 border border-gray-300 rounded-md" />
        <button @click="addFolder" class="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md">Add</button>
        <button @click="showAddFolderModal = false" class="px-4 py-2 ml-2 bg-gray-300 text-black rounded-md">Cancel</button>
      </div>
    </div>

    <!-- Modal untuk Edit Folder -->
    <div v-if="showEditFolderModal" class="modal">
      <div class="modal-content mb-4">
        <h3>Edit Folder</h3>
        <input v-model="editFolderName" type="text" placeholder="Folder Name" class="p-2 border border-gray-300 rounded-md" />
        <button @click="saveEditFolder" class="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md">Save</button>
        <button @click="showEditFolderModal = false;" class="px-4 py-2 ml-2 bg-gray-300 text-black rounded-md">Cancel</button>
      </div>
    </div>

    <!-- Daftar Subfolder -->
    <div v-if="selectedFolder">
      <table class="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-100">
            <th class="p-2 text-left">Type</th>
            <th class="p-2 text-left">Name</th>
            <th class="p-2 text-left">Updated At</th>
            <th class="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in allItems" :key="item.id" class="border-b">
            <td class="p-2 text-center">
              <span>&#128193;</span> <!-- Folder Icon -->
            </td>
            <td class="p-2">
              <button
                v-if="isFolder(item)"
                @click="handleFolderClick(item)"
                class="hover:underline text-blue-600"
              >
                {{ item.name }}
              </button>
            </td>
            <td class="p-2 text-sm text-gray-500">{{ item.updatedAt }}</td>
            <td class="p-2">
              <!-- Tombol Edit dan Delete -->
              <button v-if="isFolder(item)" @click="editFolder(item)" class="text-yellow-600 hover:text-yellow-700">Edit</button>
              <button v-if="isFolder(item)" @click="deleteFolder(item)" class="text-red-600 hover:text-red-700 ml-2">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p class="text-gray-500">Select a folder to view its contents.</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, computed, defineEmits, ref } from 'vue';
import type { Folder } from './types';
import { useFolderApi } from '../../../api/folderApi';
const { addFolderApi, updateFolderApi, deleteFolderApi } = useFolderApi();

const props = defineProps<{
  selectedFolder: Folder | null;
}>();

const emit = defineEmits<{
  (event: 'update:selectedFolder', folder: Folder): void;
}>();

const showAddFolderModal = ref(false);
const showEditFolderModal = ref(false);
const newFolderName = ref('');
const editFolderName = ref('');
let editData = {
  name: '',
  parentId: 0,
  id: 0,
};

const allItems = computed(() => {
  const items: (Folder)[] = [];
  if (props.selectedFolder) {
    props.selectedFolder.children?.forEach(subfolder => {
      items.push({ ...subfolder, updatedAt: subfolder.updatedAt });
    });
  }
  return items;
});

function isFolder(item: Folder): item is Folder {
  return (item as Folder).children !== undefined;
}

// Fungsi untuk menambah folder
async function addFolder() {
  if (!newFolderName.value || !props.selectedFolder) return;

  const parentId = Number(props.selectedFolder.id);
  const response = await addFolderApi({ name: newFolderName.value, parentId });

  if (response) {
    showAddFolderModal.value = false;
    newFolderName.value = ''; // Clear input
    emit('update:selectedFolder', props.selectedFolder); 
  }
}

// Fungsi untuk menavigasi ke dalam folder
function handleFolderClick(folder: Folder) {
  if (isFolder(folder)) {
    emit('update:selectedFolder', folder);
  }
}

// Fungsi untuk edit folder
async function editFolder(folder: Folder) {
  if (!folder) return;
  editFolderName.value = folder.name;
  showAddFolderModal.value = false;
  editData = { name: folder.name, parentId: folder.parentId || 0, id: folder.id };
  showEditFolderModal.value = true;
}

// Fungsi untuk menyimpan perubahan folder
async function saveEditFolder() {
  if (!editFolderName.value || !props.selectedFolder) return;

  const updatedFolder = { name: editFolderName.value, parentId: editData.parentId};
  const response = await updateFolderApi(updatedFolder, editData.id);

  if (response) {
    props.selectedFolder.name = editFolderName.value; 
    showEditFolderModal.value = false; 
    editFolderName.value = ''; 
    emit('update:selectedFolder', props.selectedFolder); 
  }
  editData = { name: '', parentId: 0, id: 0 };
}

// Fungsi untuk menghapus folder
async function deleteFolder(folder: Folder) {
  if (!props.selectedFolder) return;

  const confirmDelete = confirm(`Are you sure you want to delete the folder "${folder.name}"?`);
  if (!confirmDelete) return;

  const response = await deleteFolderApi(folder.id);

  if (response) {
    const index = props.selectedFolder.children?.findIndex((f) => f.id === folder.id);
    if (index !== undefined && index >= 0) {
      props.selectedFolder.children?.splice(index, 1);
    }
  }
}
</script>
