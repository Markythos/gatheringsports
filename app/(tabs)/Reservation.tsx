// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
// import { useRoute } from '@react-navigation/native';
// import { Calendar, DateData } from 'react-native-calendars';

// type Terrain = {
//   id: number;
//   name: string;
//   address?: string;
//   sport: string;
// };

// type RootStackParamList = {
//   Home: undefined;
//   Sport: { sport: string; backgroundColor: string };
//   Reservation: { terrain: { id: number; name: string; sport: string; address: string } };
// };

// export default function Reservation() {
//   const route = useRoute();
//   const { terrain } = route.params as { terrain: Terrain };

//   const [selectedDate, setSelectedDate] = useState<string | null>(null);
//   const [selectedHour, setSelectedHour] = useState<string | null>(null);

//   const availableHours = ['10:00', '11:00', '14:00', '15:00', '16:00', '18:00'];

//   const handleDateSelect = (day: DateData) => {
//     setSelectedDate(day.dateString);
//     setSelectedHour(null); // reset hour on date change
//   };

//   const handleHourSelect = (hour: string) => {
//     setSelectedHour(hour);
//     console.log(`Réservation de ${terrain.name} le ${selectedDate} à ${hour}`);
//     // Tu peux ensuite envoyer ça à une API ou le stocker
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Réserver : {terrain.name}</Text>
//       {terrain.address && <Text style={styles.subtitle}>{terrain.address}</Text>}

//       <Calendar
//         onDayPress={handleDateSelect}
//         markedDates={
//           selectedDate
//             ? { [selectedDate]: { selected: true, selectedColor: '#ff5733' } }
//             : {}
//         }
//       />

//       {selectedDate && (
//         <>
//           <Text style={styles.sectionTitle}>Créneaux le {selectedDate}</Text>
//           <FlatList
//             data={availableHours}
//             keyExtractor={(item) => item}
//             horizontal
//             contentContainerStyle={styles.hoursContainer}
//             renderItem={({ item }) => (
//               <TouchableOpacity
//                 style={[
//                   styles.hourButton,
//                   selectedHour === item && styles.hourButtonSelected,
//                 ]}
//                 onPress={() => handleHourSelect(item)}
//               >
//                 <Text
//                   style={[
//                     styles.hourText,
//                     selectedHour === item && styles.hourTextSelected,
//                   ]}
//                 >
//                   {item}
//                 </Text>
//               </TouchableOpacity>
//             )}
//           />
//         </>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: '#fff' },
//   title: { fontSize: 22, fontWeight: 'bold', marginBottom: 5 },
//   subtitle: { fontSize: 16, color: '#555', marginBottom: 15 },
//   sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
//   hoursContainer: { gap: 10 },
//   hourButton: {
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     borderRadius: 10,
//     backgroundColor: '#e0e0e0',
//     marginRight: 10,
//   },
//   hourButtonSelected: {
//     backgroundColor: '#ff5733',
//   },
//   hourText: {
//     fontSize: 16,
//     color: '#000',
//   },
//   hourTextSelected: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';

// 📆 Configuration locale en français
LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
  ],
  monthNamesShort: [
    'Janv.', 'Févr.', 'Mars', 'Avr.', 'Mai', 'Juin',
    'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.',
  ],
  dayNames: [
    'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi',
  ],
  dayNamesShort: [
    'Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.',
  ],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = 'fr';

type Terrain = {
  id: number;
  name: string;
  address?: string;
  sport: string;
};

export default function Reservation() {
  const route = useRoute();
  const { terrain } = route.params as { terrain: Terrain };

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);

  const availableHours = ['10:00', '11:00', '14:00', '15:00', '16:00', '18:00'];

  const handleDateSelect = (day: DateData) => {
    setSelectedDate(day.dateString);
    setSelectedHour(null);
  };

  const handleHourSelect = (hour: string) => {
    setSelectedHour(hour);
  };

  const handleValidate = () => {
    if (selectedDate && selectedHour) {
      console.log(`Réservation confirmée pour ${terrain.name} le ${selectedDate} à ${selectedHour}`);
    } else {
      console.log("Veuillez sélectionner une date et un horaire.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Réserver : {terrain.name}</Text>
        {terrain.address && <Text style={styles.subtitle}>{terrain.address}</Text>}

        <Calendar
          onDayPress={handleDateSelect}
          markedDates={
            selectedDate
              ? { [selectedDate]: { selected: true, selectedColor: '#ff5733' } }
              : {}
          }
          firstDay={1} // Commencer par lundi
        />

        {selectedDate && (
          <>
            <Text style={styles.sectionTitle}>Créneaux le {selectedDate}</Text>
            <FlatList
              data={availableHours}
              keyExtractor={(item) => item}
              horizontal
              contentContainerStyle={styles.hoursContainer}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.hourButton,
                    selectedHour === item && styles.hourButtonSelected,
                  ]}
                  onPress={() => handleHourSelect(item)}
                >
                  <Text
                    style={[
                      styles.hourText,
                      selectedHour === item && styles.hourTextSelected,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              showsHorizontalScrollIndicator={false}
            />

            <TouchableOpacity style={styles.validateButton} onPress={handleValidate}>
              <Text style={styles.validateButtonText}>Valider la réservation</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  hoursContainer: {
    gap: 10,
    marginBottom: 20,
  },
  hourButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    marginRight: 10,
  },
  hourButtonSelected: {
    backgroundColor: '#ff5733',
  },
  hourText: {
    fontSize: 16,
    color: '#000',
  },
  hourTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  validateButton: {
    backgroundColor: '#ff5733',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  validateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

