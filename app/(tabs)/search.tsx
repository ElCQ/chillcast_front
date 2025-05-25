import FilterButton from '@/components/filterButton'
import FilterTabs from '@/components/filterTabs'
import SearchBar from '@/components/SearchBar'
import React from 'react'
import { View } from 'react-native'

const Search = () => {
  return (
    <View className='bg-[#282828] flex-1 items-center justify-start gap-3 pt-20'>
      <View className='px-6 w-full items-center justify-between gap-5'>
        <SearchBar
          placeholder='Buscar'
          onPress={() => { }}
        />
        
      </View>
      <View className='w-full h-10  px-6 items-start justify-start'>
        <FilterButton />
      </View>
      <View className='w-full h-10  px-6 items-start justify-start'>
        <FilterTabs/>
      </View>
    </View>
  )
}

export default Search