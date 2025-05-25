import { Icons } from '@/constants/icons'
import React from 'react'
import { Image, Text, View } from 'react-native'

const FilterButton = () => {
  return (
    <View className='flex-1 flex-row items-center justify-center gap-2'>
    <Image
        source={Icons.FilterIcon}
        tintColor={'#fff'}
        className='size-6'
    />
      <Text className='text-white text-sm'>Ordenar y Filtrar</Text>
      
    </View>
  )
}

export default FilterButton