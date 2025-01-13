export function useFolderApi() {
  async function fetchFolders(name?: string) {
    const query = name ? `?name=${encodeURIComponent(name)}` : '';
    const response = await fetch(`http://localhost:3000/v1/folders${query}`);
    const data = await response.json();
    return data?.data || [];
  }

  async function addFolderApi(newFolder: { name: string, parentId: number }) {
    const response = await fetch('http://localhost:3000/v1/folders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newFolder),
    });

    return response.json();
  }

  async function updateFolderApi(updatedFolder: { name: string, parentId: number }, id: number) {
    const response = await fetch(`http://localhost:3000/v1/folders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedFolder),
    });

    return response.json();
  }

  async function deleteFolderApi(id: number) {
    const response = await fetch(`http://localhost:3000/v1/folders/${id}`, {
      method: 'DELETE',
    });

    return response.json();
  }

  return { fetchFolders, addFolderApi,updateFolderApi, deleteFolderApi  }; // Kembalikan objek
}
