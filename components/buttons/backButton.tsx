import { Icons } from '@/constants/icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { GestureResponderEvent, Image, Pressable } from 'react-native'

type BackButtonProps = {
  onPress?: (event: GestureResponderEvent) => void
}

const BackButton: React.FC<BackButtonProps> = ({ onPress }) => {
  const router = useRouter()
  const handlePress = (e: GestureResponderEvent) => {
    if (onPress) {
      onPress(e)
    } else {
      router.back()
    }
  }

  return (
    <Pressable className="flex-row items-center" onPress={handlePress}>
        <Image
            source={Icons.ArrowBackIcon}
            className=" size-8"
            resizeMode="contain"
        />
    </Pressable>
  )
}

export default BackButton