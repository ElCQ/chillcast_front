//TODO: Hacer las interfaces de lo que se necesite del backend.

export interface Podcast {
  _id: string;
  title: string;
  description: string;
  image: string;
  author: string;
  GenreName: string | null;
  feed_url: string | null;
  language: string;
  source: string;
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
}

export interface Reseña {
  _id: string;
  nombre: string;
  valoracion: number;
  texto: string;
}