import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import SportsButtons from '../Screens/SportsButtons';
import SportsScreen from '../Screens/SportsScreen';
import Reservation from './Reservation';

type RootStackParamList = {
  Home: undefined;
  Sport: { sport: string; backgroundColor: string };
  Reservation: { terrain: { id: number; name: string; sport: string; address: string } };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={SportsButtons} />
      <Stack.Screen name="Sport" component={SportsScreen} />
      <Stack.Screen name="Reservation" component={Reservation} />
    </Stack.Navigator>
  );
}



// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Dimensions,
//   TextInput,
//   Modal,
// } from "react-native";
// import { getDatabase, ref, onValue } from "firebase/database";
// import { FontAwesome } from "@expo/vector-icons";
// import cong from "../../configuration";
// import { Platform, Linking } from "react-native";

// const openNativeMapApp = (address: string) => {
//   const encodedAddress = encodeURIComponent(address);

//   if (Platform.OS === 'ios') {
//     // Apple Maps
//     Linking.openURL(`http://maps.apple.com/?daddr=${encodedAddress}`);
//   } else {
//     // Android – Google Maps
//     Linking.openURL(`geo:0,0?q=${encodedAddress}`);
//   }
// };

// const { width } = Dimensions.get("window");

// const sportsList = [
//   { label: "Football ⚽", value: "Football" },
//   { label: "Basketball 🏀", value: "Basket-ball" },
//   { label: "Tennis 🎾", value: "Tennis" },
//   { label: "Rugby 🏉", value: "Rugby" },
//   { label: "Volley 🏐", value: "Volley" },
//   { label: "Boxe 🥊", value: "Boxe" },
// ];

// export default function TerrainsScreen({ navigation, route }) {
//   const [data, setData] = useState<any[]>([]);
//   const [filteredData, setFilteredData] = useState<any[]>([]);
//   const [selectedSport, setSelectedSport] = useState(route?.params?.sport || "");
//   const [selectedCity, setSelectedCity] = useState(route?.params?.ville || "");
//   const [expandedCards, setExpandedCards] = useState<{ [key: string]: boolean }>({});
//   const [modalVisible, setModalVisible] = useState(false);

//   useEffect(() => {
//     const database = getDatabase(cong);
//     const dbRef = ref(database, "/");

//     onValue(dbRef, (snapshot) => {
//       const value = snapshot.val();
//       if (value) {
//         const items = Object.values(value);
//         setData(items);
//       }
//     });
//   }, []);

//   useEffect(() => {
//     const filtered = data.filter((item: any) => {
//       const sportMatch = selectedSport
//         ? item["Activités Proposés"]?.toLowerCase().includes(selectedSport.toLowerCase())
//         : true;
//       const cityMatch = selectedCity
//         ? item.adresse?.toLowerCase().includes(selectedCity.toLowerCase())
//         : true;
//       return sportMatch && cityMatch;
//     });
//     setFilteredData(filtered);
//   }, [data, selectedSport, selectedCity]);

//   const toggleExpand = (index: number) => {
//     setExpandedCards((prev) => ({
//       ...prev,
//       [index]: !prev[index],
//     }));
//   };

//   const handleReset = () => {
//     setSelectedCity("");
//     setSelectedSport("");
//   };

//   const renderItem = ({ item, index }: any) => (
//     <TouchableOpacity style={styles.card} onPress={() => toggleExpand(index)}>
//       <Text style={styles.title}>{item.nom}</Text>
//       <Text style={styles.subtitle}>{item.adresse}</Text>
//       <Text style={styles.subtitle}>{item.type}</Text>
//       <Text>{item.Type}</Text>
//       {expandedCards[index] && (
//         <>
//           {item.téléphone && (
//             <>
//               <Text style={{ fontWeight: "bold" }}>Téléphone :</Text>
//               <Text>{item.téléphone}</Text>
//             </>
//           )}
//           {item["Activités Proposés"] && (
//             <>
//               <Text style={{ fontWeight: "bold" }}>Activités proposées :</Text>
//               <Text>{item["Activités Proposés"]}</Text>
//             </>
//           )}
//         </>
//       )}
//       <TouchableOpacity onPress={() => toggleExpand(index)}>
//         <Text style={{ color: "#007bff", marginTop: 6 }}>
//           {expandedCards[index] ? "Moins d'infos" : "Plus d'infos"}
//         </Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.mapButton} onPress={() => openNativeMapApp(item.adresse)}>
//         <Text style={styles.mapButtonText}>🗺️ S'y Rendre</Text>
//       </TouchableOpacity>
//     </TouchableOpacity>
//   );

//   return (
//     <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
//       <View style={styles.filterContainer}>
//         <View style={styles.inputGroup}>
//           <TouchableOpacity
//             style={styles.input}
//             onPress={() => setModalVisible(true)}
//             activeOpacity={0.7}
//           >
//             <Text style={{ color: selectedSport ? "black" : "#883" }}>
//               {sportsList.find((s) => s.value === selectedSport)?.label || "Sélectionnez un sport"}
//             </Text>
//           </TouchableOpacity>

//           <TextInput
//             placeholder="Ville (ex: Paris)"
//             placeholderTextColor="#888"
//             value={selectedCity}
//             onChangeText={setSelectedCity}
//             style={styles.input}
//           />
//         </View>

//         <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
//           <FontAwesome name="ban" size={20} color="white" />
//         </TouchableOpacity>
//       </View>

//       <FlatList
//         data={filteredData}
//         renderItem={renderItem}
//         keyExtractor={(_, index) => index.toString()}
//         contentContainerStyle={styles.list}
//         numColumns={2}
//         scrollEnabled={false}
//       />

//       <Modal visible={modalVisible} transparent animationType="slide">
//         <View style={styles.modalBackground}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Choisissez un sport</Text>
//             {sportsList.map((sport) => (
//               <TouchableOpacity
//                 key={sport.value}
//                 style={styles.modalItem}
//                 onPress={() => {
//                   setSelectedSport(sport.value);
//                   setModalVisible(false);
//                 }}
//               >
//                 <Text style={styles.modalItemText}>{sport.label}</Text>
//               </TouchableOpacity>
//             ))}
//             <TouchableOpacity
//               onPress={() => setModalVisible(false)}
//               style={styles.modalCancel}
//             >
//               <Text style={{ color: "red", fontWeight: "bold" }}>Annuler</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#0c0c0c",
//     padding: 10,
//     paddingTop: 100,
//   },
//   filterContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   inputGroup: {
//     flex: 1,
//   },
//   input: {
//     backgroundColor: "white",
//     padding: 12,
//     marginBottom: 10,
//     borderRadius: 8,
//   },
//   resetButton: {
//     marginLeft: 10,
//     backgroundColor: "red",
//     padding: 10,
//     borderRadius: 50,
//     justifyContent: "center",
//     alignItems: "center",
//     height: 45,
//     width: 45,
//   },
//   list: {
//     alignItems: "center",
//   },
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 16,
//     padding: 12,
//     margin: 8,
//     width: width * 0.45,
//     elevation: 4,
//   },
//   title: {
//     fontWeight: "bold",
//     fontSize: 16,
//     marginBottom: 4,
//   },
//   subtitle: {
//     fontSize: 12,
//     color: "#444",
//   },
//   modalBackground: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "center",
//   },
//   modalContent: {
//     backgroundColor: "white",
//     marginHorizontal: 30,
//     borderRadius: 10,
//     paddingVertical: 20,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 15,
//     alignSelf: "center",
//   },
//   modalItem: {
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ddd",
//   },
//   modalItemText: {
//     fontSize: 16,
//   },
//   modalCancel: {
//     paddingVertical: 15,
//     alignItems: "center",
//   },
//   mapButton: {
//     backgroundColor: "#ff4d4d", // rouge
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//     marginTop: 8,
//     alignSelf: "flex-start",
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   mapButtonText: {
//     color: "white",
//     fontWeight: "bold",
//     marginLeft: 6,
//   },
// });
