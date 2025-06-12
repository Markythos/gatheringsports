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
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image } from "react-native";


type RootStackParamList = {
  LoginScreen: undefined;
  Terrain: undefined; // ou { ...params } si tu passes des paramètres
};
type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'LoginScreen'
>;

type Props = {  // 3.
  navigation: LoginScreenNavigationProp;
};

export default function LoginScreen({navigation}: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = getAuth(cong);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Merci de remplir tous les champs");
      return;
    }
    // setLoading(true);
    // signInWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     setLoading(false);
    //     // Connexion réussie
    //     const user = userCredential.user;
    //     console.log("Connecté:", user.email);
    //     // Naviguer vers l’écran principal (exemple)
         navigation.replace("Terrain");
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //     Alert.alert("Erreur de connexion", error.message);
    //   });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo.gif")}
        style={styles.logo}
      />
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
    backgroundColor: "#2C3E50",
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
    borderWidth: 3,
  },
  button: {
    backgroundColor: "#d63031",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 3,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  logo: {
    width: 300,
    height: 200,
    alignSelf: "center",
  },  
});
