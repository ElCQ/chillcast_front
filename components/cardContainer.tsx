import { getDarkerColor } from '@/utils/colorUtils';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import PodcastCard from './cards/podcastCard';

const CardContainer = ({
  nombre,
  color,
  datos,
  loading,
  error,
}: {
  nombre: string;
  color?: string;
  datos?: any[] | null;
  loading: boolean;
  error: Error | null;
}) => {
  //bg-[#151515]

  if (!color) {
    color = "#151515";
  }

  const darkerColor = getDarkerColor(color, 0.1);

  return (
    <LinearGradient
      colors={[color, darkerColor, color]}
      className="w-full py-6 px-3 mb-6"
    >
      <Text className="text-white text-2xl font-bold">{nombre}</Text>
      <View className="py-3">
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : error ? (
          <Text className="text-red-400">{error.message}</Text>
        ) : (
            <FlatList
                data={datos}
                keyExtractor={(item, index) => item._id || index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                <View className="mr-2">
                    <PodcastCard data={item} />
                </View>
                )}
            />
        )}
      </View>
    </LinearGradient>
  );
};

export default CardContainer;