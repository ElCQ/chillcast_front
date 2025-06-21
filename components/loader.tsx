// components/Loader.tsx
import { ActivityIndicator, Modal, View } from 'react-native';
import React from 'react';

export default function Loader({ visible }: { visible: boolean }) {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View className="flex-1 justify-center items-center bg-black/40">
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        </Modal>
    );
}