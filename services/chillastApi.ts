import { Episode, Podcast } from "@/interfaces/interfaces";

export const CHILLCAST_CONFIG = {
    BASE_URL: "https://chillcast-backend.onrender.com",
    //API_KEY: process.env.NEXT_PUBLIC_CHILLCAST_API_KEY,
    headers: {
        accept: "application/json",
        //Authorization: `Bearer ${process.env.NEXT_PUBLIC_CHILLCAST_API_KEY}`,
    }
}

export const fetchPodcasts = async ({
  query,
}: {
  query?: string;
}): Promise<Podcast[]> => {

  const endpoint = `${CHILLCAST_CONFIG.BASE_URL}/api/v1/podcast`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: CHILLCAST_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error("Error fetching podcasts", { cause: response.statusText });
  }

  const data = await response.json();
  return data.podcasts;
};

export const fetchUniquePodcast = async ({
  id,
}: {
  id: string | string[];
}): Promise<Podcast> => {

  const endpoint = `${CHILLCAST_CONFIG.BASE_URL}/api/v1/podcast/id?id=${id}`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: CHILLCAST_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error("Error fetching podcasts", { cause: response.statusText });
  }

  const data = await response.json();
  return data.podcasts;
};


export const fetchEpisodes = async ({
  id,
}: {
  id: string | string[];
}): Promise<Episode[]> => {

  //TODO: Faltar implementar el endpoint de episodios
  // const endpoint = `${CHILLCAST_CONFIG.BASE_URL}/api/v1/podcast/episodes?id=${id}`;

  // const response = await fetch(endpoint, {
  //   method: "GET",
  //   headers: CHILLCAST_CONFIG.headers,
  // });

  //if (!response.ok) {
  //  throw new Error("Error fetching episodes", { cause: response.statusText });
  //}

  // const data = await response.json();

  const mock: Episode[] = [
    {
      _id: "1",
      title: "Primer episodio",
      description: "Este es el primer episodio del podcast",
      image: "abc",
    },
    {
      _id: "2",
      title: "Segundo episodio",
      description: "Explorando temas interesantes",
      image: "def",
    },
    {
      _id: "3",
      title: "Tercer episodio",
      description: "Entrevista con un invitado especial",
      image: "ghi",
    },
    {
      _id: "4",
      title: "Cuarto episodio",
      description: "Noticias y novedades del mes",
      image: "jkl",
    },
    {
      _id: "5",
      title: "Quinto episodio",
      description: "Preguntas y respuestas de la audiencia",
      image: "mno",
    },
    {
      _id: "6",
      title: "Sexto episodio",
      description: "Historias inspiradoras de oyentes",
      image: "pqr",
    },
    {
      _id: "7",
      title: "Séptimo episodio",
      description: "Tendencias tecnológicas actuales",
      image: "stu",
    },
    {
      _id: "8",
      title: "Octavo episodio",
      description: "Música y cultura pop",
      image: "vwx",
    },
    {
      _id: "9",
      title: "Noveno episodio",
      description: "Especial de fin de año",
      image: "yz1",
    },
    {
      _id: "10",
      title: "Décimo episodio",
      description: "Resumen de la temporada",
      image: "234",
    }
  ];


  return mock; //data.episodes;
};

export const fetchEpisodeById = async ({
  id,
}: {
  id: string | string[];
}): Promise<Episode> => {
  //TODO: Faltar implementar el endpoint de episodios
  // const endpoint = `${CHILLCAST_CONFIG.BASE_URL}/api/v1/episode/id?id=${id}`;

  // const response = await fetch(endpoint, {
  //   method: "GET",
  //   headers: CHILLCAST_CONFIG.headers,
  // });

  //if (!response.ok) {
  //  throw new Error("Error fetching episode", { cause: response.statusText });
  //}

  // const data = await response.json();

  const mock: Episode = {
    _id: "1",
    title: "Primer episodio",
    description: "Este es el primer episodio del podcast",
    image: "abc",
  };

  return mock; //data.episode;
}