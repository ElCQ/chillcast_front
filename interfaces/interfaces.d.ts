//TODO: Hacer las interfaces de lo que se necesite del backend.

export interface Podcast {
  _id: string;
  id?: string;
  title: string;
  description: string;
  image: string;
  autores: string[];
  genero: string[];
  feed_url: string | null;
  language: string;
  source: string;
  episodes?: string[];
}

export interface Episode {
  _id: string;
  audio_url: string;
  description: string;
  duration_ms: number;
  image: string;
  language: string;
  release_date: string;
  title: string;
  rating: number;
}

export interface Reseña {
  _id: string;
  nombre: string;
  valoracion: number;
  texto: string;
}

export interface User {
  _id: string;
  activo: boolean;
  apellido: string;
  nombre: string;
  email: string;
  username: string;
  fecha_alta: string;
  generos: string[];
  generos_fav: string[];
}

export interface Lista {
  _id: string;
  nombre: string;
  podcast: string[];
  user: string;
}