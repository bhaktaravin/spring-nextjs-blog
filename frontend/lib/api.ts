import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Post {
  id?: number;
  title: string;
  content: string;
  author: string;
  createdAt?: string;
  updatedAt?: string;
}

export async function getAllPosts(): Promise<Post[]> {
  const { data } = await api.get<Post[]>('/posts');
  return data;
}

export async function getPostById(id: number): Promise<Post> {
  const { data } = await api.get<Post>(`/posts/${id}`);
  return data;
}

export async function createPost(post: Omit<Post, 'id'>): Promise<Post> {
  const { data } = await api.post<Post>('/posts', post);
  return data;
}

export async function updatePost(id: number, post: Omit<Post, 'id'>): Promise<Post> {
  const { data } = await api.put<Post>(`/posts/${id}`, post);
  return data;
}

export async function deletePost(id: number): Promise<void> {
  await api.delete(`/posts/${id}`);
}
