export interface Folder {
    id: number;
    name: string;
    parentId: number | null;
    createdAt: Date;
    updatedAt: Date;
    children?: Folder[];
    status: 'active' | 'nonactive';
  }

  