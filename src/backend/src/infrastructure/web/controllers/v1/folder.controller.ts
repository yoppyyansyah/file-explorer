import { FolderService } from '../../../../application/services/folder.service';  
import { CreateFolderDto } from '../../../../domain/dtos/Folder/CreateFolderDto';  
import { GetFolderDto } from '../../../../domain/dtos/Folder/GetFolderDto';
import { UpdateFolderDto } from '../../../../domain/dtos/Folder/UpdateFolderDto';

export class FolderController {
  private folderService: FolderService;

  constructor(folderService: FolderService) {
    this.folderService = folderService;
  }

  async getFolders(query: GetFolderDto) {
    try {
        const dataFolder = await this.folderService.getFolderStructure(query, null);  
        return {
          status: 200,
          message: 'Folder structure retrieved successfully',
          data: dataFolder
        }  
    } catch (error: unknown) { 
        return { status: 500, message: 'An unexpected error occurred' };
     
    }
  }

  async createFolder(req: { body: CreateFolderDto }) {
    try {
      const newFolder = await this.folderService.createFolder(req.body); 
      return newFolder 
    } catch (error: unknown) { 
      return { status: 500, message: 'An unexpected error occurred' };
    }
  }

  async updateFolder(req: { body: UpdateFolderDto, params: { id: string } }) {
    try {
      const updatedFolder = await this.folderService.updateFolder(req.body, parseInt(req.params.id));  
      return updatedFolder 
    } catch (error: unknown) { 
      return { status: 500, message: 'An unexpected error occurred' };
    }
  }

  async deleteFolder(id: number) {
    try {
      console.log("id",id)
      const deletedFolder = await this.folderService.deleteFolder(id);  
      return deletedFolder 
    } catch (error: unknown) { 
      return { status: 500, message: 'An unexpected error occurred' };
    }
  }
}
