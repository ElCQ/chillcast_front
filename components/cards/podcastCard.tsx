import { Podcast } from '@/interfaces/interfaces';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { StarRatingTextSm } from '../starRatingText';

const PodcastCard = ({ data }: { data?: Podcast }) => {
    const id = '1234567890';

    return (
        <Link href={`/podcast/${id}`} asChild>
            <TouchableOpacity className='mr-2 h-[280px] w-[180px] bg-gray-600 rounded-lg overflow-hidden'>
                <ImageBackground
                    source={require('../../assets/images/podcastImage.png')}
                    className='w-full h-full justify-end items-center'
                    resizeMode='cover'
                >
                    <LinearGradient
                        colors={['transparent', 'rgba(0, 0, 0, 0.8)']} 
                        className='rounded-lg p-2 h-full justify-end' >
                        <View className='flex-row justify-between '>
                            <Text
                                className='text-white text-lg font-bold'
                                style={{
                                    textShadowColor: '#000',
                                    textShadowOffset: { width: 0, height: 2 },
                                    textShadowRadius: 6,
                                }}
                            >
                                PodCastCard
                            </Text>
                            <StarRatingTextSm rating={3.8} />
                        </View>


                        <Text className='text-[#CDCDCD]' numberOfLines={3}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </Text>
                    </LinearGradient>

                </ImageBackground>
            </TouchableOpacity>
        </Link>
    )
}

export default PodcastCard