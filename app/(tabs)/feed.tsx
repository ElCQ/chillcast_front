import FeedCard from "@/components/cards/feedCard";
import { Episode, Podcast, User } from "@/interfaces/interfaces";
import {
  fetchEpisodeById,
  fetchFavorites,
  fetchRecommendations,
  fetchUserData
} from "@/services/chillastApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  findNodeHandle,
  FlatList,
  Text,
  UIManager,
  View,
  ViewToken,
} from "react-native";

type Feed = {
  podcast: Podcast;
  episode: Episode | null;
};

const mock: Feed[] = [
  {
    podcast: {
      autores: ["Farid Dieck", "Estudié Psicología"],
      description:
        "Mis amigos me dicen Faro. Relato historias y películas y reflexiono sobre ellas. Estudié Psicología, una maestría en clínica psicoanalítica y curso otra en psicoterapia psicoanalítica. Me gusta leer filosofía y escribir poesía.",
      genero: ["Cine Y Tv", "Psicología", "Historia", "Música"],
      id: "6833793e83ef47469bcd7798",
      _id: "6833793e83ef47469bcd7798",
      image: "https://i.scdn.co/image/ab6765630000ba8ab508d65101fe4e491416db4f",
      language: "es-MX",
      source: "Spotify",
      title: "Farid Dieck | Relatos y Reflexiones🍃",
      feed_url: null,
    },
    episode: {
      _id: "684399e29542adc02f9a8a82",
      audio_url:
        "https://podz-content.spotifycdn.com/audio/clips/0QgppNrBx9eyI4OSDeDURO/clip_447684_507684.mp3",
      description:
        "En este documental exploramos el camino de Jeff Bezos, desde sus inicios vendiendo libros en un garaje hasta liderar una de las empresas más influyentes del mundo. Una mirada a su visión, su determinación y cómo transformó la forma en que vivimos y compramos.",
      duration_ms: 2773916,
      image: "https://i.scdn.co/image/ab6765630000ba8ab508d65101fe4e491416db4f",
      language: "es-MX",
      release_date: "2025-05-25",
      title:
        "¿Puede una SOLA EMPRESA hundir la ECONOMÍA GLOBAL? | Amazon | Documental",
      rating: 5,
    },
  },
  {
    podcast: {
      autores: ["Spotify Studios", "La Cruda", "Migue Granados"],
      description:
        "A Migue Granados siempre le interesó molestar, pelear e indagar para llegar un poquito más lejos. En cada episodio Migue entrevista mano a mano, en una charla íntima y sincera, a distintas personalidades con historias de vida singulares. Una sola premisa: preguntar y discutir hasta la última vértebra; sacarnos las caretas para hablar de lo que nos pasa de verdad. La vida tiene una parte cruda…Y Migue no la deja de lado.",
      genero: ["Historia"],
      id: "6833793e83ef47469bcd779a",
      _id: "6833793e83ef47469bcd779a",
      image: "https://i.scdn.co/image/ab6765630000ba8a7f780f590413ae0467cce32d",
      language: "es",
      source: "Spotify",
      title: "La Cruda",
      feed_url: null,
    },
    episode: {
      _id: "684399fb9542adc02f9a8d12",
      audio_url:
        "https://podz-content.spotifycdn.com/audio/clips/4Bty9hd4wamp3xNGkH2mp2/clip_327094_387094.mp3",
      description:
        "A los 8 años comenzó a estudiar danza clásica en el Teatro Colón y poco a poco, lo que era su pasión terminó convirtiéndose en una pesadilla00:00-BAILARINA CLÁSICA01:14-La obsesión de la niña ballet 06:44-Vivir para llegar al Teatro Colón09:38-Dejar de ser niña los 9 años15:59-Un producto vendible para la cultura20:59-La enfermiza palabra del maestro 30:05-Huir y empezar de nuevo35:34-El sacrificio 42:38-No todo es perfecto tras bambalinas Learn more about your ad choices. Visit megaphone.fm/adchoices",
      duration_ms: 2903210,
      image: "https://i.scdn.co/image/ab6765630000ba8a7f780f590413ae0467cce32d",
      language: "es",
      release_date: "2025-04-03",
      title: "Bailarina clásica - Aldi Vaulet",
      rating: 5,
    },
  },
];

const Feed = () => {
  const [containerHeight, setContainerHeight] = useState(0);
  const [activePodcast, setActivePodcast] = useState("");
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [favoritos, setFavoritos] = useState<Podcast[]>([]);

  const viewRef = useRef<View>(null);

  useEffect(() => {
    setTimeout(() => {
      if (viewRef.current) {
        const nodeHandle = findNodeHandle(viewRef.current);
        if (nodeHandle != null) {
          UIManager.measure(
            nodeHandle,
            (x, y, width, height, pageX, pageY) => {
              //console.log("Container height: " + height);
 
              setContainerHeight(height);
            }
          );
        }
      }
    }, 500); // Delay to ensure layout is complete
  }, [feeds]);

  useEffect(() => {
    setFeeds([]);
    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      try {
        const usuarioStr = await AsyncStorage.getItem("usuario");
        const usuario = usuarioStr ? JSON.parse(usuarioStr) : null;
        if (!usuario?.username) throw new Error("No username found");

        const user = await fetchUserData({ username: usuario.username });
        setUserData(user);
      } catch (err) {
        console.log(err);
        setError(err instanceof Error ? err : new Error("error"));
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  useEffect(() => {
    if (userData) {
      setLoading(true);
      fetchFeeds();
      setLoading(false);
    }
  }, [userData]);

  const fetchFeeds = async () => {
    if (!userData) {
      console.error("User data is not available");
      return;
    }

    const podcastsData = await fetchRecommendations({
      username: userData.username,
      email: userData.email
    });

    const fetchFirstEpisode = async (pod: Podcast) => {
      console.log(pod.episodes);
      
      if (!pod.episodes || pod.episodes.length === 0) {
        return { podcast: pod, episode: null };
      }
      try {
        
        const response = await fetchEpisodeById({ id: pod.episodes[pod.episodes.length - 1] });
        console.log("episodio:  " + response);
        return { podcast: pod, episode: response };
      } catch (error) {
        console.error(error, "Error fetching episode for podcast:", pod.id, pod.episodes[0]);
        return { podcast: pod, episode: null };
      }
    };

    Promise.all(podcastsData!.map(fetchFirstEpisode))
      .then((results) => {
        setFeeds(feeds.concat(results.filter(Boolean) as Feed[]));
      })

    const favoritos = await fetchFavorites(userData.username);
    setFavoritos(favoritos);
  }

  // Callback para FlatList
  const onViewableItemsChanged = React.useCallback(
    async ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
      if (viewableItems && viewableItems.length > 0) {
        setActivePodcast(
          (viewableItems[0].item as Feed).podcast.id ||
          (viewableItems[0].item as Feed).podcast._id
        );
      }

      console.log("Active podcast ID: ", viewableItems[0]?.index, feeds.length);

      if (
        viewableItems[0]?.index === feeds.length - 1 &&
        viewableItems[0]?.isViewable
      ) {
        //await fetchFeeds();
      }
    },
    [feeds] // Dependencia para que siempre tenga el valor actualizado
  );

  // Configuración para FlatList
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50, // Considera visible si el 50% del item está en pantalla
  };

  const isFavorite = (podcastId: string) => {
    const existe = favoritos?.find((pod, index) => pod._id == podcastId);
    return existe != undefined;
  };

  return loading ? (
    <View className="flex-1 items-center justify-center bg-[#282828]">
      <ActivityIndicator size="large" color="#fff" />
    </View>
  ) : error ? (
    <View className="flex-1 items-center justify-center bg-[#282828]">
      <Text className="text-white text-xl">{error.message}</Text>
    </View>
  ) : !feeds ? (
    <View className="flex-1 items-center justify-center bg-[#282828]">
      <Text className="text-white text-xl">Not Found</Text>
    </View>
  ) : (
    <View
      className="flex-1 bg-[#282828] h-[756px]"
      collapsable={false}
      ref={viewRef}
    >
      <FlatList
        data={mock.concat(feeds)}
        renderItem={({ item }) => (
          <FeedCard
            favorite={isFavorite(
              item.podcast.id ? item.podcast.id : item.podcast._id
            )}
            feed={item}
            activePodcast={activePodcast}
            cardHeight={containerHeight}
          />
        )}
        pagingEnabled
        getItemLayout={(_, index) => ({
          length: containerHeight,
          offset: containerHeight * index,
          index,
        })}
        style={{ flex: 1 }}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
    </View>
  );
};

export default Feed;
