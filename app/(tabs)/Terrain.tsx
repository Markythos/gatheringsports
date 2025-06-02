import React, { useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const sports = ['Football', 'Basketball', 'Tennis', 'Rugby', 'Volley', 'Boxe'];

const terrains = [
  { id: 1, name: 'Stade Municipal', sport: 'Football', address: '10 rue du Stade' },
  { id: 2, name: 'City Park', sport: 'Basketball', address: '22 avenue des Sports' },
  { id: 3, name: 'Tennis Club', sport: 'Tennis', address: '33 court central' },
  { id: 4, name: 'Rugby Arena', sport: 'Rugby', address: '44 terrain Ovale' },
  { id: 5, name: 'Beach Volley Court', sport: 'Volley', address: '55 plage Sud' },
  { id: 6, name: 'Boxing Gym', sport: 'Boxe', address: '66 ring zone' },
];

type RootStackParamList = {
  Home: undefined;
  Sport: { sport: string; backgroundColor: string };
  Reservation: { terrain: { id: number; name: string; sport: string; address: string } };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Sport'>;

export default function SportsScreen() {
  const [selectedSport, setSelectedSport] = useState(sports[0]);
  const navigation = useNavigation<NavigationProp>();

  const filteredTerrains = terrains.filter(terrain => terrain.sport === selectedSport);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          //source={require('@/assets/header.jpg')} // Remplace par ton image réelle
          style={{ width: '100%', height: 200 }}
          resizeMode="cover"
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Sélectionne un sport</ThemedText>
      </ThemedView>

      <FlatList
        horizontal
        data={sports}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.sportButton, item === selectedSport && styles.selectedSport]}
            onPress={() => {
              console.log('Clicked:', item);
              setSelectedSport(item);
            }}
          >
            <Text style={styles.sportText}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      <ThemedText type="title">Terrains disponibles</ThemedText>

      <FlatList
        data={filteredTerrains}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
              style={styles.terrainCard}
              onPress={() => {
                console.log('Clicked:', item.name);
                navigation.navigate('Reservation', {terrain: item});
              }}
            >
              <Text style={styles.terrainText}>{item.name}</Text>
              <Text style={styles.terrainAddress}>{item.address}</Text>
          </TouchableOpacity>
        )}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'center',
  },
  sportButton: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#ddd',
  },
  selectedSport: {
    backgroundColor: '#ff5733',
  },
  sportText: {
    color: '#000',
    fontWeight: 'bold',
  },
  terrainCard: {
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    alignItems: 'center',
  },
  terrainText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  terrainAddress: {
    fontSize: 14,
    color: '#555',
  },
});