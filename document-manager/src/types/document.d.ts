// src/types/document.ts
export interface Document {
  id: number;
  title: string;
  description: string;
  file: string;
  privacy: 'public' | 'private';
  uploaderId: string; // Update property name to match usage
}
