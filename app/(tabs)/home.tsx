import CardContainer from "@/components/cardContainer";
import SearchBar from "@/components/SearchBar";
import { Podcast, User } from "@/interfaces/interfaces";
import { fetchRecommendations, fetchUserData } from "@/services/chillastApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  ScrollView,
  Text,
  View,
} from "react-native";

const Home = () => {
  const router = useRouter();

  const [userData, setUserData] = useState<User | null>(null);
  const [podcasts1, setPodcasts1] = useState<Podcast[] | null>(null);
  const [podcasts2, setPodcasts2] = useState<Podcast[] | null>(null);
  const [podcasts3, setPodcasts3] = useState<Podcast[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);


  const fetchAll = async (setState: React.Dispatch<React.SetStateAction<Podcast[] | null>>) => {
    setLoading(true);
    setError(null);
    try {
      const usuarioStr = await AsyncStorage.getItem("usuario");
      const usuario = usuarioStr ? JSON.parse(usuarioStr) : null;
      if (!usuario?.username) throw new Error("No username found");

      const user = await fetchUserData({ username: usuario.username });
      setUserData(user);

      console.log(user.username, user.email);


      const podcastsData = await fetchRecommendations({
        username: user.username,
        email: user.email
      });
      setState(podcastsData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("error"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll(setPodcasts1);
    fetchAll(setPodcasts2);
    fetchAll(setPodcasts3);
  }, [])


  return (
    <View className="bg-[#282828] flex-1 items-center justify-start gap-5 pt-10">
      <View className="px-6 w-full items-center justify-between gap-5">
        <Text className="text-white text-2xl font-bold ">Home</Text>
        <SearchBar
          placeholder="Buscar"
          onPress={() => router.push("/search")}
        />
      </View>

      <ScrollView className="w-full h-full p-0">
        <View className="gap-5 pb-10">
          {loading ? (
            <View className="flex-1 items-center justify-center bg-[#282828]">
              <ActivityIndicator size="large" color="#fff" />
            </View>
          ) : error ? (
            <Text className="text-red-400 text-center mt-10">
              {error.message}
            </Text>
          ) : (
            <>
              <CardContainer
                datos={podcasts1}
                loading={loading}
                error={error}
                nombre="Recomendaciones del dia"
              />
              <CardContainer
                datos={podcasts2}
                loading={loading}
                error={error}
                nombre="Según tus gustos"
                color="#5C0055"
              />
              <CardContainer
                datos={podcasts3}
                loading={loading}
                error={error}
                nombre="Escuchar algo nuevo"
                color="#073120"
              />
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
export default function HomeScreen() {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // No hace nada
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => backHandler.remove();
    }, [])
  );

  return <Home />;
}
