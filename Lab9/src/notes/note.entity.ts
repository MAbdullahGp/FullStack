export interface Note {
  id: number;
  title: string;
  content: string;
  tags?: string[];
  userId: number;
  createdAt: Date;
}
