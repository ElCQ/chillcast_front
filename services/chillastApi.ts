import { Podcast } from "@/interfaces/interfaces";

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
  // TODO: Implementar API

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