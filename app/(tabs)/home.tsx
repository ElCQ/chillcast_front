import CardContainer from "@/components/cardContainer";
import SearchBar from "@/components/SearchBar";
import { fetchPodcasts } from "@/services/chillastApi";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, ScrollView, Text, View, BackHandler } from "react-native";
import ExitApp from 'react-native-exit-app';
import { useFocusEffect } from '@react-navigation/native';

const Home = () => {
    const router = useRouter();
    const { data, loading, error } = useFetch(() => fetchPodcasts({ query: "podcast" }));
    const firstTen = data?.slice(0, 10);

    return (
        <View className="bg-[#282828] flex-1 items-center justify-start gap-5 pt-10">
            <View className="px-6 w-full items-center justify-between gap-5">
                <Text className="text-white text-2xl font-bold font-inter">Home</Text>
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
                                nombre="Recomendaciones del día"
                                loading={loading}
                                error={error}
                            />
                            <CardContainer
                                datos={firstTen}
                                nombre="Según tus gustos"
                                color="#5C0055"
                                loading={loading}
                                error={error}
                            />
                            <CardContainer
                                datos={firstTen}
                                nombre="Escuchar algo nuevo"
                                color="#073120"
                                loading={loading}
                                error={error}
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
                ExitApp.exitApp();
                return true;
            };

            const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => backHandler.remove();
        }, [])
    );

    return <Home />;
}

