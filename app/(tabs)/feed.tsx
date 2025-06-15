import FeedCard from '@/components/cards/feedCard';
import { Episode, Podcast } from '@/interfaces/interfaces';
import { fetchEpisodesFromPodcast, fetchPodcasts } from '@/services/chillastApi';
import useFetch from '@/services/useFetch';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, ViewToken } from 'react-native';

type Feed = {
  podcast: Podcast,
  episode: Episode
}

const Feed = () => {

  const [containerHeight, setContainerHeight] = useState(0);
  const [activePodcast, setActivePodcast] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: podcasts, loading: podcastsLoading, error: podcastsError } = useFetch(() =>
    fetchPodcasts({})
  );

  const tenLimit = podcasts ? podcasts.slice(0, 3) : [];
  const [feeds, setFeeds] = useState<Feed[]>([]);

  useEffect(() => {
    if (!tenLimit.length) {
      setFeeds([]);
      return;
    }

    setLoading(true);

    // Obtener episodios para cada podcast y armar el array feeds
    Promise.all(
      tenLimit.map(async (pod) => {
        try {
          const response = await fetchEpisodesFromPodcast({ id: pod.id ? pod.id : pod._id });
          console.log(response[0]);

          return {
            podcast: pod,
            episode: response[0]
          };
        } catch (error) {
          setLoading(false);
          console.error(error);
          return null;
        }
      })
    ).then((results) => {
      setLoading(false);
      setFeeds(results.filter(Boolean) as Feed[]);
    });
  }, [podcasts]);



  // Callback para FlatList
  const onViewableItemsChanged = React.useRef<({ viewableItems }: { viewableItems: Array<ViewToken> }) => void>(
    ({ viewableItems }) => {
      if (viewableItems && viewableItems.length > 0) {
        setActivePodcast(
          (viewableItems[0].item as Feed).podcast.id ||
          (viewableItems[0].item as Feed).podcast._id
        );
      }
    }
  ).current;

  // Configuración para FlatList
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50, // Considera visible si el 50% del item está en pantalla
  };


  return loading ? (
    <View className="flex-1 items-center justify-center bg-[#282828]">
      <ActivityIndicator size="large" color="#fff" />
    </View>
  ) : podcastsError ? (
    <View className="flex-1 items-center justify-center bg-[#282828]">
      <Text className='text-white text-xl'>Error</Text>
    </View>
  ) : !feeds ? (
    <View className="flex-1 items-center justify-center bg-[#282828]">
      <Text className='text-white text-xl'>Not Found</Text>
    </View>
  ) : (
    <View className='flex-1'
      onLayout={e => setContainerHeight(e.nativeEvent.layout.height)}
    >
      <FlatList
        data={feeds}
        renderItem={({ item }) => (
          <FeedCard feed={item} activePodcast={activePodcast} cardHeight={containerHeight} />
        )}
        pagingEnabled
        getItemLayout={(_, index) => (
          { length: containerHeight, offset: containerHeight * index, index }
        )}
        style={{ flex: 1 }}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
    </View>

  )
}

export default Feed