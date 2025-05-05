/* import React, { useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Text, View } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const sports = ['Football', 'Basketball', 'Tennis', 'Rugby', 'Volley', 'Boxe'];

const terrains = [
  { id: 1, name: 'Stade Municipal', sport: 'Football' },
  { id: 2, name: 'City Park', sport: 'Basketball' },
  { id: 3, name: 'Tennis Club', sport: 'Tennis' },
  { id: 4, name: 'Rugby Arena', sport: 'Rugby' },
  { id: 5, name: 'Beach Volley Court', sport: 'Volley' },
  { id: 6, name: 'Boxing Gym', sport: 'Boxe' },
];

export default function SportsTerrainsScreen() {
  const [selectedSport, setSelectedSport] = useState(sports[0]);

  const filteredTerrains = terrains.filter(terrain => terrain.sport === selectedSport);

  return (
    <ParallaxScrollView headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}>
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
            onPress={() => setSelectedSport(item)}>
            <Text style={styles.sportText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
      <ThemedText type="title">Terrains disponibles</ThemedText>
      <FlatList
        data={filteredTerrains}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.terrainCard}>
            <Text style={styles.terrainText}>{item.name}</Text>
          </View>
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
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    alignItems: 'center',
  },
  terrainText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
 */
import React, { useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Text, View, Image } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const sports = ['Football', 'Basketball', 'Tennis', 'Rugby', 'Volley', 'Boxe'];

const terrains = [
  { id: 1, name: 'Stade Municipal', sport: 'Football' },
  { id: 2, name: 'City Park', sport: 'Basketball' },
  { id: 3, name: 'Tennis Club', sport: 'Tennis' },
  { id: 4, name: 'Rugby Arena', sport: 'Rugby' },
  { id: 5, name: 'Beach Volley Court', sport: 'Volley' },
  { id: 6, name: 'Boxing Gym', sport: 'Boxe' },
];

export default function SportsTerrainsScreen() {
  const [selectedSport, setSelectedSport] = useState(sports[0]);
  const filteredTerrains = terrains.filter(terrain => terrain.sport === selectedSport);

  return (
    <ParallaxScrollView
      headerImage={
        <Image
          source={{ uri: 'https://via.placeholder.com/600x200' }} // Remplace par ton image
          style={{ width: '100%', height: 200 }}
          resizeMode="cover"
        />
      }
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
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
            onPress={() => setSelectedSport(item)}
          >
            <Text style={styles.sportText}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      <ThemedText type="title">Terrains disponibles</ThemedText>

      {filteredTerrains.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Aucun terrain disponible</Text>
      ) : (
        <FlatList
          data={filteredTerrains}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.terrainCard}>
              <Text style={styles.terrainText}>{item.name}</Text>
            </View>
          )}
        />
      )}
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
    fontSize: 16,
  },
  terrainCard: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    alignItems: 'center',
  },
  terrainText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
