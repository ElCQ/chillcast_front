import AddButton from '@/components/buttons/addButton';
import BackButton from '@/components/buttons/backButton';
import FilterTabs from '@/components/filterTabs';
import { StarRatingTextLg } from '@/components/starRatingText';
import { Icons } from '@/constants/icons';
import { hexToRgba } from '@/utils/colorUtils';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ImageBackground, ScrollView, Text, View } from 'react-native';

const Podcasts = () => {
  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState('Información');

  const tabs = ['Información', 'Episodios', 'Reseñas'];

  return (
    <View className='flex-1 items-center justify-top bg-[#282828]'>
      <ImageBackground
        source={require('../../assets/images/podcastImage.png')}
        className='w-full h-72 justify-end items-center'
        resizeMode='cover'
      >
        <LinearGradient
          colors={[
            hexToRgba('#282828', 0.4),
            hexToRgba('#282828', 0.4),
            '#282828'
          ]}
          className='rounded-lg px-5 pt-12 pb-8 w-full h-full justify-between gap-3'
        >
          <View className='gap-3'>
            <BackButton />

            <View className='flex-row justify-between'>

              <Text className='text-white text-5xl font-semibold' style={{
                textShadowColor: '#111',
                textShadowOffset: { width: 0, height: 2 },
                textShadowRadius: 10,
              }}>
                El Podcast

              </Text>

              <StarRatingTextLg rating={3.8} />
            </View>

          </View>

          <View className='flex-row items-center justify-start gap-5'>
            <AddButton label='Añadir a favoritos' icon={Icons.CirclePlusIcon} onPress={() => console.log("Añadido a favoritos")} />
            <AddButton label='Añadir a lista' icon={Icons.FolderPlusIcon} onPress={() => console.log("Añadido a favoritos")} />
          </View>

        </LinearGradient>

      </ImageBackground>

      <ScrollView horizontal className='mt-8' 
      showsHorizontalScrollIndicator={false} 
      contentContainerStyle={{ paddingHorizontal: 20 }}
      >
        
        <FilterTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}/>

      </ScrollView>


      <Text>ID: {id}</Text>
    </View>
  )
}

export default Podcasts