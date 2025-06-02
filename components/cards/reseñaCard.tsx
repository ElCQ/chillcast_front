import { Icons } from '@/constants/icons';
import { Reseña } from '@/interfaces/interfaces';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
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
      <View className="flex-row justify-end">
        <TouchableOpacity className="mr-4">
          <Image
            className="size-6"
            style={{ tintColor: "#797979" }}
            source={Icons.ThumbsUpIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            className="size-6"
            style={{ tintColor: "#797979" }}
            source={Icons.ThumbsDownIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ReseñaCard