import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
//Importation des logo pour le barre en bas
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        //tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Principal',
          tabBarIcon: ({ color }) => <Entypo name="home" size={24} color="white" />,
        }}
      />
      <Tabs.Screen
        name="Terrain"
        options={{
          title: 'Terrain',
          tabBarIcon: ({ color }) => <MaterialIcons name="stadium" size={24} color="white" />,
        }}
      />
      <Tabs.Screen
        name="Reservation"
        options={{
          title: 'Reservation',
          tabBarIcon: ({ color }) => <FontAwesome name="calendar" size={24} color="white" />,
        }}
      />
    </Tabs>
  );
}
