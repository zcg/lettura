import Dexie, { Table } from 'dexie';

export interface Channel {
  id?: number;
  uuid: string;
  title: string;
  link: string;
  feedUrl: string;
  description?: string;
  pubDate?: Date;
  unread?: Number;
}
export interface Article {
  id?: number;
  uuid: string;
  title: string;
  link: string;
  image: string;
  feedUrl: string;
  description?: string;
  content?: string;
  pubDate?: Date;
  unread: number;
}

export class MySubClassedDexie extends Dexie {
  channels!: Table<Channel>;
  articles!: Table<Article>;

  constructor() {
    super('lettura');
    this.version(1.3).stores({
      channels: '++id, uuid, title, link, &feedUrl, description, pubDate, unread, favicon',
      articles: '++id, uuid, title, link, image, [feedUrl+unread], author, description, content, pubDate',
    });
  }
}

export const db = new MySubClassedDexie();
