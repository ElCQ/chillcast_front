import CardContainer from '@/components/cardContainer'
import SearchBar from '@/components/SearchBar'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
  return (
    <SafeAreaView className='bg-[#282828] flex-1 items-center justify-start gap-5 py-10'>

        <View className='px-6 w-full items-center justify-between gap-5'>
          <Text className='text-white text-2xl font-bold '>Home</Text>
          <SearchBar
            placeholder='Buscar'
            onPress={() => { }}
          />
        </View>

        <ScrollView className='w-full gap-5' >
          <CardContainer />
          <CardContainer />
          <CardContainer />
        </ScrollView>

    </SafeAreaView>
  )
}

export default Home