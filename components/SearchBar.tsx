import { Icons } from '@/constants/icons'
import React, { useState } from 'react'
import { Image, TextInput, View } from 'react-native'

interface Props {
  placeholder: string,
  onPress?: () => void
  onSubmit?: (value: string) => void
}

const SearchBar = ({ placeholder, onPress, onSubmit }: Props) => {
  const [value, setValue] = useState('');

  return (
    <View className="flex-row items-center justify-between rounded-3xl px-3 border border-[#595959] bg-[#151515]">
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        onSubmitEditing={() => onSubmit && onSubmit(value)}
        placeholderTextColor={"#fff"}
        className='flex-1 text-white'
      >
      </TextInput>
      <Image
        source={Icons.MagnifyingGlassIcon}
        className='size-6'
      />
    </View>
  );
}

export default SearchBar