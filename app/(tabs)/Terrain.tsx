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
//   Platform,
//   Linking,
// } from "react-native";
// import { getDatabase, ref, onValue } from "firebase/database";
// import { FontAwesome } from "@expo/vector-icons";
// import cong from "../../configuration";
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { useNavigation } from '@react-navigation/native';

// type RootStackParamList = {
//   TerrainScreen: undefined;
//   Reservation: { terrain: Terrain };
//   Terrain: undefined;
// };
// type TerrainScreenNavigationProp = NativeStackNavigationProp<
//   RootStackParamList,
//   'TerrainScreen'
// >;
// type Terrain = {
//   id: number;
//   name: string;
//   address?: string;
//   sport: string;
// };

// type Props = {
//   navigation: TerrainScreenNavigationProp;
//   route: {
//     params?: {
//       sport?: string;
//       ville?: string;
//     };
//   };
// };

// const openNativeMapApp = (address: string) => {
//   const encodedAddress = encodeURIComponent(address);
//   if (Platform.OS === "ios") {
//     Linking.openURL(`http://maps.apple.com/?daddr=${encodedAddress}`);
//   } else {
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

// // Mapping sport -> couleur (tout en minuscules)
// const colorsBySport: { [key: string]: string } = {
//   football: "#4CAF50",
//   "basket-ball": "#FF9800",
//   tennis: "#FFD700",
//   rugby: "#F5F5DC",
//   volley: "#B0C4DE",
//   boxe: "#F44336",
// };

// export default function TerrainsScreen({ route }: Props) {
//   const navigation = useNavigation<TerrainScreenNavigationProp>();
//   const [data, setData] = useState<any[]>([]);
//   const [filteredData, setFilteredData] = useState<any[]>([]);
//   const [selectedSport, setSelectedSport] = useState(route?.params?.sport || "");
//   const [selectedCity, setSelectedCity] = useState(route?.params?.ville || "");
//   const [expandedCards, setExpandedCards] = useState<{ [key: string]: boolean }>({});
//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalReservationVisible, setModalReservationVisible] = useState(false);
//   const [selectedTerrain, setSelectedTerrain] = useState<Terrain | null>(null);

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

//   const handleReservePress = (terrain: Terrain) => {
//     setSelectedTerrain(terrain);
//     setModalReservationVisible(true);
//   };

//   const confirmReservation = () => {
//     setModalReservationVisible(false);
//     if (selectedTerrain) {
//       navigation.navigate("Reservation", { terrain: selectedTerrain });
//     }
//   };

//   const renderItem = ({ item, index }: any) => {
//     const rawSport = item["Activités Proposés"] || item.type || "";
//     const sportKey = rawSport.trim().toLowerCase();
//     const backgroundColor = colorsBySport[sportKey] || "#32CD32"; // Vert si inconnu

//     return (
//       <TouchableOpacity
//         style={[styles.card, { backgroundColor }]}
//         onPress={() => toggleExpand(index)}
//       >
//         <Text style={styles.title}>{item.nom}</Text>
//         <Text style={styles.subtitle}>{item.adresse}</Text>
//         <Text style={styles.subtitle}>{item.type}</Text>

//         {expandedCards[index] && (
//           <>
//             {item.téléphone && (
//               <>
//                 <Text style={{ fontWeight: "bold" }}>Téléphone :</Text>
//                 <Text>{item.téléphone}</Text>
//               </>
//             )}
//             {item["Activités Proposés"] && (
//               <>
//                 <Text style={{ fontWeight: "bold" }}>Activités proposées :</Text>
//                 <Text>{item["Activités Proposés"]}</Text>
//               </>
//             )}
//           </>
//         )}
//         <TouchableOpacity onPress={() => toggleExpand(index)}>
//           <Text style={{ color: "#007bff", marginTop: 6 }}>
//             {expandedCards[index] ? "Moins d'infos" : "Plus d'infos"}
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.mapButton} onPress={() => openNativeMapApp(item.adresse)}>
//           <Text style={styles.mapButtonText}>🗺️ S'y Rendre</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.reserveButton}
//           onPress={() =>
//             handleReservePress({
//               id: item.id || index,
//               name: item.nom,
//               address: item.adresse,
//               sport: rawSport,
//             })
//           }
//         >
//           <Text style={styles.reserveButtonText}>Réserver</Text>
//         </TouchableOpacity>
//       </TouchableOpacity>
//     );
//   };

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

//       {/* Modal sélection sport */}
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
//             <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalCancel}>
//               <Text style={{ color: "red", fontWeight: "bold" }}>Annuler</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       {/* Modal confirmation prix */}
//       <Modal visible={modalReservationVisible} transparent animationType="fade">
//         <View style={styles.modalBackground}>
//           <View style={[styles.modalContent, { width: 300, padding: 20 }]}>
//             <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 15 }}>
//               Prix pour la réservation
//             </Text>
//             <Text style={{ fontSize: 16, marginBottom: 10 }}>
//               <Text style={{ fontWeight: "bold" }}>Terrain : </Text>{selectedTerrain?.name}
//             </Text>
//             <Text style={{ fontSize: 16, marginBottom: 20 }}>
//               Prix : <Text style={{ fontWeight: "bold" }}>20 €</Text>
//             </Text>

//             <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
//               <TouchableOpacity
//                 onPress={() => setModalReservationVisible(false)}
//                 style={{
//                   backgroundColor: "red",
//                   paddingVertical: 10,
//                   paddingHorizontal: 20,
//                   borderRadius: 8,
//                   flex: 1,
//                   marginRight: 10,
//                   alignItems: "center",
//                 }}
//               >
//                 <Text style={{ fontWeight: 'bold' }}>Retour aux terrains</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 onPress={confirmReservation}
//                 style={{
//                   backgroundColor: "#28a745",
//                   paddingVertical: 10,
//                   paddingHorizontal: 20,
//                   borderRadius: 8,
//                   flex: 1,
//                   marginLeft: 10,
//                   alignItems: "center",
//                 }}
//               >
//                 <Text style={{ color: "white", fontWeight: "bold" }}>Choisir une date</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#2C3E50",
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
//     borderWidth: 3,
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
//     borderWidth: 2,
//   },
//   list: {
//     alignItems: "center",
//   },
//   card: {
//     borderRadius: 16,
//     padding: 12,
//     margin: 8,
//     width: width * 0.45,
//     elevation: 4,
//     borderWidth: 3,
//   },
//   title: {
//     fontWeight: "bold",
//     fontSize: 16,
//     marginBottom: 4,
//   },
//   subtitle: {
//     fontSize: 12,
//     color: "#444",
//     fontWeight: "bold",
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
//     backgroundColor: "#ff4d4d",
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//     marginTop: 8,
//     alignItems: "center",
//     borderWidth: 2,
//   },
//   mapButtonText: {
//     color: "white",
//     fontWeight: "bold",
//   },
//   reserveButton: {
//     backgroundColor: "#007bff",
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//     marginTop: 8,
//     alignItems: "center",
//     borderWidth: 2,
//   },
//   reserveButtonText: {
//     color: "white",
//     fontWeight: "bold",
//   },
// });

import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Modal,
  Platform,
  Linking,
} from "react-native";
import { getDatabase, ref, onValue } from "firebase/database";
import { FontAwesome } from "@expo/vector-icons";
import cong from "../../configuration";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  TerrainScreen: undefined;
  Reservation: { terrain: Terrain };
  Terrain: undefined;
};
type TerrainScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'TerrainScreen'
>;
type Terrain = {
  id: number;
  name: string;
  address?: string;
  sport: string;
};

type Props = {
  navigation: TerrainScreenNavigationProp;
  route: {
    params?: {
      sport?: string;
      ville?: string;
    };
  };
};

const openNativeMapApp = (address: string) => {
  const encodedAddress = encodeURIComponent(address);
  if (Platform.OS === "ios") {
    Linking.openURL(`http://maps.apple.com/?daddr=${encodedAddress}`);
  } else {
    Linking.openURL(`geo:0,0?q=${encodedAddress}`);
  }
};

const { width } = Dimensions.get("window");

const sportsList = [
  { label: "Football ⚽", value: "Football" },
  { label: "Basketball 🏀", value: "Basket-ball" },
  { label: "Tennis 🎾", value: "Tennis" },
  { label: "Rugby 🏉", value: "Rugby" },
  { label: "Volley 🏐", value: "Volley" },
  { label: "Boxe 🥊", value: "Boxe" },
];

// Mapping sport -> couleur (tout en minuscules)
const colorsBySport: { [key: string]: string } = {
  football: "#4CAF50",
  "basket-ball": "#FF9800",
  tennis: "#FFD700",
  rugby: "#F5F5DC",
  volley: "#B0C4DE",
  boxe: "#F44336",
};

export default function TerrainsScreen({ route }: Props) {
  const navigation = useNavigation<TerrainScreenNavigationProp>();
  const flatListRef = useRef<FlatList>(null);

  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [selectedSport, setSelectedSport] = useState(route?.params?.sport || "");
  const [selectedCity, setSelectedCity] = useState(route?.params?.ville || "");
  const [expandedCards, setExpandedCards] = useState<{ [key: string]: boolean }>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [modalReservationVisible, setModalReservationVisible] = useState(false);
  const [selectedTerrain, setSelectedTerrain] = useState<Terrain | null>(null);

  useEffect(() => {
    const database = getDatabase(cong);
    const dbRef = ref(database, "/");

    onValue(dbRef, (snapshot) => {
      const value = snapshot.val();
      if (value) {
        const items = Object.values(value);
        setData(items);
      }
    });
  }, []);

  useEffect(() => {
    const filtered = data.filter((item: any) => {
      const sportMatch = selectedSport
        ? item["Activités Proposés"]?.toLowerCase().includes(selectedSport.toLowerCase())
        : true;
      const cityMatch = selectedCity
        ? item.adresse?.toLowerCase().includes(selectedCity.toLowerCase())
        : true;
      return sportMatch && cityMatch;
    });
    setFilteredData(filtered);
  }, [data, selectedSport, selectedCity]);

  const toggleExpand = (index: number) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleReset = () => {
    setSelectedCity("");
    setSelectedSport("");
  };

  const handleReservePress = (terrain: Terrain) => {
    setSelectedTerrain(terrain);
    setModalReservationVisible(true);
  };

  const confirmReservation = () => {
    setModalReservationVisible(false);
    if (selectedTerrain) {
      navigation.navigate("Reservation", { terrain: selectedTerrain });
    }
  };

  const renderItem = ({ item, index }: any) => {
    const rawSport = item["Activités Proposés"] || item.type || "";
    const sportKey = rawSport.trim().toLowerCase();
    const backgroundColor = colorsBySport[sportKey] || "#32CD32";

    return (
      <TouchableOpacity
        style={[styles.card, { backgroundColor }]}
        onPress={() => toggleExpand(index)}
      >
        <Text style={styles.title}>{item.nom}</Text>
        <Text style={styles.subtitle}>{item.adresse}</Text>
        <Text style={styles.subtitle}>{item.type}</Text>

        {expandedCards[index] && (
          <>
            {item.téléphone && (
              <>
                <Text style={{ fontWeight: "bold" }}>Téléphone :</Text>
                <Text>{item.téléphone}</Text>
              </>
            )}
            {item["Activités Proposés"] && (
              <>
                <Text style={{ fontWeight: "bold" }}>Activités proposées :</Text>
                <Text>{item["Activités Proposés"]}</Text>
              </>
            )}
          </>
        )}
        <TouchableOpacity onPress={() => toggleExpand(index)}>
          <Text style={{ color: "#007bff", marginTop: 6 }}>
            {expandedCards[index] ? "Moins d'infos" : "Plus d'infos"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.mapButton} onPress={() => openNativeMapApp(item.adresse)}>
          <Text style={styles.mapButtonText}>🗺️ S'y Rendre</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.reserveButton}
          onPress={() =>
            handleReservePress({
              id: item.id || index,
              name: item.nom,
              address: item.adresse,
              sport: rawSport,
            })
          }
        >
          <Text style={styles.reserveButtonText}>Réserver</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.filterContainer}>
          <View style={styles.inputGroup}>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setModalVisible(true)}
              activeOpacity={0.7}
            >
              <Text style={{ color: selectedSport ? "black" : "#883" }}>
                {sportsList.find((s) => s.value === selectedSport)?.label || "Sélectionnez un sport"}
              </Text>
            </TouchableOpacity>

            <TextInput
              placeholder="Ville (ex: Paris)"
              placeholderTextColor="#888"
              value={selectedCity}
              onChangeText={setSelectedCity}
              style={styles.input}
            />
          </View>

          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <FontAwesome name="ban" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <FlatList
          ref={flatListRef}
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.list}
          numColumns={2}
          // Important : active le scroll ici
          scrollEnabled={true}
        />

        {/* Modal sélection sport */}
        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Choisissez un sport</Text>
              {sportsList.map((sport) => (
                <TouchableOpacity
                  key={sport.value}
                  style={styles.modalItem}
                  onPress={() => {
                    setSelectedSport(sport.value);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{sport.label}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalCancel}>
                <Text style={{ color: "red", fontWeight: "bold" }}>Annuler</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal confirmation prix */}
        <Modal visible={modalReservationVisible} transparent animationType="fade">
          <View style={styles.modalBackground}>
            <View style={[styles.modalContent, { width: 300, padding: 20 }]}>
              <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 15 }}>
                Prix pour la réservation
              </Text>
              <Text style={{ fontSize: 16, marginBottom: 10 }}>
                <Text style={{ fontWeight: "bold" }}>Terrain : </Text>{selectedTerrain?.name}
              </Text>
              <Text style={{ fontSize: 16, marginBottom: 20 }}>
                Prix : <Text style={{ fontWeight: "bold" }}>20 €</Text>
              </Text>

              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <TouchableOpacity
                  onPress={() => setModalReservationVisible(false)}
                  style={{
                    backgroundColor: "red",
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 8,
                    flex: 1,
                    marginRight: 10,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontWeight: 'bold' }}>Retour aux terrains</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={confirmReservation}
                  style={{
                    backgroundColor: "#28a745",
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 8,
                    flex: 1,
                    marginLeft: 10,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>Choisir une date</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Bouton flottant "Retour en haut" */}
        <TouchableOpacity style={styles.scrollTopButton} onPress={scrollToTop}>
          <Text style={styles.scrollTopButtonText}>↑ Haut</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2C3E50",
    padding: 10,
    paddingTop: 100,
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  inputGroup: {
    flex: 1,
  },
  input: {
    backgroundColor: "white",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 3,
  },
  resetButton: {
    marginLeft: 10,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    width: 45,
    borderWidth: 2,
  },
  list: {
    alignItems: "center",
  },
  card: {
    borderRadius: 16,
    padding: 12,
    margin: 8,
    width: width * 0.45,
    elevation: 4,
    borderWidth: 3,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: "#444",
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "white",
    marginHorizontal: 30,
    borderRadius: 10,
    paddingVertical: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    alignSelf: "center",
  },
  modalItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  modalItemText: {
    fontSize: 16,
  },
  modalCancel: {
    paddingVertical: 15,
    alignItems: "center",
  },
  mapButton: {
    backgroundColor: "#ff4d4d",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 8,
    alignItems: "center",
    borderWidth: 2,
  },
  mapButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  reserveButton: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 8,
    alignItems: "center",
    borderWidth: 2,
  },
  reserveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  scrollTopButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    zIndex: 10,
  },
  scrollTopButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});