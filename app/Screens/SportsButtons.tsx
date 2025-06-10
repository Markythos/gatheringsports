// import { View, Text, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';

// type RootStackParamList = {
//   Home: undefined;
//   Sport: { sport: string; backgroundColor: string };
// };

// type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

// export default function SportsButtons() {
//   const navigation = useNavigation<NavigationProp>();

//   const sports = [
//     { name: 'FOOTBALL' },
//     { name: 'TENNIS' },
//     { name: 'BASKET-BALL' },
//     { name: 'VOLEY-BALL' },
//     { name: 'BOXE' },
//     { name: 'RUGBY' },
//   ];

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
//       <Text style={{ fontWeight: 'bold', fontSize: 24, marginBottom: 20 }}>Choisissez un sport !</Text>

//       {sports.map((sport) => (
//         <TouchableOpacity
//           key={sport.name}
//           onPress={() => navigation.navigate('Sport', { sport: sport.name, backgroundColor: '#D8BFD8' })}
//           style={{
//             width: 200, // ✅ Même largeur pour tous les boutons
//             padding: 15,
//             backgroundColor: '#8137ed', // ✅ Couleur violette claire
//             borderRadius: 5,
//             alignItems: 'center', // ✅ Texte centré
//             marginVertical: 10, // ✅ Espacement uniforme
//           }}
//         >
//           <Text style={{ color: 'black', fontWeight: 'bold' }}>{sport.name}</Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// }

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import cong from "../../configuration"; // Ton fichier Firebase config

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = getAuth(cong);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Merci de remplir tous les champs");
      return;
    }
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(false);
        // Connexion réussie
        const user = userCredential.user;
        console.log("Connecté:", user.email);
        // Naviguer vers l’écran principal (exemple)
        navigation.replace("TerrainsScreen");
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert("Erreur de connexion", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor={"black"}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Mot de passe"
        placeholderTextColor={"black"}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Se connecter</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c0c0c",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    alignSelf: "center",
  },
  input: {
    backgroundColor: "white",
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#d63031",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
