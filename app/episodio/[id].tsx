import BackButton from '@/components/buttons/backButton';
import FilterTabs from '@/components/filterTabs';
import { StarRatingTextLg } from '@/components/starRatingText';
import { fetchEpisodeById } from '@/services/chillastApi';
import useFetch from '@/services/useFetch';
import { hexToRgba } from '@/utils/colorUtils';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Image, ImageBackground, Pressable, Text, View } from 'react-native';
import Informacion from './informacion';
import Reseñas from './reseñas';
const SpotifyLogo = require("../../assets/images/spotifyLogo.png");

const Episodio = () => {
    const { id } = useLocalSearchParams();
    const [activeTab, setActiveTab] = useState("Información");
    const tabs = ["Información", "Reseñas"];

    const { data, loading, error } = useFetch(() =>
      fetchEpisodeById({ id: id })
    );

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

            <View className="flex-row items-center justify-end">
              {/* <View className="flex-row items-center justify-start gap-5">
                <AddButton
                  label="Añadir a favoritos"
                  icon={Icons.CirclePlusIcon}
                  onPress={() => console.log("Añadido a favoritos")}
                />
                <AddButton
                  label="Añadir a lista"
                  icon={Icons.FolderPlusIcon}
                  onPress={() => console.log("Añadido a favoritos")}
                />
              </View> */}

              {"Spotify" === "Spotify" && (
                <Pressable>
                  <Image source={SpotifyLogo} className="size-8" />
                </Pressable>
              )}
            </View>
          </LinearGradient>
        </ImageBackground>

        <View className="w-full h-fit px-6 my-2 items-center justify-center">
          <FilterTabs
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </View>

        <View className="flex-1 w-full">
          {activeTab === "Información" && <Informacion data={data} />}
          {activeTab === "Reseñas" && <Reseñas data={data} />}
        </View>
      </View>
    ) : (
      <View className="flex-1 items-center justify-center bg-[#282828]">
        <Text className="text-red-400 text-lg">No se encontró el podcast</Text>
      </View>
    );
}

export default Episodio