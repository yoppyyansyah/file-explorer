import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { router as folderRoutes } from './infrastructure/web/routes/v1/folder.routes';
import { FolderPrismaAdapter } from './infrastructure/adapters/folder.prisma.adapter';
import { FolderService } from './application/services/folder.service';

// Inisialisasi adapter
const folderRepository = new FolderPrismaAdapter();

// Inisialisasi service
const folderService = new FolderService(folderRepository);

const app = new Elysia();

// Menambahkan middleware CORS dan routing untuk folder
// dan menambahkan router folder
app.use(cors())
   .use(folderRoutes(folderService))  
   .listen(3000, () => {
     console.log('Server is running on http://localhost:3000');
   });
