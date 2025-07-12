import { Reseña } from '@/interfaces/interfaces';
import React from 'react';
import { Text, View } from 'react-native';
import { StarRatingTextSm } from '../starRatingText';

const ReseñaCard = ({data}: {data: Reseña}) => {
  return (
    <View key={data._id} className="bg-[#1E1E1E] rounded-xl p-4 mb-4">
      <View className="flex-row items-center mb-2">
        <View className="w-10 h-10 bg-[#555] rounded-full mr-2.5" />
        <View className="flex-1 flex-row gap-3">
          <Text className="text-white font-bold text-lg">{data.nombre}</Text>
          <StarRatingTextSm rating={data.valoracion} />
        </View>
      </View>
      <Text className="text-gray-300 my-2.5 text-sm">{data.texto}</Text>
    </View>
  );
}

export default ReseñaCard