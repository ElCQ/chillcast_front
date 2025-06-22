import FeedCard from "@/components/cards/feedCard";
import { Episode, Podcast, User } from "@/interfaces/interfaces";
import {
  fetchEpisodesFromPodcast,
  fetchFavorites,
  fetchPodcastsFilters,
  fetchUserData,
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

const Feed = () => {
  const [containerHeight, setContainerHeight] = useState(0);
  const [activePodcast, setActivePodcast] = useState("");
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [podcasts, setPodcasts] = useState<Podcast[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [favoritos, setFavoritos] = useState<Podcast[]>([]);

  const viewRef = useRef<View>(null);

  useEffect(() => {
    setTimeout(() => {
      if (viewRef.current) {
        UIManager.measure(
          findNodeHandle(viewRef.current),
          (x, y, width, height, pageX, pageY) => {
            console.log("Container height: " + height);

            setContainerHeight(height);
          }
        );
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

        const podcastsData = await fetchPodcastsFilters({
          genero: ["Historia"],
        });
        setPodcasts(podcastsData);

        const tenLimit = podcasts ? podcasts.slice(0, 3) : [];

        await Promise.all(
          tenLimit.map(async (pod) => {
            try {
              const response = await fetchEpisodesFromPodcast({
                id: pod.id ? pod.id : pod._id,
              });
              //console.log("episodio: " + response[0]);

              return {
                podcast: pod,
                episode: response[0],
              };
            } catch (error) {
              setLoading(false);
              //console.error(error);
              return {
                podcast: pod,
                episode: null,
              };
            }
          })
        ).then((results) => {
          //console.log("results");
          //console.log(results);

          setLoading(false);
          setFeeds(results.filter(Boolean) as Feed[]);
        });

        const favoritos = await fetchFavorites(user.username);
        setFavoritos(favoritos);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("error"));
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  // Callback para FlatList
  const onViewableItemsChanged = React.useRef<
    ({ viewableItems }: { viewableItems: Array<ViewToken> }) => void
  >(({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      setActivePodcast(
        (viewableItems[0].item as Feed).podcast.id ||
          (viewableItems[0].item as Feed).podcast._id
      );
    }
  }).current;

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
      <Text className="text-white text-xl">Error</Text>
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
        data={feeds}
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
