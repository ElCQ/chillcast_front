import ExpandableSection from '@/components/expandableSection'
import { Podcast } from '@/interfaces/interfaces'
import React from 'react'
import { Text, View } from 'react-native'

const Informacion = ({data}: {data: Podcast}) => {
  return (
    <View className="gap-2">
      <ExpandableSection titulo="Descripción">
        <Text className="text-white text-sm px-5 py-2">{data.description}</Text>
      </ExpandableSection>

      <ExpandableSection titulo="Hosts">
        <Text className="text-white text-sm px-5 py-2">{data.author}</Text>
      </ExpandableSection>

      <ExpandableSection titulo="Tags y Categorías">
        <Text className="text-white text-sm px-5 py-2">WIP</Text>
      </ExpandableSection>
    </View>
  );
}

export default Informacion