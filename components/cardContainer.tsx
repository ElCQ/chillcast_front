import { Podcast } from '@/interfaces/interfaces';
import { getDarkerColor } from '@/utils/colorUtils';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import PodcastCard from './cards/podcastCard';

const CardContainer = ({ nombre, color, datos }: { nombre: string, color?: string, datos?: Podcast[]}) => {
    //bg-[#151515]

    if (!color) {
        color = '#151515';
    }

    const darkerColor = getDarkerColor(color, 0.1);

    return (
        <LinearGradient colors={[color, darkerColor, color]} className='w-full py-6 px-3 mb-6'>
            <Text className='text-white text-2xl font-bold'>{nombre}</Text>
            <View className='py-3'>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className='flex-row pr-2 w-full '>
                    <PodcastCard />
                    <PodcastCard />
                    <PodcastCard />
                    <PodcastCard />
                </ScrollView>

            </View>


        </LinearGradient>
    )
}

export default CardContainer