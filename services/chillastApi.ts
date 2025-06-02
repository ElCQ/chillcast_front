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
  const endpoint = `${CHILLCAST_CONFIG.BASE_URL}/api/v1/podcast/episodes?id=${id}`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: CHILLCAST_CONFIG.headers,
  });

  if (!response.ok) {
   throw new Error("Error fetching episodes", { cause: response.statusText });
  }

  const data = await response.json();

  return data.episodes;
};

export const fetchEpisodeById = async ({
  id,
}: {
  id: string | string[];
}): Promise<Episode> => {
  
  //TODO: Falta implementar el endpoint de episodios
   const endpoint = `${CHILLCAST_CONFIG.BASE_URL}/api/v1/episode/id?id=${id}`;

   const response = await fetch(endpoint, {
     method: "GET",
     headers: CHILLCAST_CONFIG.headers,
   });

  if (!response.ok) {
    throw new Error("Error fetching episode", { cause: response.statusText });
  }

  const data = await response.json();


  return data.episode;
}