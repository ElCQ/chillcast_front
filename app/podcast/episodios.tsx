import FilterButton from '@/components/filterButton'
import SearchBar from '@/components/SearchBar'
import { Podcast } from '@/interfaces/interfaces'
import React from 'react'
import { View } from 'react-native'

const Episodios = ({data}: {data: Podcast}) => {
  return (
    <View className='flex-1 px-3 gap-3'>
      <SearchBar placeholder='Busca episodios'/>
      <FilterButton onPress={() => {}} />
    </View>
  )
}

export default Episodios