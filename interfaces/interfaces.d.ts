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
