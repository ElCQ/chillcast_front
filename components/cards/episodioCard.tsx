import { Episode } from '@/interfaces/interfaces';
import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { StarRatingTextSm } from '../starRatingText';

const EpisodioCard = ({episode}: {episode: Episode}) => {
  return (
    <Link href={`/episodio/${episode._id}`} asChild>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {}}
        className="flex-row bg-[#393939] rounded-[18px] mb-3 items-center elevation-2 p-0 h-[100px] overflow-hidden"
      >
        <Image
          source={
            episode.image
              ? { uri: episode.image }
              : require("@/assets/images/podcastImage.png")
          }
          className="w-[100px] h-full rounded-tl-[18px] rounded-bl-[18px] bg-[#222]"
          resizeMode="cover"
        />
        <View className="flex-1 px-6 justify-start py-5 h-full">
          <View className="flex-row items-center justify-between mb-[2px]">
            <Text className="text-white font-bold text-lg" numberOfLines={1}>
              {episode.title}
            </Text>
            <StarRatingTextSm rating={3} />
          </View>
          <View className="flex-row items-center mb-1">
            <Text className="text-[#D0D0D0] text-sm" numberOfLines={1}>
              {episode.description || "Podcast"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

export default EpisodioCard