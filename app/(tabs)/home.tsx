import CardContainer from "@/components/cardContainer";
import SearchBar from "@/components/SearchBar";
import { fetchPodcastsFilters } from "@/services/chillastApi";
import useFetch from "@/services/useFetch";
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, BackHandler, ScrollView, Text, View } from "react-native";

const Home = () => {
  const router = useRouter();

  const { data, loading, error } = useFetch(() =>
    fetchPodcastsFilters({ genero: "Cultura y Sociedad" })
  );

  const firstTen = data?.slice(0, 10);
  const firstTen2 = data?.slice(10, 20);
  const firstTen3 = data?.slice(20, 30);


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
                datos={firstTen}
                loading={loading}
                error={error}
                nombre="Recomendaciones del dia"
              />
              <CardContainer
                datos={firstTen2}
                loading={loading}
                error={error}
                nombre="Según tus gustos"
                color="#5C0055"
              />
              <CardContainer
                datos={firstTen3}
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
                'hardwareBackPress',
                onBackPress
            );

            return () => backHandler.remove();
        }, [])
    );

    return <Home />;
}

