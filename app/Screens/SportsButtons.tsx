import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Sport: { sport: string; backgroundColor: string };
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function SportsButtons() {
  const navigation = useNavigation<NavigationProp>();

  const sports = [
    { name: 'FOOTBALL' },
    { name: 'TENNIS' },
    { name: 'BASKET-BALL' },
    { name: 'VOLEY-BALL' },
    { name: 'BOXE' },
    { name: 'RUGBY' },
  ];

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <Text style={{ fontWeight: 'bold', fontSize: 24, marginBottom: 20 }}>Choisissez un sport !</Text>

      {sports.map((sport) => (
        <TouchableOpacity
          key={sport.name}
          onPress={() => navigation.navigate('Sport', { sport: sport.name, backgroundColor: '#D8BFD8' })}
          style={{
            width: 200, // ✅ Même largeur pour tous les boutons
            padding: 15,
            backgroundColor: '#8137ed', // ✅ Couleur violette claire
            borderRadius: 5,
            alignItems: 'center', // ✅ Texte centré
            marginVertical: 10, // ✅ Espacement uniforme
          }}
        >
          <Text style={{ color: 'black', fontWeight: 'bold' }}>{sport.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
