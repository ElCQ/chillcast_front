import { Episode, Podcast } from '@/interfaces/interfaces'
import { hexToRgba } from '@/utils/colorUtils'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { useAudioPlayer } from 'expo-audio'
import { LinearGradient } from 'expo-linear-gradient'
import { Href, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'

type Feed = {
  podcast: Podcast,
  episode: Episode
}

const FeedCard = ({ feed, activePodcast, cardHeight }: { feed: Feed, activePodcast: string, cardHeight: number }) => {

  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);


  const handlePlayPause = () => {
    console.log(isPlaying);

    if (!player) return;
    if (activePodcast != feed.podcast.id) return;


    if (isPlaying) {
      player.pause();
      setIsPlaying(false);
    } else {
      player.play();
      setIsPlaying(true);
    }
  };

  const handleFowardBackward = (cantidad: number) => {
    player.seekTo(player.currentTime + cantidad);
  }

  const handleRedirect = (url: Href) => {
    player.pause();
    setIsPlaying(false);
    router.push(url);
  }

  const player = useAudioPlayer(feed.episode.audio_url);

  useEffect(() => {

    if (activePodcast === feed.podcast.id && !isPlaying) {
      player.play();
      setIsPlaying(true);
    }

    const listener = player.addListener("playbackStatusUpdate", (audioStatus) => {
      setCurrentTime(audioStatus.currentTime);
      setDuration(audioStatus.duration);

      if (audioStatus.didJustFinish) {
        player.seekTo(0);
      }

      // Si el feed deja de ser el activo, pausa el audio y reinicia el estado
      if (isPlaying && activePodcast !== feed.podcast.id) {
        player.pause();
        setIsPlaying(false);
      }
    });

    // Si el feed deja de ser el activo, reinicia el estado
    if (activePodcast !== feed.podcast.id && isPlaying) {
      player.pause();
      setIsPlaying(false);
    }




    // Limpieza al desmontar
    return () => {
      listener.remove && listener.remove();
      player.pause();
      setIsPlaying(false);
    };
    // Solo depende de activePodcast y player
  }, [activePodcast, player]);

  return (
    <View className='flex-1' style={{ position: "relative", height: cardHeight }}>

      <ImageBackground
        source={{ uri: feed.podcast?.image || "https://via.placeholder.com/180x280" }}
        className="w-full h-full justify-end items-center"
        resizeMode="cover"
      >

        <LinearGradient
          colors={[
            hexToRgba("#000", 0.4),
            hexToRgba("#000", 0.4),
            "#000",
          ]}
          className="rounded-lg px-5 pt-12 pb-8 w-full h-full justify-between gap-3"
        >

          <View className='h-full w-full flex-1 flex-row'>

            <View className='h-full w-full flex-1 justify-end gap-2'>

              <TouchableOpacity
                onPress={() => handleRedirect(`/podcast/${feed.podcast?.id ? feed.podcast.id : feed.podcast?._id}`)}
              >
                <Text className='text-white text-2xl font-medium'>{feed.podcast.title}</Text>

              </TouchableOpacity>
              <Text className='text-neutral-400 text-sm' numberOfLines={3}>{feed.podcast.description}</Text>
              <View className='flex flex-row gap-2 my-2'>
                <AntDesign
                  name='sound'
                  size={18}
                  color="#a3a3a3"
                />
                <View className='flex flex-row'>
                  <Text className='text-neutral-400 text-sm'>Escuchando: </Text>
                  <TouchableOpacity
                    onPress={() => handleRedirect(`/episodio/${feed.episode._id}`)}
                  >

                    <Text className='text-sm text-neutral-300' ellipsizeMode='tail' numberOfLines={1} style={{ maxWidth: 200 }}> {feed.episode.title}</Text>
                  </TouchableOpacity>
                </View>


              </View>

              {/* Progress Bar */}
              <View className='flex flex-row justify-center items-center w-full'>
                <MaterialIcons
                  name={isPlaying ? 'pause' : 'play-arrow'}
                  size={18}
                  color="#a3a3a3"
                />

                <View className='flex-1 bg-neutral-700 mx-2 rounded-full'>
                  <View
                    className='rounded-full'
                    style={{
                      width: `${(duration > 0 ? currentTime / duration : 0) * 100}%`,
                      backgroundColor: '#fff',
                      height: 6,
                    }}
                  >
                  </View>
                </View>
              </View>
            </View>

            <View className='justify-end items-end'>
              <MaterialIcons
                name="favorite-border"
                size={30}
                color="#fff"
                style={{ marginLeft: 8 }}
              />
            </View>
          </View>


        </LinearGradient>

      </ImageBackground>


      <View className="absolute justify-center items-center top-1/2 left-1/3">
        <View className='flex flex-row gap-4 justify-center items-center'>
          <TouchableOpacity
            className='  bg-neutral-800/60 rounded-full w-16 h-16 justify-center items-center'
            style={{
              transform: [{ translateX: -40 }, { translateY: -40 }],
            }}
            onPress={() => handleFowardBackward(-5)}
          >
            <AntDesign
              name="banckward"
              size={20}
              color="#fff"
            />
          </TouchableOpacity>

          <TouchableOpacity
            className='  bg-neutral-800/60 rounded-full w-20 h-20 justify-center items-center'
            style={{
              transform: [{ translateX: -40 }, { translateY: -40 }],
            }}
            onPress={() => handlePlayPause()}
          >
            <MaterialIcons
              name={isPlaying ? 'pause' : 'play-arrow'}
              size={40}
              color="#fff"
            />
          </TouchableOpacity>

          <TouchableOpacity
            className='  bg-neutral-800/60 rounded-full w-16 h-16 justify-center items-center'
            style={{
              transform: [{ translateX: -40 }, { translateY: -40 }],
            }}
            onPress={() => handleFowardBackward(5)}
          >
            <AntDesign
              name="forward"
              size={20}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

      </View>


    </View>
  )
}

export default FeedCard

