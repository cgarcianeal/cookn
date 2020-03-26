export class Article {
  id: string;
  title: string;
  description?: string;
  dateCreated: number;
  createdBy: string;
  body?: string;
  tags: string[];
}
