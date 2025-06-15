
// export const mockFetchEpisodes = async ({
//   id,
// }: {
//   id: string | string[];
// }): Promise<Episode[]> => {
//   const mock: Episode[] = [
//     {
//       _id: "1",
//       title: "Primer episodio",
//       description: "Este es el primer episodio del podcast",
//       image: "abc",
//     },
//     {
//       _id: "2",
//       title: "Segundo episodio",
//       description: "Explorando temas interesantes",
//       image: "def",
//     },
//     {
//       _id: "3",
//       title: "Tercer episodio",
//       description: "Entrevista con un invitado especial",
//       image: "ghi",
//     },
//     {
//       _id: "4",
//       title: "Cuarto episodio",
//       description: "Noticias y novedades del mes",
//       image: "jkl",
//     },
//     {
//       _id: "5",
//       title: "Quinto episodio",
//       description: "Preguntas y respuestas de la audiencia",
//       image: "mno",
//     },
//     {
//       _id: "6",
//       title: "Sexto episodio",
//       description: "Historias inspiradoras de oyentes",
//       image: "pqr",
//     },
//     {
//       _id: "7",
//       title: "Séptimo episodio",
//       description: "Tendencias tecnológicas actuales",
//       image: "stu",
//     },
//     {
//       _id: "8",
//       title: "Octavo episodio",
//       description: "Música y cultura pop",
//       image: "vwx",
//     },
//     {
//       _id: "9",
//       title: "Noveno episodio",
//       description: "Especial de fin de año",
//       image: "yz1",
//     },
//     {
//       _id: "10",
//       title: "Décimo episodio",
//       description: "Resumen de la temporada",
//       image: "234",
//     },
//   ];

//   return mock; //data.episodes;
// };

// export const mockFetchEpisodeById = async ({
//   id,
// }: {
//   id: string | string[];
// }): Promise<Episode> => {
//   const mock: Episode = {
//     _id: "1",
//     title: "Primer episodio",
//     description: "Este es el primer episodio del podcast",
//     image: "abc",
//   };

//   return mock;
// };

// export const mockFetchPodcasts = async ({
//   query,
// }: {
//   query?: string;
// }): Promise<Podcast[]> => {
//   const mock: Podcast[] = [
//     {
//       _id: "1",
//       title: "Chill Vibes",
//       description: "Relájate con los mejores temas y entrevistas.",
//       image: "chillvibes.jpg",
//       author: "Ana López",
//       GenreName: "Música",
//       feed_url: "https://chillvibes.com/feed",
//       language: "es",
//       source: "Spotify",
//     },
//     {
//       _id: "2",
//       title: "Tech Talks",
//       description: "Novedades y tendencias tecnológicas.",
//       image: "techtalks.jpg",
//       author: "Carlos Pérez",
//       GenreName: "Tecnología",
//       feed_url: "https://techtalks.com/feed",
//       language: "es",
//       source: "Apple Podcasts",
//     },
//     {
//       _id: "3",
//       title: "Historias de Vida",
//       description: "Testimonios inspiradores de personas comunes.",
//       image: "historias.jpg",
//       author: "María García",
//       GenreName: "Inspiración",
//       feed_url: "https://historiasdevida.com/feed",
//       language: "es",
//       source: "Google Podcasts",
//     },
//     {
//       _id: "4",
//       title: "Café y Libros",
//       description: "Charlas sobre literatura y café.",
//       image: "cafelibros.jpg",
//       author: "Jorge Ramírez",
//       GenreName: "Literatura",
//       feed_url: "https://cafeylibros.com/feed",
//       language: "es",
//       source: "Spotify",
//     },
//     {
//       _id: "5",
//       title: "Ciencia al Día",
//       description: "Descubre los últimos avances científicos.",
//       image: "ciencia.jpg",
//       author: "Lucía Torres",
//       GenreName: "Ciencia",
//       feed_url: "https://cienciaaldia.com/feed",
//       language: "es",
//       source: "Apple Podcasts",
//     },
//     {
//       _id: "6",
//       title: "Mundo Gamer",
//       description: "Noticias y análisis del mundo de los videojuegos.",
//       image: "gamer.jpg",
//       author: "Pedro Sánchez",
//       GenreName: "Videojuegos",
//       feed_url: "https://mundogamer.com/feed",
//       language: "es",
//       source: "Spotify",
//     },
//     {
//       _id: "7",
//       title: "Salud y Bienestar",
//       description: "Consejos para una vida saludable.",
//       image: "salud.jpg",
//       author: "Elena Ruiz",
//       GenreName: "Salud",
//       feed_url: "https://saludybienestar.com/feed",
//       language: "es",
//       source: "Google Podcasts",
//     },
//     {
//       _id: "8",
//       title: "Viajeros",
//       description: "Experiencias y tips para viajeros.",
//       image: "viajeros.jpg",
//       author: "Miguel Herrera",
//       GenreName: "Viajes",
//       feed_url: "https://viajeros.com/feed",
//       language: "es",
//       source: "Spotify",
//     },
//     {
//       _id: "9",
//       title: "Cultura Pop",
//       description: "Todo sobre cine, series y música pop.",
//       image: "culturapop.jpg",
//       author: "Sofía Martínez",
//       GenreName: "Entretenimiento",
//       feed_url: "https://culturapop.com/feed",
//       language: "es",
//       source: "Apple Podcasts",
//     },
//     {
//       _id: "10",
//       title: "Emprende Hoy",
//       description: "Historias y consejos para emprendedores.",
//       image: "emprendehoy.jpg",
//       author: "David Gómez",
//       GenreName: "Negocios",
//       feed_url: "https://emprendehoy.com/feed",
//       language: "es",
//       source: "Spotify",
//     },
//   ];

//   return mock;
// };

// export const mockFetchUniquePodcast = async ({
//   id,
// }: {
//   id: string | string[];
// }): Promise<Podcast> => {
//   const mock: Podcast = {
//     _id: "1",
//     title: "Chill Vibes",
//     description: "Relájate con los mejores temas y entrevistas.",
//     image: "chillvibes.jpg",
//     author: "Ana López",
//     GenreName: "Música",
//     feed_url: "https://chillvibes.com/feed",
//     language: "es",
//     source: "Spotify",
//   };

//   return mock;
// };
