import React, { useState } from 'react';
import { View } from 'react-native';
import OptionButton from './buttons/optionButton';

const FilterTabs = () => {
    const [activeTab, setActiveTab] = useState('Podcasts');

    const tabs = ['Podcasts', 'Episodios', 'Hosts'];

    return (

        <View className="flex-row space-x-2">
            {tabs.map((tab) => {
                const isActive = tab === activeTab;
                return (
                    <View key={tab}>
                        <OptionButton texto={tab} activo={isActive} onPress={() => setActiveTab(tab)} />
                    </View>

                );
            })}
        </View>

    )
}

export default FilterTabs