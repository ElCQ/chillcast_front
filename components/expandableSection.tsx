import { Icons } from '@/constants/icons';
import React, { ReactNode, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const ExpandableSection = ({titulo, activado=true, children}: {titulo: string, activado?: boolean, children: ReactNode}) => {
    const [expanded, setExpanded] = useState(activado);
  
    return (
      <View className="rounded-md">
        <TouchableOpacity
          className="flex-row justify-between items-center px-4 py-3 bg-[#373737]"
          onPress={() => setExpanded(!expanded)}
        >
          <Text className="text-white font-bold text-base">{titulo}</Text>
          <Image
            source={Icons.ArrowBackIcon}
            className={`size-8 ${expanded ? "-rotate-90" : "rotate-90"}`}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View className="">
          {expanded ? (
            <View>
                {children}
            </View>
          ) : (
            <></>
          )}
        </View>
      </View>
    );
}

export default ExpandableSection