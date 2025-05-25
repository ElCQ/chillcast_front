import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import PodcastCard from './cards/podcastCard'

const CardContainer = () => {
    return (
        <View className='bg-[#151515] w-full p-3 mb-6'>
            <Text className='text-white text-2xl font-bold'>CardContainer</Text>
            <View className='py-3'>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className='flex-row pr-2 w-full '>
                    <PodcastCard/>
                    <PodcastCard/>
                    <PodcastCard/>
                    <PodcastCard/>
                </ScrollView>

            </View>


        </View>
    )
}

export default CardContainer