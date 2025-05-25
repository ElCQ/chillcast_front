import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const optionButton = ({ texto, activo, onPress }: { texto: string, activo: boolean, onPress: () => void }) => {
    return (
        <TouchableOpacity
            key={texto}
            onPress={() => onPress()}
            className={`items-center justify-center px-12 py-3 rounded-full min-w-[100px] ${activo
                ? 'bg-purple-500'
                : 'border border-purple-500'
                }`}
        >
            <Text
                className='text-white font-bold'
            >
                {texto}
            </Text>
        </TouchableOpacity>
    )
}

export default optionButton