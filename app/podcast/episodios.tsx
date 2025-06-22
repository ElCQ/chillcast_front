import EpisodioCard from "@/components/cards/episodioCard";
import FilterButton from "@/components/filterButton";
import SearchBar from "@/components/SearchBar";
import { Podcast } from "@/interfaces/interfaces";
import { fetchEpisodesFromPodcast } from "@/services/chillastApi";
import useFetch from "@/services/useFetch";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Episodios = ({ dataPodcast }: { dataPodcast: Podcast }) => {
  const [search, setSearch] = useState<string>("");
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [tempOrden, setTempOrden] = useState<"asc" | "desc" | "reciente" | "viejo" | "valoracion_asc" | "valoracion_desc" | null>(null);
  const [orden, setOrden] = useState<"asc" | "desc" | "reciente" | "viejo" | "valoracion_asc" | "valoracion_desc" | null>(null);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const { data, loading, error } = useFetch(() =>
    fetchEpisodesFromPodcast({ id: dataPodcast.id ? dataPodcast.id : dataPodcast._id })
  );

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  console.log(dataPodcast.id);
  

  const toggleSection = (key: string) => {
    setExpandedSections((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const filterSections = [
    {
      title: "Ordenar Por",
      key: "ordenar",
      render: () =>
        [
          "Título A→Z",
          "Título Z→A",
          "Más reciente",
          "Más viejo",
          "Valoración ↑",
          "Valoración ↓",
        ].map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => {
              if (option === "Título A→Z") setTempOrden("asc");
              else if (option === "Título Z→A") setTempOrden("desc");
              else if (option === "Más reciente") setTempOrden("reciente");
              else if (option === "Más viejo") setTempOrden("viejo");
              else if (option === "Valoración ↑") setTempOrden("valoracion_asc");
              else if (option === "Valoración ↓") setTempOrden("valoracion_desc");
            }}
            className={`py-3 px-5 rounded-full mb-3 ${
              (option === "Título A→Z" && tempOrden === "asc") ||
              (option === "Título Z→A" && tempOrden === "desc") ||
              (option === "Más reciente" && tempOrden === "reciente") ||
              (option === "Más viejo" && tempOrden === "viejo") ||
              (option === "Valoración ↑" && tempOrden === "valoracion_asc") ||
              (option === "Valoración ↓" && tempOrden === "valoracion_desc")
                ? "bg-[#A259FF]"
                : "bg-[#2C2C2E]"
            }`}
          >
            <Text className="text-white text-base text-center">{option}</Text>
          </TouchableOpacity>
        )),
    },
  ];

  const sortedData = data
    ? [...data].sort((a, b) => {
        if (orden === "asc") return a.title.localeCompare(b.title);
        if (orden === "desc") return b.title.localeCompare(a.title);
        if (orden === "reciente")
          return (
            new Date(b.release_date).getTime() -
            new Date(a.release_date).getTime()
          );
        if (orden === "viejo")
          return (
            new Date(a.release_date).getTime() -
            new Date(b.release_date).getTime()
          );
        if (orden === "valoracion_asc") return a.rating - b.rating;
        if (orden === "valoracion_desc") return b.rating - a.rating;
        return 0;
      })
    : [];

  return (
    <View className="flex-1 px-3 gap-3">
      <SearchBar placeholder="Busca episodios" onSubmit={handleSearch} />
      <FilterButton
        onPress={() => {
          setExpandedSections(["ordenar"]);
          setMostrarFiltros(true);
        }}
      />
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
              ? sortedData.filter(
                  (episode) =>
                    episode.title.toLowerCase().includes(search.toLowerCase()) ||
                    (episode.description &&
                      episode.description.toLowerCase().includes(search.toLowerCase()))
                )
              : sortedData
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={mostrarFiltros}
        onRequestClose={() => setMostrarFiltros(false)}
      >
        <View className="flex-1 justify-end bg-black/60">
          <View className="bg-[#1C1C1E] rounded-t-3xl px-6 pt-4 pb-4 h-[45%]">
            <View className="items-center mb-4">
              <View className="w-14 h-1.5 bg-gray-500 rounded-full" />
            </View>
            <ScrollView
              contentContainerStyle={{ paddingBottom: 0 }}
              showsVerticalScrollIndicator={false}
            >
              {filterSections.map((section) => {
                const isExpanded = expandedSections.includes(section.key);
                return (
                  <View key={section.key} className="mb-4">
                    <TouchableOpacity onPress={() => toggleSection(section.key)}>
                      <Text className="text-white text-xl font-semibold mb-1">
                        {section.title}
                      </Text>
                    </TouchableOpacity>
                    {isExpanded && <View className="mt-2">{section.render()}</View>}
                  </View>
                );
              })}
            </ScrollView>
            <View className="mt-4 flex-row justify-between">
              <TouchableOpacity
                onPress={() => {
                  setMostrarFiltros(false);
                }}
                className="w-[48%] bg-[#2C2C2E] py-3 rounded-full items-center"
              >
                <Text className="text-white font-semibold">Cerrar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setOrden(tempOrden!);
                  setMostrarFiltros(false);
                }}
                className="w-[48%] bg-[#A259FF] py-3 rounded-full items-center"
              >
                <Text className="text-white font-semibold">Aplicar Filtros</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Episodios;
