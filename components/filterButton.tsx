import { Icons } from '@/constants/icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const FilterButton = ({ onPress }: {onPress: () => void}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className='flex-row items-center gap-2'>
        <Image source={Icons.FilterIcon} tintColor={'#fff'} className='size-6' />
        <Text className='text-white text-sm'>Ordenar y Filtrar</Text>
      </View>
    </TouchableOpacity>
  );
};


export default FilterButton;
