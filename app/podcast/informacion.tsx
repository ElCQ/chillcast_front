import TagButton from "@/components/buttons/tagButton";
import ExpandableSection from "@/components/expandableSection";
import { Podcast } from "@/interfaces/interfaces";
import { useRouter } from "expo-router";
import { ScrollView } from "moti";
import React from "react";
import { Text, View } from "react-native";

const Informacion = ({ data }: { data: Podcast }) => {

  const router = useRouter();

  const GENRES = [
    "Noticias",
    "Politica",
    "Economia",
    "Comedia",
    "Educativo",
    "Idiomas",
    "Ciencias",
    "Historia",
    "Psicología",
    "Tecnología",
    "Cultura y sociedad",
    "Salud y bienestar",
    "Negocios",
    "Cine y TV",
    "Música",
    "Deportes",
    "Crímenes reales",
    "Terror y Suspenso",
    "Ficción",
  ];

  const handleTagSearch = (genero: string) => {
    const query = `categories=${genero}`;
    router.push(`/(tabs)/search?${query}`);
  }

  return (
    <ScrollView className="gap-2">
      <ExpandableSection titulo="Descripción">
        <Text className="text-white text-sm px-5 py-2">{data.description}</Text>
      </ExpandableSection>

      <ExpandableSection titulo="Hosts">
        <Text className="text-white text-sm px-5 py-2">{data.author}</Text>
      </ExpandableSection>

      <ExpandableSection titulo="Tags y Categorías">
        <View className="flex flex-row flex-wrap px-4 pt-5 pb-20">
          {GENRES.map((genre) => (
            <View key={genre}>
              <TagButton
                nombre={genre}
                onPress={() => handleTagSearch(genre)}
              />
            </View>
          ))}
        </View>
      </ExpandableSection>
    </ScrollView>
  );
};

export default Informacion;
