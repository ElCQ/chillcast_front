import { Episode, Podcast } from "@/interfaces/interfaces";
import { fetchAddFavorite, fetchDeleteFavorite } from "@/services/chillastApi";
import { hexToRgba } from "@/utils/colorUtils";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAudioPlayer } from "expo-audio";
import { LinearGradient } from "expo-linear-gradient";
import { Href, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import Loader from '@/components/loader';

type Feed = {
  podcast: Podcast;
  episode: Episode | null;
};

const FeedCard = ({
  feed,
  activePodcast,
  cardHeight,
  favorite,
}: {
  feed: Feed;
  activePodcast: string;
  cardHeight: number;
  favorite: boolean;
}) => {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [openDescription, setOpenDescription] = useState(false);
  const [favoritoActual, setFavoritoActual] = useState(favorite);
  const [loading, setLoading] = useState(false);

  const player =
    feed.episode && feed.episode.audio_url
      ? useAudioPlayer(feed.episode.audio_url)
      : null;

  const handlePlayPause = () => {
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
    if (!player) return;
    player.seekTo(player.currentTime + cantidad);
  };

  const handleRedirect = (url: Href) => {
    if (!player) return;
    player.pause();
    setIsPlaying(false);
    router.push(url);
  };

  const handleAddToFavorites = async (id: string) => {
    if (activePodcast != id) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Error al agregar a favoritos",
      });
      return;
    }

    setLoading(true);
    try {
      const usuarioStr = await AsyncStorage.getItem("usuario");
      const usuario = usuarioStr ? JSON.parse(usuarioStr) : null;

      if (!usuario || !usuario.username) {
        throw new Error("No estás autenticado");
      }

      const podcastId = activePodcast;

      if (favoritoActual) {
        await fetchDeleteFavorite({
          username: usuario.username,
          podcastId,
        });

        setFavoritoActual(false);
        Toast.show({
          type: "success",
          text1: "¡Éxito!",
          text2: "Podcast fue eliminado de favoritos",
        });
      } else {
        await fetchAddFavorite({
          username: usuario.username,
          podcastId,
        });

        setFavoritoActual(true);
        Toast.show({
          type: "success",
          text1: "¡Éxito!",
          text2: "Podcast añadido a favoritos",
        });
      }
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2:
          err instanceof Error ? err.message : "Error al agregar a favoritos",
      });
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (!player) return;

    if (activePodcast === feed.podcast.id && !isPlaying) {
      player.play();
      setIsPlaying(true);
    }

    const listener = player.addListener(
      "playbackStatusUpdate",
      (audioStatus) => {
        if (!isMounted) return;
        setCurrentTime(audioStatus.currentTime);
        setDuration(audioStatus.duration);

        if (audioStatus.didJustFinish) {
          player.seekTo(0);
        }

        if (isPlaying && activePodcast !== feed.podcast.id) {
          player.pause();
          setIsPlaying(false);
        }
      }
    );

    if (activePodcast !== feed.podcast.id && isPlaying) {
      player.pause();
      setIsPlaying(false);
    }

    return () => {
      isMounted = false;
      listener.remove && listener.remove();
      if (player) {
        try {
          player.pause();
        } catch (e) {
        }
      }
      setIsPlaying(false);
    };
    // Solo depende de activePodcast y player
  }, [activePodcast, player]);

  return (
      <>
    <View
      className="flex-1 "
      style={{ position: "relative", height: cardHeight }}
    >
      <ImageBackground
        source={{
          uri: feed.podcast?.image || "https://via.placeholder.com/180x280",
        }}
        className="w-full h-full justify-end items-center"
        resizeMode="cover"
      >
        <LinearGradient
          colors={[hexToRgba("#000", 0.4), hexToRgba("#000", 0.4), "#000"]}
          className="rounded-lg px-5 pt-12 pb-8 w-full h-full justify-between gap-3"
        >
          <View className="h-full w-full flex-1 flex-row">
            <View className="h-full w-full flex-1 justify-end gap-2">
              <TouchableOpacity
                onPress={() =>
                  handleRedirect(
                    `/podcast/${
                      feed.podcast?.id ? feed.podcast.id : feed.podcast?._id
                    }`
                  )
                }
              >
                <Text className="text-white text-2xl font-medium">
                  {feed.podcast.title}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setOpenDescription(!openDescription)}
              >
                  <Text
                    className="text-neutral-400 text-sm"
                    numberOfLines={openDescription ? 15 : 3}
                  >
                    {feed.podcast.description}
                  </Text>
              </TouchableOpacity>

              {player && feed.episode != null ? (
                <>
                  <View className="flex flex-row gap-2 my-2">
                    <AntDesign name="sound" size={18} color="#a3a3a3" />
                    <View className="flex flex-row">
                      <Text className="text-neutral-400 text-sm">
                        Escuchando:{" "}
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          handleRedirect(`/episodio/${feed.episode?._id}`)
                        }
                      >
                        <Text
                          className="text-sm text-neutral-300"
                          ellipsizeMode="tail"
                          numberOfLines={1}
                          style={{ maxWidth: 200 }}
                        >
                          {feed.episode.title}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View className="flex flex-row justify-center items-center w-full">
                    <MaterialIcons
                      name={isPlaying ? "pause" : "play-arrow"}
                      size={18}
                      color="#a3a3a3"
                    />

                    <View className="flex-1 bg-neutral-700 mx-2 rounded-full">
                      <View
                        className="rounded-full"
                        style={{
                          width: `${
                            (duration > 0 ? currentTime / duration : 0) * 100
                          }%`,
                          backgroundColor: "#fff",
                          height: 6,
                        }}
                      ></View>
                    </View>
                  </View>
                </>
              ) : (
                <></>
              )}
            </View>

            <View className="flex justify-end items-end gap-5">
              <TouchableOpacity
                onPress={() =>
                  handleAddToFavorites(
                    feed.podcast?.id ? feed.podcast.id : feed.podcast?._id
                  )
                }
              >
                <MaterialIcons
                  name={favoritoActual ? "favorite" : "favorite-border"}
                  size={30}
                  color="#fff"
                  style={{ marginLeft: 8 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  handleRedirect(
                    `/podcast/${
                      feed.podcast?.id ? feed.podcast.id : feed.podcast?._id
                    }`
                  )
                }
              >
                <MaterialCommunityIcons
                  name="location-enter"
                  size={30}
                  color="#fff"
                  style={{ marginLeft: 8 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>

      {player && feed.episode != null ? (
        <View className="absolute justify-center items-center top-1/2 left-1/3">
          <View className="flex flex-row gap-4 justify-center items-center">
            <TouchableOpacity
              className="  bg-neutral-800/60 rounded-full w-16 h-16 justify-center items-center"
              style={{
                transform: [{ translateX: -40 }, { translateY: -40 }],
              }}
              onPress={() => handleFowardBackward(-5)}
            >
              <AntDesign name="banckward" size={20} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              className="  bg-neutral-800/60 rounded-full w-20 h-20 justify-center items-center"
              style={{
                transform: [{ translateX: -40 }, { translateY: -40 }],
              }}
              onPress={() => handlePlayPause()}
            >
              <MaterialIcons
                name={isPlaying ? "pause" : "play-arrow"}
                size={40}
                color="#fff"
              />
            </TouchableOpacity>

            <TouchableOpacity
              className="  bg-neutral-800/60 rounded-full w-16 h-16 justify-center items-center"
              style={{
                transform: [{ translateX: -40 }, { translateY: -40 }],
              }}
              onPress={() => handleFowardBackward(5)}
            >
              <AntDesign name="forward" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
        </>
      )}
    </View>
        <Loader visible={loading} />
      </>
  );
};

export default FeedCard;
