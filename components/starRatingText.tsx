import { Icons } from '@/constants/icons'
import React from 'react'
import { Image, Text, View } from 'react-native'

const StarRatingTextSm = ({ rating }: { rating: number }) => {
    return (
        <View className='flex-row items-center justify-center'>
            <Image
                source={Icons.StarIcon}
                className='size-6'
            />
            <View className='flex-row items-end'>
                <Text className='text-white font-bold'>{rating}</Text>
                <Text className='text-gray-400 font-bold text-sm'>/5</Text>
            </View>

        </View>
    )
}

const StarRatingTextLg = ({ rating }: { rating: number }) => {
    return (
        <View className='flex-row items-center justify-center'>
            <Image
                source={Icons.StarIcon}
                className='size-10'
            />
            <View className='flex-row items-end'>
                <Text className='text-white font-bold text-xl'>{rating}</Text>
                <Text className='text-gray-400 font-bold text-lg'>/5</Text>
            </View>

        </View>
    )
}

export { StarRatingTextLg, StarRatingTextSm }

