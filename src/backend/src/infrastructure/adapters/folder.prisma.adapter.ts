import { FolderRepository } from '../../application/ports/folder.repository';
import { Prisma, PrismaClient } from '@prisma/client';
import { GetFolderDto } from '../../domain/dtos/Folder/GetFolderDto';
import { Status } from '@prisma/client'; 

const prisma = new PrismaClient();



export class FolderPrismaAdapter implements FolderRepository {
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
  

  async createFolder(data: { name: string; parentId: number | null }) {
    return await prisma.folder.create({
      data,
    });
  }

  async updateFolder(data: { name: string; parentId: number | null }, id: number) {
    const folderToUpdate = await prisma.folder.findUnique({
      where: { id },
    });

    if (!folderToUpdate) {
      return { status: 404, message: 'Folder not found' };
    }

    return await prisma.folder.update({
      where: { id },
      data,
    });
  }

  async deleteFolder(id: number) {
    const folderToDelete = await prisma.folder.findUnique({
      where: { id },
    });

    if (!folderToDelete) {
      return { status: 404, message: 'Folder not found' };
    }

    return await prisma.folder.update({
      where: { id },
      data: {
        status: 'nonactive',
      },
    });
  }
}
