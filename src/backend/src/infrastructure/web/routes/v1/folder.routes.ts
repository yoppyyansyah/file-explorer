import { Elysia } from 'elysia';
import { FolderController } from '../../controllers/v1/folder.controller'; 
import { FolderService } from '../../../../application/services/folder.service';  
import { CreateFolderDto } from '../../../../domain/dtos/Folder/CreateFolderDto';  
import { UpdateFolderDto } from '../../../../domain/dtos/Folder/UpdateFolderDto';
import { GetFolderDto } from '../../../../domain/dtos/Folder/GetFolderDto';

export function router(folderService: FolderService) {  
  const router = new Elysia();
  const folderController = new FolderController(folderService); 

  router.get('/v1/folders', async (req: {query: GetFolderDto}) => {
    return folderController.getFolders(req.query);  
  });

  router.post('/v1/folders', async (req: { body: CreateFolderDto }) => {
    return await folderController.createFolder(req); 
  });

  router.put('/v1/folders/:id', async (req: { body: UpdateFolderDto, params: { id: string } }) => {
    return await folderController.updateFolder(req);  
  });

  router.delete('/v1/folders/:id', async (req: { params: { id: string } }) => {
    return await folderController.deleteFolder(parseInt(req.params.id));  
  });

  return router; 
}
