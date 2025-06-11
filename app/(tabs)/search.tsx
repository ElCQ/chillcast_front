"use client";
import PodcastCard from '@/components/cards/podcastCard';
import FilterButton from '@/components/filterButton';
import FilterTabs from '@/components/filterTabs';
import SearchBar from '@/components/SearchBar';
import { Podcast } from '@/interfaces/interfaces';
import { fetchPodcasts, fetchPodcastsFilters } from '@/services/chillastApi';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const Search = () => {
  const params = useLocalSearchParams();

  const [data, setData] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [sortOption, setSortOption] = useState("Orden: Alfabético");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const [rating, setRating] = useState<number | null>(null);
  const [providers, setProviders] = useState<string[]>([]);
  const [userRated, setUserRated] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [releaseDate, setReleaseDate] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [language, setLanguage] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);

  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const tabs = ["Podcasts", "Episodios"];
  const [activeTab, setActiveTab] = useState("Podcasts");

  const [search, setSearch] = useState<string>("");
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const parseArray = (value: string | string[] | undefined): string[] => {
      if (Array.isArray(value)) return value;
      if (typeof value === "string") return value.split(",");
      return [];
    };

    const parseNumber = (
      value: string | string[] | undefined
    ): number | null => {
      const num = Array.isArray(value)
        ? parseFloat(value[0])
        : parseFloat(value ?? "");
      return isNaN(num) ? null : num;
    };

    setRating(parseNumber(params.rating));
    setProviders(parseArray(params.providers));
    setUserRated(
      typeof params.userRated === "string" ? params.userRated : null
    );
    setCategories(parseArray(params.categories));
    setReleaseDate(
      typeof params.releaseDate === "string" ? params.releaseDate : null
    );
    setCountry(typeof params.country === "string" ? params.country : null);
    setLanguage(typeof params.language === "string" ? params.language : null);
    setDuration(typeof params.duration === "string" ? params.duration : null);
  }, []);

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  }, [search]);

  const buildFilters = () => ({
    title: search || undefined,
    rating: rating || undefined,
    source: providers.length > 0 ? providers.join(",") : undefined,
    autores: userRated || undefined,
    genero: categories.length > 0 ? categories.join(",") : undefined,
    releaseDate: releaseDate || undefined,
    country: country || undefined,
    language: language || undefined,
    duracion: duration || undefined,
    // Add more if needed
  });

  const handleApplyFilters = async () => {
    setLoading(true);
    setModalVisible(false);
    setError(null);
    try {
      const filters = buildFilters();
      const filtered = await fetchPodcastsFilters(filters);
      setData(filtered);
    } catch (e) {
      setError(e as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchPodcasts({ query: "podcast" })
      .then((res) => setData(res))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  const toggleSection = (key: string) => {
    setExpandedSections((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const toggleMultipleSelect = (
    list: string[],
    item: string,
    setter: (val: string[]) => void
  ) => {
    if (list.includes(item)) {
      setter(list.filter((i) => i !== item));
    } else {
      setter([...list, item]);
    }
  };


  const SORT_OPTIONS = [
    { nombre: "Alfabéticamente", valor: "Orden: Alfabético" },
    { nombre: "Duración", valor: "Orden: Duración" },
    { nombre: "Puntuación", valor: "Orden: Puntuación" },
  ];

  const PROVIDER_OPTIONS = [
    { nombre: "Spotify", valor: "Spotify" },
    { nombre: "Apple", valor: "Apple" },
    { nombre: "YouTube", valor: "YouTube" },
    { nombre: "Otros", valor: "Otros" },
  ];

  const USER_RATED_OPTIONS = [
    { nombre: "Incluir", valor: "Incluir" },
    { nombre: "No incluir", valor: "No incluir" },
  ];

  const CATEGORY_OPTIONS = [
    { nombre: "Noticias", valor: "Noticias" },
    { nombre: "Politica", valor: "Politica" },
    { nombre: "Economia", valor: "Economia" },
    { nombre: "Comedia", valor: "Comedia" },
    { nombre: "Educativo", valor: "Educativo" },
    { nombre: "Idiomas", valor: "Idiomas" },
    { nombre: "Ciencias", valor: "Ciencias" },
    { nombre: "Historia", valor: "Historia" },
    { nombre: "Psicología", valor: "Psicología" },
    { nombre: "Tecnología", valor: "Tecnología" },
    { nombre: "Cultura y sociedad", valor: "Cultura y sociedad" },
    { nombre: "Salud y bienestar", valor: "Salud y bienestar" },
    { nombre: "Negocios", valor: "Negocios" },
    { nombre: "Cine y TV", valor: "Cine y TV" },
    { nombre: "Música", valor: "Música" },
    { nombre: "Deportes", valor: "Deportes" },
    { nombre: "Crímenes reales", valor: "Crímenes reales" },
    { nombre: "Terror y Suspenso", valor: "Terror y Suspenso" },
    { nombre: "Ficción", valor: "Ficción" },
  ];

  const RELEASE_DATE_OPTIONS = [
    { nombre: "Últimas 24 horas", valor: "Últimas 24 horas" },
    { nombre: "Últimos 3 días", valor: "Últimos 3 días" },
    { nombre: "Última semana", valor: "Última semana" },
    { nombre: "Último mes", valor: "Último mes" },
    { nombre: "Últimos 3 meses", valor: "Últimos 3 meses" },
    { nombre: "Último Año", valor: "Último Año" },
  ];

  const COUNTRY_OPTIONS = [
    { nombre: "Argentina", valor: "Argentina" },
    { nombre: "México", valor: "México" },
    { nombre: "Chile", valor: "Chile" },
  ];

  const LANGUAGE_OPTIONS = [
    { nombre: "Español", valor: "Español" },
    { nombre: "Inglés", valor: "Inglés" },
    { nombre: "Portugués", valor: "Portugués" },
  ];

  const DURATION_OPTIONS = [
    { nombre: "1 a 5 minutos", valor: "5" },
    { nombre: "5 a 10 minutos", valor: "10" },
    { nombre: "10 a 30 minutos", valor: "30" },
    { nombre: "30 a 60 minutos", valor: "60" },
    { nombre: "Más de una hora", valor: "100" },
  ];

  const filterSections = [
    {
      title: "Ordenar Por",
      key: "ordenar",
      render: () =>
        SORT_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.valor}
            onPress={() => setSortOption(option.valor)}
            className={`py-2 px-4 rounded mt-1 ${
              sortOption === option.valor ? "bg-purple-600" : "bg-[#1f1f1f]"
            }`}
          >
            <Text className="text-white capitalize">{option.nombre}</Text>
          </TouchableOpacity>
        )),
    },
    {
      title: "Calificación Promedio",
      key: "rating",
      render: () => (
        <View style={{ flexDirection: "row", gap: 8 }}>
          {[1, 2, 3, 4, 5].map((val) => (
            <TouchableOpacity key={val} onPress={() => setRating(val)}>
              <Text
                style={{
                  fontSize: 28,
                  color: val <= (rating ?? 0) ? "#facc15" : "#555",
                }}
              >
                {val <= (rating ?? 0) ? "★" : "☆"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ),
    },
    {
      title: "Proveedor",
      key: "providers",
      render: () =>
        PROVIDER_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.valor}
            onPress={() =>
              toggleMultipleSelect(providers, option.valor, setProviders)
            }
            className={`py-2 px-4 rounded mt-1 ${
              providers.includes(option.valor)
                ? "bg-purple-600"
                : "bg-[#1f1f1f]"
            }`}
          >
            <Text className="text-white">{option.nombre}</Text>
          </TouchableOpacity>
        )),
    },
    {
      title: "Calificado por mí",
      key: "userRated",
      render: () =>
        USER_RATED_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.valor}
            onPress={() => setUserRated(option.valor)}
            className={`py-2 px-4 rounded mt-1 ${
              userRated === option.valor ? "bg-purple-600" : "bg-[#1f1f1f]"
            }`}
          >
            <Text className="text-white">{option.nombre}</Text>
          </TouchableOpacity>
        )),
    },
    {
      title: "Categoría",
      key: "categories",
      render: () =>
        CATEGORY_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.valor}
            onPress={() =>
              toggleMultipleSelect(categories, option.valor, setCategories)
            }
            className={`py-2 px-4 rounded mt-1 ${
              categories.includes(option.valor)
                ? "bg-purple-600"
                : "bg-[#1f1f1f]"
            }`}
          >
            <Text className="text-white">{option.nombre}</Text>
          </TouchableOpacity>
        )),
    },
    {
      title: "Fecha de Lanzamiento",
      key: "fecha",
      render: () =>
        RELEASE_DATE_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.valor}
            onPress={() => setReleaseDate(option.valor)}
            className={`py-2 px-4 rounded mt-1 ${
              releaseDate === option.valor ? "bg-purple-600" : "bg-[#1f1f1f]"
            }`}
          >
            <Text className="text-white">{option.nombre}</Text>
          </TouchableOpacity>
        )),
    },
    {
      title: "País Disponible",
      key: "pais",
      render: () =>
        COUNTRY_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.valor}
            onPress={() => setCountry(option.valor)}
            className={`py-2 px-4 rounded mt-1 ${
              country === option.valor ? "bg-purple-600" : "bg-[#1f1f1f]"
            }`}
          >
            <Text className="text-white">{option.nombre}</Text>
          </TouchableOpacity>
        )),
    },
    {
      title: "Idioma",
      key: "idioma",
      render: () =>
        LANGUAGE_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.valor}
            onPress={() => setLanguage(option.valor)}
            className={`py-2 px-4 rounded mt-1 ${
              language === option.valor ? "bg-purple-600" : "bg-[#1f1f1f]"
            }`}
          >
            <Text className="text-white">{option.nombre}</Text>
          </TouchableOpacity>
        )),
    },
    {
      title: "Duración",
      key: "duracion",
      render: () =>
        DURATION_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.valor}
            onPress={() => setDuration(option.valor)}
            className={`py-2 px-4 rounded mt-1 ${
              duration === option.valor ? "bg-purple-600" : "bg-[#1f1f1f]"
            }`}
          >
            <Text className="text-white">{option.nombre}</Text>
          </TouchableOpacity>
        )),
    },
  ];

  return (
    <View className="bg-[#282828] flex-1 items-center justify-start gap-3 pt-20">
      <View className="px-6 w-full items-center justify-between gap-5">
        <SearchBar placeholder="Buscar" onSubmit={handleSearch} />
      </View>

      <View className="w-full h-10 px-6 items-start justify-start">
        <FilterButton onPress={() => setModalVisible(true)} />
      </View>

      <View className="w-full h-fit px-6 items-start justify-start">
        <FilterTabs
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </View>

      <View className="w-full px-6 mt-2">
        <Text className="text-white font-bold text-base mb-2">
          Filtros aplicados:
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {sortOption && (
            <View className="bg-[#2e2e2e] px-3 py-1 rounded-full">
              <Text className="text-white text-sm">
                {sortOption === "DURATION" ? "Duración" : sortOption}
              </Text>
            </View>
          )}
          {rating !== null && (
            <View className="bg-[#2e2e2e] px-3 py-1 rounded-full">
              <Text className="text-white text-sm">
                Calificación: {rating} ★
              </Text>
            </View>
          )}
          {providers.length > 0 && (
            <View className="bg-[#2e2e2e] px-3 py-1 rounded-full">
              <Text className="text-white text-sm">
                Proveedores: {providers.join(", ")}
              </Text>
            </View>
          )}
          {userRated && (
            <View className="bg-[#2e2e2e] px-3 py-1 rounded-full">
              <Text className="text-white text-sm">Calificado por mí</Text>
            </View>
          )}
          {categories.length > 0 && (
            <View className="bg-[#2e2e2e] px-3 py-1 rounded-full">
              <Text className="text-white text-sm">
                Categorías: {categories.join(", ")}
              </Text>
            </View>
          )}
          {releaseDate && (
            <View className="bg-[#2e2e2e] px-3 py-1 rounded-full">
              <Text className="text-white text-sm">Fecha: {releaseDate}</Text>
            </View>
          )}
          {country && (
            <View className="bg-[#2e2e2e] px-3 py-1 rounded-full">
              <Text className="text-white text-sm">País: {country}</Text>
            </View>
          )}
          {language && (
            <View className="bg-[#2e2e2e] px-3 py-1 rounded-full">
              <Text className="text-white text-sm">Idioma: {language}</Text>
            </View>
          )}
          {duration && (
            <View className="bg-[#2e2e2e] px-3 py-1 rounded-full">
              <Text className="text-white text-sm">Duración: {duration}</Text>
            </View>
          )}
        </View>
      </View>

      <View className="py-3">
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : error ? (
          <Text className="text-red-400">{error.message}</Text>
        ) : !data || data.length === 0 ? (
          <Text className="text-white">No hay resultados para tu búsqueda</Text>
        ) : (
          <FlatList
            ref={flatListRef}
            data={
              search
                ? data.filter(
                    (podcast) =>
                      podcast.title
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      (podcast.description &&
                        podcast.description
                          .toLowerCase()
                          .includes(search.toLowerCase()))
                  )
                : data
            }
            keyExtractor={(item, index) => item._id || index.toString()}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: "flex-start",
              alignItems: "center",
            }}
            contentContainerStyle={{ paddingBottom: 300, paddingTop: 10 }}
            renderItem={({ item }) => (
              <View>
                <PodcastCard data={item} />
              </View>
            )}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text className="text-white text-center">
                No hay resultados para tu búsqueda
              </Text>
            }
          />
        )}
      </View>

      {/* MODAL DE FILTROS */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              backgroundColor: "#121212",
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              maxHeight: "90%",
            }}
          >
            <View
              style={{
                padding: 16,
                borderBottomWidth: 1,
                borderBottomColor: "#333",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={{ width: 50 }}>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={{ color: "white", fontSize: 18 }}>{"<"}</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text
                  style={{ color: "white", fontSize: 18, fontWeight: "bold" }}
                >
                  Filtros
                </Text>
              </View>
              <View style={{ width: 50 }} />
            </View>

            <ScrollView
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 32,
              }}
              showsVerticalScrollIndicator={true}
            >
              {filterSections.map((section) => {
                const isExpanded = expandedSections.includes(section.key);
                return (
                  <View key={section.key} style={{ marginTop: 24 }}>
                    <TouchableOpacity
                      onPress={() => toggleSection(section.key)}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        {section.title}
                      </Text>
                      <Text style={{ color: "white", fontSize: 20 }}>
                        {isExpanded ? "˄" : ">"}
                      </Text>
                    </TouchableOpacity>

                    {isExpanded && (
                      <View style={{ marginTop: 8 }}>{section.render()}</View>
                    )}
                  </View>
                );
              })}

              {/* Botones */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 32,
                  gap: 8,
                }}
              >
                <TouchableOpacity
                  onPress={handleApplyFilters}
                  style={{
                    flex: 1,
                    backgroundColor: "#7c3aed",
                    padding: 12,
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Aplicar
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setSortOption("Orden: Alfabético");
                    setSelectedGenre(null);
                    setRating(null);
                    setProviders([]);
                    setUserRated(null);
                    setCategories([]);
                    setReleaseDate(null);
                    setCountry(null);
                    setLanguage(null);
                    setDuration(null);
                    setExpandedSections([]);
                  }}
                  style={{
                    flex: 1,
                    backgroundColor: "#333",
                    padding: 12,
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Restablecer
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default Search
