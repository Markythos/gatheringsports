import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, CommonActions, RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Sport: { sport: string; backgroundColor: string };
};

export default function SportScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'Sport'>>(); // Typage des paramètres
  const { sport, backgroundColor } = route.params; // Extraction des données

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Choisissez votre terrain pour le {sport} !</Text>

      {/* Bouton de retour */}
      <TouchableOpacity
        onPress={() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            })
          );
        }}
        style={{
          marginTop: 20,
          padding: 10,
          backgroundColor: 'blue',
          borderRadius: 5,
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Retour</Text>
      </TouchableOpacity>
    </View>
  );
}