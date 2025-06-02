import SearchBar from "@/components/SearchBar";
import ReseñaCard from "@/components/cards/reseñaCard";
import FilterButton from "@/components/filterButton";
import { Episode } from "@/interfaces/interfaces";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Reseñas = ({ data }: { data: Episode }) => {
  const [search, setSearch] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [rating, setRating] = useState<number>(3);
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const reseñas = [
    {
      _id: "1",
      nombre: "Juan Pérez",
      valoracion: 4.7,
      texto: "Excelente podcast, lo escucho todos los días.",
    },
    {
      _id: "2",
      nombre: "Ana Gómez",
      valoracion: 5,
      texto: "Muy recomendable, excelente contenido.",
    },
    {
      _id: "3",
      nombre: "Carlos López",
      valoracion: 3.5,
      texto: "Está bien, pero podría mejorar.",
    },
    {
      _id: "4",
      nombre: "Carlos López",
      valoracion: 3.5,
      texto: "Está bien, pero podría mejorar.",
    },
  ];

  const filteredReviews = reseñas.filter(
    (r) =>
      r.nombre.toLowerCase().includes(search.toLowerCase()) ||
      r.texto.toLowerCase().includes(search.toLowerCase())
  );

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
                multiline
                placeholder="Escribe tu reseña aquí..."
                placeholderTextColor="#888"
                value={comment}
                onChangeText={(text) => {
                  setComment(text);
                  if (error) setError(false);
                }}
              />

              <View className="items-center mb-5">
                <View className="flex-row mb-1">
                  {[1, 2, 3, 4, 5].map((val) => (
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
                <Text className="text-white text-base font-bold">
                  {rating}/5
                </Text>
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
              className="bg-[#444] py-3.5 rounded-full items-center mx-5 mb-5 mt-2"
              onPress={() => setMostrarFormulario(false)}
            >
              <Text className="text-white font-bold text-base">Cancelar</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      ) : (
        <>
          <SearchBar
            placeholder="Buscar reseñas..."
            onSubmit={(value) => setSearch(value)}
          />

          <View className="flex-row justify-between items-center mb-5">
            <FilterButton onPress={() => console.log("Ordenar/Filtrar")} />
            <TouchableOpacity
              className="border border-[#A259FF] rounded-full py-2 px-3 items-center justify-center"
              onPress={() => setMostrarFormulario(true)}
            >
              <Text className="text-white text-sm font-bold">
                Escribir reseña
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView className="flex-1 pb-20">
            {filteredReviews.length > 0 ? (
              filteredReviews.map((r) => (
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
    </View>
  );
};

export default Reseñas;
