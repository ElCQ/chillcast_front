"use client";
import SearchBar from "@/components/SearchBar";
import ReseñaCard from "@/components/cards/reseñaCard";
import FilterButton from "@/components/filterButton";
import { Podcast } from "@/interfaces/interfaces";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Reseñas = ({ data }: { data: Podcast }) => {
  const [search, setSearch] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [rating, setRating] = useState<number>(3);
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [orden, setOrden] = useState<"asc" | "desc" | "reciente" | "viejo" | null>(null);
  const [filtroTemporal, setFiltroTemporal] = useState<"asc" | "desc" | "reciente" | "viejo" | null>(null);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  // const { data: reseñas, loading, error: reseñasError } = useFetch(() =>
  //   fetchReviews({podcast: data._id})
  // );

  const reseñas = [
    { _id: "1", nombre: "Juan Pérez", valoracion: 4.7, texto: "Excelente podcast, lo escucho todos los días." },
    { _id: "2", nombre: "Ana Gómez", valoracion: 5, texto: "Muy recomendable, excelente contenido." },
    { _id: "3", nombre: "Carlos López", valoracion: 3.5, texto: "Está bien, pero podría mejorar." },
    { _id: "4", nombre: "Lucía Martínez", valoracion: 4.2, texto: "Me encanta la variedad de temas que abordan." },
    { _id: "5", nombre: "Pedro Sánchez", valoracion: 2.8, texto: "No es lo que esperaba, pero tiene potencial." },
    { _id: "6", nombre: "María Fernández", valoracion: 4.9, texto: "¡Uno de mis podcasts favoritos!" },
    { _id: "7", nombre: "Sofía Torres", valoracion: 3, texto: "Algunos episodios son muy buenos, otros no tanto." },
    { _id: "8", nombre: "Diego Ramírez", valoracion: 5, texto: "Contenido de calidad y muy entretenido." },
    { _id: "9", nombre: "Elena Ruiz", valoracion: 4.5, texto: "Siempre aprendo algo nuevo escuchando este podcast." },
    { _id: "10", nombre: "Miguel Ángel", valoracion: 2, texto: "No me atrapó, pero reconozco el esfuerzo." },
  ];

  const filteredReviews = reseñas
    .filter(
      (r) =>
        r.nombre.toLowerCase().includes(search.toLowerCase()) ||
        r.texto.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (orden === "asc") return a.valoracion - b.valoracion;
      if (orden === "desc") return b.valoracion - a.valoracion;
      if (orden === "reciente") return b._id.localeCompare(a._id);
      if (orden === "viejo") return a._id.localeCompare(b._id);
      return 0;
    });

  const toggleSection = (key: string) => {
    setExpandedSections(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const filterSections = [
    {
      title: "Ordenar Por",
      key: "ordenar",
      render: () =>
        ["Puntuación ↑", "Puntuación ↓", "Más reciente", "Más viejo"].map(option => (
          <TouchableOpacity
            key={option}
            onPress={() => {
              if (option === "Puntuación ↑") setFiltroTemporal("asc");
              else if (option === "Puntuación ↓") setFiltroTemporal("desc");
              else if (option === "Más reciente") setFiltroTemporal("reciente");
              else if (option === "Más viejo") setFiltroTemporal("viejo");
            }}
            className={`py-3 px-5 rounded-full mb-3 ${(option === "Puntuación ↑" && filtroTemporal === "asc") ||
                (option === "Puntuación ↓" && filtroTemporal === "desc") ||
                (option === "Más reciente" && filtroTemporal === "reciente") ||
                (option === "Más viejo" && filtroTemporal === "viejo")
                ? "bg-[#A259FF]"
                : "bg-[#2C2C2E]"
              }`}
          >
            <Text className="text-white text-base text-center">{option}</Text>
          </TouchableOpacity>
        )),
    },
  ];

  const handleSubmit = () => {
    if (comment.trim() === "") {
      setError(true);
    } else {
      setError(false);
      console.log("ID asociado:", data._id);
      console.log("Rating:", rating);
      console.log("Comentario:", comment);
      setComment("");
      setRating(3);
      setMostrarFormulario(false);
    }
  };

  const fechaActual = new Date().toLocaleDateString("es-ES");

  return (
    <View className="flex-1 px-3 gap-3">
      {mostrarFormulario ? (
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
            <View className="p-5">
              <Text className="text-gray-400 text-xs mb-5">
                Fecha de calificación: {fechaActual}
              </Text>
              <View className="flex-row items-center mb-1">
                <Text className="text-white text-base">Reseña</Text>
                {error && <Text className="text-red-500 text-base"> *</Text>}
              </View>
              <TextInput
                className="bg-[#2C2C2E] text-white p-4 rounded-xl min-h-[120px] border border-[#3A3A3C] mb-5"
                textAlignVertical="top"
                multiline
                placeholder="Escribe tu reseña aquí..."
                placeholderTextColor="#888"
                value={comment}
                onChangeText={text => {
                  setComment(text);
                  if (error) setError(false);
                }}
              />
              <View className="items-center mb-5">
                <View className="flex-row mb-1">
                  {[1, 2, 3, 4, 5].map(val => (
                    <TouchableOpacity key={val} onPress={() => setRating(val)}>
                      <Text
                        style={{
                          fontSize: 28,
                          color: val <= (rating ?? 0) ? "#facc15" : "#555",
                          marginHorizontal: 5,
                        }}
                      >
                        {val <= (rating ?? 0) ? "★" : "☆"}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <Text className="text-white text-base font-bold">{rating}/5</Text>
              </View>
            </View>
            {error && (
              <Text className="text-red-500 mt-2 mb-2 px-5">
                *El campo de reseña es obligatorio
              </Text>
            )}
            <TouchableOpacity
              className="bg-[#A259FF] py-3.5 rounded-full items-center mx-5 mb-5"
              onPress={handleSubmit}
            >
              <Text className="text-white font-bold text-base">Publicar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-[#2C2C2E] py-3.5 rounded-full items-center mx-5 mb-5 mt-2"
              onPress={() => setMostrarFormulario(false)}
            >
              <Text className="text-white font-bold text-base">Cancelar</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      ) : (
        <>
          <SearchBar placeholder="Buscar reseñas..." onSubmit={value => setSearch(value)} />
          <View className="flex-row justify-between items-center mb-5">
            <FilterButton
              onPress={() => {
                setFiltroTemporal(orden);
                setExpandedSections(["ordenar"]);
                setMostrarFiltros(true);
              }}
            />
            <TouchableOpacity
              className="border border-[#A259FF] rounded-full py-2 px-3 items-center justify-center"
              onPress={() => setMostrarFormulario(true)}
            >
              <Text className="text-white text-sm font-bold">Escribir reseña</Text>
            </TouchableOpacity>
          </View>
          <ScrollView className="flex-1 pb-20">
            {filteredReviews.length > 0 ? (
              filteredReviews.map(r => (
                <View key={r._id}>
                  <ReseñaCard data={r} />
                </View>
              ))
            ) : (
              <Text className="text-white text-center mt-5">
                No se encontraron reseñas.
              </Text>
            )}
          </ScrollView>
        </>
      )}
      <Modal
        animationType="slide"
        transparent
        visible={mostrarFiltros}
        onRequestClose={() => setMostrarFiltros(false)}
      >
        <View className="flex-1 justify-end bg-black/60">
          <View className="bg-[#1C1C1E] rounded-t-3xl px-6 pt-4 pb-4 h-[45%]">
            <View className="items-center mb-4">
              <View className="w-14 h-1.5 bg-gray-500 rounded-full" />
            </View>
            <ScrollView contentContainerStyle={{ paddingBottom: 0 }} showsVerticalScrollIndicator={false}>
              {filterSections.map(section => {
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
                onPress={() => setMostrarFiltros(false)}
                className="w-[48%] bg-[#2C2C2E] py-3 rounded-full items-center"
              >
                <Text className="text-white font-semibold">Cerrar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setOrden(filtroTemporal);
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

export default Reseñas;
