import { ObjectId } from "mongodb";

export interface BlogPostBase {
  title: string;
  slug: string;
  content: string;
  author: string;
  tags: string[];
  views: number;
  status: "published" | "draft" | "archived";
}

export interface BlogPost extends BlogPostBase {
  _id: ObjectId | string;
  createdAt: Date;
  updatedAt: Date;
}

export type BlogPostInsert = Omit<BlogPost, "_id">;

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  total?: number;
  page?: number;
  limit?: number;
}

export interface BlogPostCreateDTO extends Omit<BlogPostBase, "views" | "tags" | "slug"> {
  slug?: string; // auto-generated from title when omitted
  tags?: string[];
}

export interface BlogPostUpdateDTO extends Partial<Omit<BlogPostBase, "views" | "author">> {
  tags?: string[];
}
