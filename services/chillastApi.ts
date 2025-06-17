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

export const fetchPodcastsFilters = async (filters: {
  title?: string;
  autores?: string;
  genero?: string;
  source?: string;
  duracion?: string | number;
  [key: string]: any; // for flexibility
}): Promise<Podcast[]> => {
  // Build query string from filters object
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, String(value));
    }
  });

  const endpoint = `${
    CHILLCAST_CONFIG.BASE_URL
  }/api/v1/podcast/filters?${params.toString()}`;

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

  console.log(id);
  

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


export const fetchEpisodesFromPodcast = async ({
  id,
}: {
  id: string | string[];
}): Promise<Episode[]> => {

  //TODO: Faltar implementar el endpoint de episodios
  const endpoint = `${CHILLCAST_CONFIG.BASE_URL}/api/v1/episode?podcast=${id}`;

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
   const endpoint = `${CHILLCAST_CONFIG.BASE_URL}/api/v1/episode?episode=${id}`;

   const response = await fetch(endpoint, {
     method: "GET",
     headers: CHILLCAST_CONFIG.headers,
   });

  if (!response.ok) {
    throw new Error("Error fetching episode", { cause: response.statusText });
  }

  const data = await response.json();


  return data.episodes[0];
};

// Obtener favoritos (GET)
export const fetchFavorites = async (username: string): Promise<Podcast[]> => {
  const endpoint = `${CHILLCAST_CONFIG.BASE_URL}/api/v1/auth/favorites?username=${encodeURIComponent(username)}`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener los favoritos");
  }

  const data = await response.json();
  return data.favorites;
};

// Agregar a favoritos (POST)
export const fetchAddFavorite = async ({
  username,
  podcastId,
}: {
  username: string;
  podcastId: string;
}) => {
  const endpoint = `${CHILLCAST_CONFIG.BASE_URL}/api/v1/auth/favorites?username=${encodeURIComponent(username)}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({ podcast: podcastId }),
  });

  const text = await response.text();

  if (!response.ok) {
    console.error("Error al agregar favorito", text);
    throw new Error(`Error al agregar favorito: ${text}`);
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    console.error("Error parseando JSON en agregar favorito:", error, "Texto:", text);
    throw new Error("Respuesta inválida del servidor al agregar favorito");
  }
};

// Eliminar de favoritos (DELETE)
export const fetchDeleteFavorite = async ({
  username,
  podcastId,
}: {
  username: string;
  podcastId: string;
}) => {
  const endpoint = `${CHILLCAST_CONFIG.BASE_URL}/api/v1/auth/favorites?username=${encodeURIComponent(username)}`;

  const response = await fetch(endpoint, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({ podcast: podcastId }),
  });

  if (!response.ok) {
    throw new Error("Error al eliminar favorito");
  }

  return await response.json();
};