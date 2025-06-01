import EpisodioCard from "@/components/cards/episodioCard";
import FilterButton from "@/components/filterButton";
import SearchBar from "@/components/SearchBar";
import { Podcast } from "@/interfaces/interfaces";
import { fetchEpisodes } from "@/services/chillastApi";
import useFetch from "@/services/useFetch";
import { useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

const Episodios = ({ dataPodcast }: { dataPodcast: Podcast }) => {
  const [search, setSearch] = useState<string>("");

  const { data, loading, error } = useFetch(() =>
    fetchEpisodes({ id: dataPodcast._id })
  );

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  return (
    <View className="flex-1 px-3 gap-3">
      <SearchBar placeholder="Busca episodios" onSubmit={handleSearch} />
      <FilterButton onPress={() => {}} />

      {loading ? (
        <View className="flex-1 items-center justify-center bg-[#282828]">
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : error ? (
        <View className="flex-1 items-center justify-center bg-[#282828]">
          <Text className="text-red-400 text-lg">{error.message}</Text>
        </View>
      ) : !data || data.length === 0 ? (
        <View className="flex-1 items-center justify-center bg-[#282828]">
          <Text className="text-white">No hay episodios disponibles</Text>
        </View>
      ) : (
        <FlatList
          data={
            search
              ? data.filter(
                  (episode) =>
                    episode.title
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    (episode.description &&
                      episode.description
                        .toLowerCase()
                        .includes(search.toLowerCase()))
                )
              : data
          }
          keyExtractor={(item) => item._id}
          renderItem={({ item: episode }) => <EpisodioCard episode={episode} />}
          contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text className="text-white text-center">
              No hay resultados para tu búsqueda
            </Text>
          }
        />
      )}
    </View>
  );
};

export default Episodios;
