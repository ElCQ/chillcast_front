import React from 'react'
import { Image, ImageSourcePropType, Pressable, Text } from 'react-native'

type AddButtonProps = {
    label: string,
    icon: ImageSourcePropType,
    onPress: () => void,
}

const AddButton: React.FC<AddButtonProps> = ({ label, icon, onPress }) => {


    return (
        <Pressable 
            onPress={onPress}
            className='flex-row items-center justify-center gap-2'
        >
            <Image
                source={icon}
                className='size-6'

            />
            <Text className='text-white font-semibold text-sm'>
                {label}
            </Text>
        </Pressable>
    )
}

export default AddButton