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
