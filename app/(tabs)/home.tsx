import CardContainer from '@/components/cardContainer'
import SearchBar from '@/components/SearchBar'
import { useRouter } from 'expo-router'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'

const Home = () => {

  const router = useRouter();

  return (
    <View className='bg-[#282828] flex-1 items-center justify-start gap-5 pt-10'>

      <View className='px-6 w-full items-center justify-between gap-5'>
        <Text className='text-white text-2xl font-bold '>Home</Text>
        <SearchBar
          placeholder="Buscar"
          onPress={() => router.push('/search')}
        />
      </View>

      <ScrollView className=' w-full h-full p-0 ' >
        <CardContainer />
        <CardContainer />
        <CardContainer />
      </ScrollView>

    </View>
  )
}

export default Home