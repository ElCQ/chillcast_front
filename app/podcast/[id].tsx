import AddButton from "@/components/buttons/addButton";
import BackButton from "@/components/buttons/backButton";
import FilterTabs from "@/components/filterTabs";
import { StarRatingTextLg } from "@/components/starRatingText";
import { Icons } from "@/constants/icons";
import { Lista, User } from "@/interfaces/interfaces";
import { fetchAddFavorite, fetchAddPodcastALista, fetchDeleteFavorite, fetchFavorites, fetchListas, fetchUniquePodcast, fetchUserData } from "@/services/chillastApi";
import useFetch from "@/services/useFetch";
import { hexToRgba } from "@/utils/colorUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ImageBackground, Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import Episodios from "./episodios";
import Informacion from "./informacion";
import Reseñas from "./reseñas";
const SpotifyLogo = require("../../assets/images/spotifyLogo.png");

const Podcasts = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [listasUsuario, setListasUsuario] = useState<Lista[]>([]);
  const [username, setUsername] = useState<string | null>(null);
  const [userData, setUserData] = useState<User | null>(null);

  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState("Información");
  const tabs = ["Información", "Episodios", "Reseñas"];

  console.log(id);
  

  const { data, loading, error } = useFetch(() =>
    fetchUniquePodcast({ id: id })
  );

  useEffect(() => {
    const loadUserData = async () => {
      const usuarioStr = await AsyncStorage.getItem("usuario");
      if (!usuarioStr) return;

      const usuario = JSON.parse(usuarioStr);
      if (!usuario?.username) return;

      setUsername(usuario.username);

      const user = await fetchUserData({ username: usuario.username });
      setUserData(user);

      try {
        const listas = await fetchListas(usuario.username);
        setListasUsuario(listas);

        const favoritos = await fetchFavorites(user.username);
        if (favoritos && data) {
          const isInFavorites = favoritos.some((podcast) => podcast._id === data.id);
          console.log(isInFavorites);
          console.log(favoritos);
          console.log(data.id);

          
          setIsFavorite(isInFavorites);
        }
      } catch (err) {
        console.error("Error cargando listas del usuario", err);
      }
    };

    loadUserData();
  }, [data]);

  const handleAddToFavorites = async () => {

    try {
      const usuarioStr = await AsyncStorage.getItem("usuario");
      const usuario = usuarioStr ? JSON.parse(usuarioStr) : null;

      if (!usuario || !usuario.username) {
        throw new Error("No estás autenticado");
      }

      if (isFavorite) {
        await fetchDeleteFavorite({
          username: usuario.username,
          podcastId: Array.isArray(id) ? id[0] : id,
        });

        setIsFavorite(false);
        Toast.show({
          type: "success",
          text1: "¡Éxito!",
          text2: "Podcast fue eliminado de favoritos",
        });
      } else {
        await fetchAddFavorite({
          username: usuario.username,
          podcastId: Array.isArray(id) ? id[0] : id,
        });

        setIsFavorite(true);
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

  return loading ? (
    <View className="flex-1 items-center justify-center bg-[#282828]">
      <ActivityIndicator size="large" color="#fff" />
    </View>
  ) : error ? (
    <View className="flex-1 items-center justify-center bg-[#282828]">
      <Text className="text-red-400 text-lg">{error.message}</Text>
    </View>
  ) : data ? (
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
          className="rounded-lg px-5 pt-12 pb-8 w-full h-full justify-between gap-3 "
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
        <FilterTabs
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </View>

      <View className="flex-1 w-full">
        {activeTab === "Información" && <Informacion data={data} />}
        {activeTab === "Episodios" && <Episodios dataPodcast={data} />}
        {activeTab === "Reseñas" && <Reseñas data={data} />}
      </View>

      {/* Seleccionar lista */}
      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 }}>
          <View style={{ backgroundColor: '#2c2c2c', borderRadius: 10, padding: 20, maxHeight: '80%' }}>
            <Text style={{ color: 'white', fontSize: 18, marginBottom: 10 }}>Selecciona una lista</Text>
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


  ) : (
    <View className="flex-1 items-center justify-center bg-[#282828]">
      <Text className="text-red-400 text-lg">No se encontró el podcast</Text>
    </View>
  );
};

export default Podcasts;
