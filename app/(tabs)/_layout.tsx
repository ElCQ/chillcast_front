import { Icons } from '@/constants/icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Image, ImageSourcePropType, View } from 'react-native';

const TabIcon = ({ focused, icon }: { focused: boolean, icon: ImageSourcePropType }) => {
  return (
    <View className='flex-1 items-center justify-center p-4'>
      <Image
        source={icon}
        style={{ tintColor: focused ? '#B347FB' : '#888' }}
        className='size-8'
      />
    </View>
  )
}

const _Layout = () => {
  return (
    <Tabs screenOptions={{
      tabBarShowLabel: false,
      tabBarStyle: {
        paddingTop: 10,   // tweak to align icon
        paddingBottom: 10,   // tweak to align icon
        backgroundColor: '#282828'
      },
    }}>
      <Tabs.Screen name="home" options={{
        title: 'Home', headerShown: false, tabBarIcon: ({ focused }) => {
          return (
            <TabIcon focused={focused} icon={Icons.HomeIcon} />
          )
        }
      }} />
      <Tabs.Screen name="search" options={{
        title: 'Buscar', tabBarShowLabel: false, headerShown: false, tabBarIcon: ({ focused }) => {
          return (
            <TabIcon focused={focused} icon={Icons.SearchIcon} />
          )
        }
      }} />
            <Tabs.Screen name="feed" options={{
        title: 'Feed', headerShown: false, tabBarIcon: ({ focused }) => {
          return (
            <TabIcon focused={focused} icon={Icons.VideoIcon} />
          )
        }
      }} />
      <Tabs.Screen name="miEspacio" options={{
        title: 'Mi Espacio', headerShown: false, tabBarIcon: ({ focused }) => {
          return (
            <TabIcon focused={focused} icon={Icons.MiEspacioIcon} />
          )
        }
      }} />
      <Tabs.Screen name="profile" options={{
        title: 'Profile', headerShown: false, tabBarIcon: ({ focused }) => {
          return (
            <TabIcon focused={focused} icon={Icons.ProfileIcon} />
          )
        }
      }} />
    </Tabs>
  )
}

export default _Layout