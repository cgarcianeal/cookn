import {User} from './user';

export class Article {
  _id: string;
  title: string;
  description: string;
  createdDate: Date;
  createdBy: User;
  tags: string;
  ingredients?: JSON;
  instructions?: string;
  body?: string;
  image?: string
}
