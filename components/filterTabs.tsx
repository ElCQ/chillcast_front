import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import OptionButton from './buttons/optionButton';

const FilterTabs = () => {
    const [activeTab, setActiveTab] = useState('Podcasts');

    const tabs = ['Podcasts', 'Episodios', 'Hosts'];

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="w-full">
            <View className="flex-row gap-3">
                {tabs.map((tab) => {
                    const isActive = tab === activeTab;
                    return (
                        <View key={tab}>
                            <OptionButton texto={tab} activo={isActive} onPress={() => setActiveTab(tab)} />
                        </View>

                    );
                })}
            </View>
        </ScrollView>


    )
}

export default FilterTabs