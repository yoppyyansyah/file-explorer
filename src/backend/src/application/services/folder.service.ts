import { FolderRepository } from '../ports/folder.repository';  
import { CreateFolderDto } from '../../domain/dtos/Folder/CreateFolderDto'; 
import { UpdateFolderDto } from '../../domain/dtos/Folder/UpdateFolderDto';
import { GetFolderDto } from '../../domain/dtos/Folder/GetFolderDto';

export class FolderService {
  private folderRepository: FolderRepository;

  constructor(folderRepository: FolderRepository) {
    this.folderRepository = folderRepository;
  }

  async getFolderStructure(query: GetFolderDto , parentId: number | null): Promise<any> {
    try {
      let folders = await this.folderRepository.getFolderStructure(query, parentId);

      // lakukan rekurisif untuk mendapatkan subfolder
      const processedFolders = await Promise.all(
        folders.map(async (folder) => {
          const queryName = {name: ''}
          const subfolders = await this.getFolderStructure(queryName, folder.id);
          return { ...folder, children: subfolders };
        })
      );

      return processedFolders;

    } catch (error) {
      return { status: 500, message: 'Failed to get folder structure' };
    }
    
  }

  // ini service create
  async createFolder(data: CreateFolderDto) {
    try {
      const resultCreate =  await this.folderRepository.createFolder(data);  
      if(resultCreate) {
        return { status: 200,message: 'Folder created successfully' };  
      }else{
        return { status: 200, message: 'Folder failed to create' };  
      }
    } catch (error) {
      return { status: 500, message: 'Folder failed to create' };
    }
    
  }

  // ini service update
  async updateFolder(data: UpdateFolderDto, id: number) {
    try {
      const resultUpdate = await this.folderRepository.updateFolder(data, id);
      if (resultUpdate) {
        return { status: 200, message: 'Folder updated successfully' };
      } else {
        return { status: 200, message: 'Folder failed to update' };
      }
    } catch (error) {
      return { status: 500, message: 'Folder failed to update' };
    }
  }

// service delete
  async deleteFolder(id: number) {
    try {
      const resultDelete =  await this.folderRepository.deleteFolder(id);  
      if(resultDelete) {
        return { status: 200,message: 'Folder deleted successfully' };  
      }else{
        return { status: 200, message: 'Folder failed to delete' };  
      }
    } catch (error) {
      return { status: 500, message: 'Folder failed to delete' };
    }
  }
}
