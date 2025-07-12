import { Episode, Lista, Podcast, User } from "@/interfaces/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CHILLCAST_CONFIG = {
    BASE_URL: "https://chillcast-backend.onrender.com",
    //API_KEY: process.env.NEXT_PUBLIC_CHILLCAST_API_KEY,
    headers: {
        accept: "application/json",
        //Authorization: `Bearer ${process.env.NEXT_PUBLIC_CHILLCAST_API_KEY}`,
    }
}

//------------------------------------------------------------------------

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

//------------------------------------------------------------------------

export const fetchPodcastsFilters = async (filters: {
  title?: string;
  autores?: string;
  genero?: string | string[];
  source?: string;
  duracion?: string | number;
  [key: string]: any;
}): Promise<Podcast[]> => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      if (key === "genero" && Array.isArray(value)) {
        value.forEach((g) => params.append("genero", String(g)));
      } else {
        params.append(key, String(value));
      }
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

//------------------------------------------------------------------------

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

//------------------------------------------------------------------------

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

//------------------------------------------------------------------------

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

//------------------------------------------------------------------------
// Obtener favoritos (GET)

export const fetchFavorites = async (username: string): Promise<Podcast[]> => {

  const endpoint = `${CHILLCAST_CONFIG.BASE_URL}/api/v1/auth/favorites?username=${encodeURIComponent(username)}`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: CHILLCAST_CONFIG.headers,
  });

  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    throw new Error("Error fetching favorites", { cause: response.statusText });
  }

  const data = await response.json();

  return data.favorites;
};

//------------------------------------------------------------------------
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
      ...CHILLCAST_CONFIG.headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ podcast: podcastId }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error al agregar favorito: ${errorText}`);
  }

  const data = await response.json();
  return data;
};

//------------------------------------------------------------------------
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

//------------------------------------------------------------------------

export const fetchUserData = async ({
  username,
}: {
  username: string;
}): Promise<User> => {
  const endpoint = `${CHILLCAST_CONFIG.BASE_URL}/api/v1/auth/user-me?username=${encodeURIComponent(username)}`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: CHILLCAST_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error("Error fetching podcasts", { cause: response.statusText });
  }

  const data = await response.json();
  return data.user[0];
};

//------------------------------------------------------------------------

export const fetchRecommendations = async ({
  username,
  email
}: {
  username: string;
  email: string;
}): Promise<Podcast[]> => {

  const endpoint = `${CHILLCAST_CONFIG.BASE_URL}/api/v1/auth/get-recomendations?username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: CHILLCAST_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error("Error fetching podcasts", { cause: response.statusText });
  }

  const data = await response.json();
  
  return data.recomedaciones.generos_fav;
};

//------------------------------------------------------------------------
// Crear lista (POST)

export const fetchCrearLista = async ({
  username,
  nombre_lista,
}: {
  username: string;
  nombre_lista: string;
}) => {
  const endpoint = `${CHILLCAST_CONFIG.BASE_URL}/api/v1/listas?username=${encodeURIComponent(username)}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      ...CHILLCAST_CONFIG.headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nombre_lista }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error al crear lista: ${errorText}`);
  }

  const data = await response.json();
  return data;
};

//------------------------------------------------------------------------
// Obtener listas (GET)

export const fetchListas = async (username: string): Promise<Lista[]> => {

  const endpoint = `${CHILLCAST_CONFIG.BASE_URL}/api/v1/listas?username=${encodeURIComponent(username)}`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: CHILLCAST_CONFIG.headers,
  });

  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    throw new Error("Error fetching listas", { cause: response.statusText });
  }

  const data = await response.json();

  return data.listas ?? [];
};

//------------------------------------------------------------------------
// Eliminar lista (DELETE)

export const fetchDeleteLista = async ({
  username,
  listaId,
}: {
  username: string;
  listaId: string;
}) => {
  const endpoint = `${CHILLCAST_CONFIG.BASE_URL}/api/v1/listas?username=${encodeURIComponent(username)}&lista=${encodeURIComponent(listaId)}`;

  const response = await fetch(endpoint, {
    method: "DELETE",
    headers: {
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error al eliminar la lista");
  }

  return await response.json();
};

//------------------------------------------------------------------------
// Obtener lista por id (GET)

export const fetchLista = async (
   username: string,
  listaId: string
) : Promise<Lista> => {
  const endpoint = `${CHILLCAST_CONFIG.BASE_URL}/api/v1/listas?username=${encodeURIComponent(username)}&lista=${encodeURIComponent(listaId)}`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: CHILLCAST_CONFIG.headers,
  });

  if (response.status === 404) {
    throw new Error("Lista no encontrada");
  }

  if (!response.ok) {
    throw new Error("Error fetching lista", { cause: response.statusText });
  }

  const data = await response.json();

  return data.listas[0];

};

//------------------------------------------------------------------------
// Add podcast a list (PUT)

export const fetchAddPodcastALista = async ({
  username,
  listaId,
  podcastId,
}: {
  username: string;
  listaId: string;
  podcastId: string;
}) => {
  const endpoint = `${CHILLCAST_CONFIG.BASE_URL}/api/v1/listas/podcast?username=${encodeURIComponent(username)}&lista=${encodeURIComponent(listaId)}&podcast=${encodeURIComponent(podcastId)}`;

  const response = await fetch(endpoint, {
    method: "PUT",
    headers: {
      ...CHILLCAST_CONFIG.headers,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error al añadir podcast a lista: ${errorText}`);
  }

  const data = await response.json();
  return data;

};

//------------------------------------------------------------------------
// Eliminar podcast de lista (DELETE)

export const fetchDeletePodcastALista = async ({
  username,
  listaId,
  podcastId,
} : {
  username: string;
  listaId: string;
  podcastId: string;
}) => {
  const endpoint = `${CHILLCAST_CONFIG.BASE_URL}/api/v1/listas/podcast?username=${encodeURIComponent(username)}&lista=${encodeURIComponent(listaId)}&podcast=${encodeURIComponent(podcastId)}`;

  const response = await fetch(endpoint, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error al eliminar podcast de la lista");
  }

  return await response.json();

};

//------------------------------------------------------------------------
// Agregar podcast a historial (POST)

export const fetchAddPodcastAHistorial = async({
  username,
  email,
  podcastId,
}: {
  username: string;
  email: string;
  podcastId: string;
}) => {
    const endpoint = `${CHILLCAST_CONFIG.BASE_URL}/api/v1/auth/history`;

    const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      ...CHILLCAST_CONFIG.headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
      username, 
      email, 
      id_podcast: podcastId 
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error agregando al historial: ${errorText}`);
  }

  return response.json();

};

//------------------------------------------------------------------------
// Obtener historial (GET)

export const fetchHistorial = async (username: string): Promise<Lista[]> => {

  const endpoint = `${CHILLCAST_CONFIG.BASE_URL}/api/v1/listas?username=${encodeURIComponent(username)}`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: CHILLCAST_CONFIG.headers,
  });

  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    throw new Error("Error fetching listas", { cause: response.statusText });
  }

  const data = await response.json();

  return data.listas ?? [];
};

//------------------------------------------------------------------------

export const updateUserGenresAPI = async (username: string, generos: string[]) => {
  const endpoint = `${CHILLCAST_CONFIG.BASE_URL}/api/v1/auth/edit-user?username=${encodeURIComponent(username)}`;
  const response = await fetch(endpoint,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ generos }),
      }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al actualizar géneros");
  }

  return response.json();
};

//------------------------------------------------------------------------

export const loginUser = async (username: string, password: string, rememberMe: boolean) => {
  const endpoint = `${CHILLCAST_CONFIG.BASE_URL}/api/v1/auth/login`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error('Error de credenciales');
  }

  const usuario = data.user?.[0];
  if (!usuario) {
    throw new Error('Usuario inválido');
  }

  await AsyncStorage.setItem('logged', 'true');
  await AsyncStorage.setItem('usuario', JSON.stringify(usuario));

  if (rememberMe) {
    await AsyncStorage.setItem('rememberMe', 'true');
  } else {
    await AsyncStorage.removeItem('rememberMe');
  }
};

//------------------------------------------------------------------------

export const registerUser = async ({
                                     username,
                                     email,
                                     password,
                                     nombre,
                                   }: {
  username: string;
  email: string;
  password: string;
  nombre: string;
}) => {
  const endpoint = `${CHILLCAST_CONFIG.BASE_URL}/api/v1/auth/register-user`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password, nombre }),
  });

  const data = await response.json();

  if (!response.ok) {
    const mensajeError = data?.error || 'Ocurrió un error inesperado';
    throw new Error(mensajeError);
  }

  const user = data.user?.[0];
  if (!user) throw new Error('Usuario inválido');

  await AsyncStorage.setItem('usuario', JSON.stringify(user));
  await AsyncStorage.setItem('rememberMe', 'true');
};

//------------------------------------------------------------------------

export const getUserGenres = async (): Promise<string[]> => {
  const usuarioStr = await AsyncStorage.getItem('usuario');
  if (!usuarioStr) throw new Error('Usuario no encontrado');

  const { username } = JSON.parse(usuarioStr);
  const endpoint = `${CHILLCAST_CONFIG.BASE_URL}/api/v1/auth/user-me?username=${encodeURIComponent(username)}`;

  const response = await fetch(endpoint);
  if (!response.ok) throw new Error('Fallo la llamada a la API');

  const data = await response.json();
  const user = data?.user?.[0];
  if (!user) throw new Error('Usuario inválido');

  return user?.generos_fav ?? [];
};

//------------------------------------------------------------------------

export const updateUserGenres = async (generos: string[]) => {
  const usuarioStr = await AsyncStorage.getItem('usuario');
  if (!usuarioStr) throw new Error('Usuario no encontrado');

  const { username } = JSON.parse(usuarioStr);

  const endpoint = `${CHILLCAST_CONFIG.BASE_URL}/api/v1/auth/edit-user?username=${encodeURIComponent(username)}`;
  const response = await fetch(endpoint, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ generos }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al guardar géneros');
  }
};

//------------------------------------------------------------------------
// Obtener reseñas (GET)

// TODO: Falta testear e Implementar
export const fetchPodcastReview = async (id: string) => {

  const endpoint = `${CHILLCAST_CONFIG.BASE_URL}/api/v1/reseña?podcast=${encodeURIComponent(id)}}`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: CHILLCAST_CONFIG.headers,
  });

  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    throw new Error("Error fetching listas", { cause: response.statusText });
  }

  const data = await response.json();

  return data;

}

//------------------------------------------------------------------------
// Escribir reseña (POST)

// TODO: Falta testear e Implementar
export const fetchAddPodcastReview = async (id: string) => {
  const endpoint = `${
    CHILLCAST_CONFIG.BASE_URL
  }/api/v1/reseña?podcast=${encodeURIComponent(id)}}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: CHILLCAST_CONFIG.headers,
  });

  if (response.status === 404) {
    return [];
  }

  if (!response.ok) {
    throw new Error("Error fetching listas", { cause: response.statusText });
  }

  const data = await response.json();

  return data;
};