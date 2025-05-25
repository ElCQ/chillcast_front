import { Link } from 'expo-router';
import React from 'react';
import { ImageBackground, Text, TouchableOpacity } from 'react-native';

const PodcastCard = () => {
    const id = '1234567890';

    return (
        <Link href={`/podcast/${id}`} asChild>
            <TouchableOpacity className='mr-2 h-52 w-32 bg-gray-600 rounded-lg overflow-hidden'>
                <ImageBackground
                    source={require('../../assets/images/podcastImage.png')}
                    className='w-full h-52 justify-end items-center'
                    resizeMode='cover'
                >
                    <Text className='text-white bg-black/60 px-2 py-1 rounded-b-lg w-full text-center'>PodCastCard</Text>
                </ImageBackground>
            </TouchableOpacity>
        </Link>
    )
}

export default PodcastCard