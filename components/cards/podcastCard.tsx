import { Podcast } from '@/interfaces/interfaces';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import React from 'react';
import { ImageBackground, Text, TouchableOpacity } from 'react-native';
import { StarRatingTextSm } from '../starRatingText';

const PodcastCard = ({ data }: { data?: Podcast }) => {

    return (
      <Link href={`/podcast/${data?.id ? data.id : data?._id}`} asChild>
        <TouchableOpacity className="mr-2 h-[280px] w-[180px] bg-gray-600 rounded-lg overflow-hidden">
          <ImageBackground
            source={{uri: data?.image || 'https://via.placeholder.com/180x280'}}
            
            className="w-full h-full justify-end items-center"
            resizeMode="cover"
          >
            <LinearGradient
              colors={["transparent", "rgba(0, 0, 0, 0.8)"]}
              className="rounded-lg pb-2 pl-2 w-full h-full justify-end items-start"
            >
              <StarRatingTextSm rating={3.8} />

              <Text
                className="text-white text-lg font-bold max-w-[130px]"
                style={{
                  textShadowColor: "#000",
                  textShadowOffset: { width: 0, height: 2 },
                  textShadowRadius: 6,
                }}
              >
                {data?.title || "Podcast"}
              </Text>

              <Text className="text-[#CDCDCD]" numberOfLines={3}>
                {data?.description ||
                  "descripción"}
              </Text>
            </LinearGradient>
          </ImageBackground>
        </TouchableOpacity>
      </Link>
    );
}

export default PodcastCard