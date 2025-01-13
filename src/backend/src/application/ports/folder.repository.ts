import { Prisma, PrismaClient } from '@prisma/client';  
import {CreateFolderDto} from '../../domain/dtos/Folder/CreateFolderDto';
const prisma = new PrismaClient();
import { Status } from '@prisma/client';
import { UpdateFolderDto } from '../../domain/dtos/Folder/UpdateFolderDto';
import { GetFolderDto } from '../../domain/dtos/Folder/GetFolderDto';


export class FolderRepository {
  
  async getFolderStructure(query: GetFolderDto, parentId: number | null) {  
    const where: Prisma.FolderWhereInput = {
      status: Status.active, 
    };

    if (query.name) {
      where.name = {
        contains: query.name,
      };
    }
    if(parentId){
      where.parentId = parentId;
    }else {
      if(!query.name) {
        where.parentId = null;
      }
    }

    const folders = await prisma.folder.findMany({
      where: where,
    });

    return folders;
  }

  async createFolder(data: CreateFolderDto) {
    return await prisma.folder.create({
      data: {
        name: data.name,
        parentId: data.parentId,
      },
    });
  }

  async updateFolder(data: UpdateFolderDto, id: number) {
    const folderToUpdate = await prisma.folder.findUnique({
      where: { id },
    });
  
    if (!folderToUpdate) {
      return { status: 404, message: 'Folder not found' };
    }
  
    return await prisma.folder.update({
      where: { id },
      data: {
        name: data.name,
        parentId: data.parentId,
      },
    });
  }
  

  async deleteFolder(id: number) {
      const folderToDelete = await prisma.folder.findUnique({
        where: { id },
      });
    
      if (!folderToDelete) {
        return { status: 404, message: 'Folder not found' };
      }
    
      const updatedFolder = await prisma.folder.update({
        where: { id },
        data: {
          status: Status.nonactive,
        },
      });
    
      return updatedFolder;
    }
}
