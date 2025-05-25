import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const optionButton = ({ texto, activo, onPress }: { texto: string, activo: boolean, onPress: () => void }) => {
    return (
        <TouchableOpacity
            key={texto}
            onPress={() => onPress()}
            className={`items-center justify-center px-4 py-2 h-10 w-50 rounded-full ${activo
                ? 'bg-purple-500'
                : 'border border-purple-500 '
                }`}
        >
            <Text
                className='text-white'
            >
                {texto}
            </Text>
        </TouchableOpacity>
    )
}

export default optionButton