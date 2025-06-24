import AddButton from "@/components/buttons/addButton";
import BackButton from "@/components/buttons/backButton";
import FilterTabs from "@/components/filterTabs";
import { StarRatingTextLg } from "@/components/starRatingText";
import { Icons } from "@/constants/icons";
import { fetchAddFavorite, fetchUniquePodcast, fetchListas, fetchAddPodcastALista,fetchAddPodcastAHistorial } from "@/services/chillastApi";
import useFetch from "@/services/useFetch";
import { hexToRgba } from "@/utils/colorUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import { ActivityIndicator, Image, ImageBackground, Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import Episodios from "./episodios";
import Informacion from "./informacion";
import Reseñas from "./reseñas";

const SpotifyLogo = require("../../assets/images/spotifyLogo.png");

const Podcasts = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [listasUsuario, setListasUsuario] = useState([]);
  const [username, setUsername] = useState<string | null>(null);

  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState("Información");
  const tabs = ["Información", "Episodios", "Reseñas"];

  const { data, loading, error } = useFetch(() => fetchUniquePodcast({ id }));

  useEffect(() => {
    const loadUserData = async () => {
      const usuarioStr = await AsyncStorage.getItem("usuario");
      if (!usuarioStr) return;

      const usuario = JSON.parse(usuarioStr);
      if (!usuario?.username) return;

      setUsername(usuario.username);
      try {
        const listas = await fetchListas(usuario.username);
        setListasUsuario(listas);
      } catch (err) {
        console.error("Error cargando listas del usuario", err);
      }
    };

    loadUserData();
  }, []);

  useEffect(() => {
    const checkIfFavorite = async () => {
      try {
        const favoritePodcasts = await AsyncStorage.getItem("favorites");
        if (favoritePodcasts) {
          const parsedFavorites = JSON.parse(favoritePodcasts);
          const isInFavorites = parsedFavorites.some((podcast) => podcast.id === data.id);
          setIsFavorite(isInFavorites);
        }
      } catch (err) {
        console.error("Error checking favorites:", err);
      }
    };

    if (data) {
      checkIfFavorite();
    }
  }, [data]);

  const handleAddToFavorites = async () => {
    try {
      if (!username) throw new Error("No se encontró usuario autenticado");

      const podcastId = Array.isArray(id) ? id[0] : id;
      const favoritePodcastsStr = await AsyncStorage.getItem("favorites");
      let favoritePodcasts = favoritePodcastsStr ? JSON.parse(favoritePodcastsStr) : [];

      if (isFavorite) {
        favoritePodcasts = favoritePodcasts.filter((podcast) => podcast.id !== data.id);
        setIsFavorite(false);
        Toast.show({
          type: "success",
          text1: "¡Éxito!",
          text2: "Podcast eliminado de favoritos",
        });
      } else {
        favoritePodcasts.push({ id: data.id, title: data.title });
        setIsFavorite(true);
        Toast.show({
          type: "success",
          text1: "¡Éxito!",
          text2: "Podcast añadido a favoritos",
        });
      }

      await AsyncStorage.setItem("favorites", JSON.stringify(favoritePodcasts));

      await fetchAddFavorite({
        username,
        podcastId,
      });
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: err instanceof Error ? err.message : "Error al actualizar favoritos",
      });
    }
  };

  const handleAñadirALista = async (listaId: string) => {
    if (!username) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No se encontró usuario para añadir a lista",
      });
      return;
    }
    try {
      const podcastId = Array.isArray(id) ? id[0] : id;
      await fetchAddPodcastALista({ username, listaId, podcastId });
      Toast.show({
        type: "success",
        text1: "¡Éxito!",
        text2: "Podcast añadido a la lista",
      });
      setModalVisible(false);
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: err instanceof Error ? err.message : "No se pudo añadir el podcast a la lista",
      });
    }
  };

  const handleMarkAsSeen = async () => {
    try {
      const usuarioStr = await AsyncStorage.getItem("usuario");
      if (!usuarioStr) throw new Error("No se encontró el usuario");

      const usuario = JSON.parse(usuarioStr);
      if (!usuario.username || !usuario.email) throw new Error("Usuario inválido");

      const podcastId = Array.isArray(id) ? id[0] : id;

      await fetchAddPodcastAHistorial({
        username: usuario.username,
        email: usuario.email,
        podcastId,
      });

      Toast.show({
        type: "success",
        text1: "Podcast marcado como visto",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error al agregar al historial",
        text2: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  };


  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#282828]">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-[#282828]">
        <Text className="text-red-400 text-lg">{error.message}</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View className="flex-1 items-center justify-center bg-[#282828]">
        <Text className="text-red-400 text-lg">No se encontró el podcast</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-top bg-[#282828]">
      <ImageBackground
        source={{ uri: data?.image || "https://via.placeholder.com/180x280" }}
        className="w-full h-72 justify-end items-center"
        resizeMode="cover"
      >
        <LinearGradient
          colors={[
            hexToRgba("#282828", 0.4),
            hexToRgba("#282828", 0.4),
            "#282828",
          ]}
          className="rounded-lg px-5 pt-12 pb-8 w-full h-full justify-between gap-3"
        >
          <View className="gap-3">
            <BackButton />
            <View className="flex-row justify-between">
              <Text
                className="text-white text-3xl flex-1 font-semibold"
                style={{
                  textShadowColor: "#111",
                  textShadowOffset: { width: 0, height: 2 },
                  textShadowRadius: 10,
                }}
                numberOfLines={4}
              >
                {data?.title || "Podcast Title"}
              </Text>
              <StarRatingTextLg rating={3.8} />
            </View>
          </View>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center justify-start gap-5">
              <AddButton
                label={isFavorite ? "Eliminar de favoritos" : "Añadir a favoritos"}
                icon={Icons.CirclePlusIcon}
                onPress={handleAddToFavorites}
              />
              <AddButton
                label="Añadir a lista"
                icon={Icons.FolderPlusIcon}
                onPress={() => setModalVisible(true)}
              />
              <AddButton
                label="Visto"
                icon={Icons.EyeIcon}
                onPress={handleMarkAsSeen}
              />
            </View>
            {data.source === "Spotify" && (
              <Pressable>
                <Image source={SpotifyLogo} className="size-8" />
              </Pressable>
            )}
          </View>
        </LinearGradient>
      </ImageBackground>
      <View className="w-full h-fit px-6 my-2 items-start justify-start">
        <FilterTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      </View>
      <View className="flex-1 w-full">
        {activeTab === "Información" && <Informacion data={data} />}
        {activeTab === "Episodios" && <Episodios dataPodcast={data} />}
        {activeTab === "Reseñas" && <Reseñas data={data} />}
      </View>

      {/* Seleccionar lista */}
      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View style={{ flex:1, backgroundColor:'rgba(0,0,0,0.5)', justifyContent:'center', padding:20 }}>
          <View style={{ backgroundColor:'#2c2c2c', borderRadius: 10, padding: 20, maxHeight: '80%' }}>
            <Text style={{ color:'white', fontSize: 18, marginBottom: 10 }}>Selecciona una lista</Text>
            <ScrollView>
              {listasUsuario.length === 0 && (
                <Text style={{ color: 'white', fontSize: 16 }}>No tienes listas creadas.</Text>
              )}
              {listasUsuario.map((lista) => (
                <TouchableOpacity
                  key={lista._id}
                  onPress={() => handleAñadirALista(lista._id)}
                  style={{ paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#444' }}
                >
                  <Text style={{ color: 'white', fontSize: 16 }}>{lista.nombre}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginTop: 15, alignItems: 'center' }}>
              <Text style={{ color: '#A259FF', fontWeight: 'bold' }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Podcasts;
