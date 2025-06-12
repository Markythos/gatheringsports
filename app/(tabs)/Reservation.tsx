import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
  Platform,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';
import { Audio } from 'expo-av';
import * as CalendarAPI from 'expo-calendar';
import Entypo from '@expo/vector-icons/Entypo';

LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
  ],
  monthNamesShort: [
    'Janv.', 'Févr.', 'Mars', 'Avr.', 'Mai', 'Juin',
    'Juil.', 'Août.', 'Sept.', 'Oct.', 'Nov.', 'Déc.',
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

const PRIX_RESERVATION = 20; // Prix fixe pour une réservation

export default function Reservation() {
  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params as { terrain?: Terrain };
  

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [reservationInfo, setReservationInfo] = useState<{ date: string; hour: string; terrainName: string } | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const availableHours = ['10:00', '11:00', '14:00', '15:00', '16:00', '18:00'];

  const handleDateSelect = (day: DateData) => {
    setSelectedDate(day.dateString);
    setSelectedHour(null);
  };

  const handleHourSelect = (hour: string) => {
    setSelectedHour(hour);
  };

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/sounds/notif.mp3')
    );
    setSound(sound);
    await sound.playAsync();
  }

  async function addEventToCalendar(title: string, dateString: string, hourString: string) {
    const { status } = await CalendarAPI.requestCalendarPermissionsAsync();
    if (status === 'granted') {
      const calendars = await CalendarAPI.getCalendarsAsync(CalendarAPI.EntityTypes.EVENT);
      const defaultCalendar = calendars.find(cal => cal.allowsModifications) || calendars[0];

      if (!defaultCalendar) {
        alert("Aucun calendrier modifiable trouvé.");
        return;
      }

      const [hour, minute] = hourString.split(':').map(Number);
      const startDate = new Date(dateString);
      startDate.setHours(hour, minute, 0, 0);
      const endDate = new Date(startDate);
      endDate.setHours(endDate.getHours() + 1);

      await CalendarAPI.createEventAsync(defaultCalendar.id, {
        title: `Réservation : ${title}`,
        startDate,
        endDate,
        timeZone: 'Europe/Paris',
        location: '',
        notes: `Réservation du terrain ${title}`,
      });
    } else {
      alert("Permission au calendrier refusée");
    }
  }

  const handleValidation = async () => {
    if (selectedDate && selectedHour) {
      setConfirmationVisible(true);
    } else {
      alert('Veuillez sélectionner une date et un créneau horaire.');
    }
  };

  const confirmReservation = async () => {
    setConfirmationVisible(false);
    setReservationInfo({
      date: selectedDate!,
      hour: selectedHour!,
      terrainName: terrain.name,
    });
    setModalVisible(true);
    await playSound();
    await addEventToCalendar(terrain.name, selectedDate!, selectedHour!);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedDate(null);
    setSelectedHour(null);
    setReservationInfo(null);
    if (sound) {
      sound.unloadAsync();
      setSound(null);
    }
    navigation.navigate('Terrain');
  };

  if (!params?.terrain) {
    return (
      <View style={{ flex: 1, padding: 20, justifyContent: "center", backgroundColor: "#2C3E50"}}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', backgroundColor: '#8E44AD', padding: 16, borderRadius: 12, borderColor: 'black', borderWidth: 3, textAlign: 'center',marginBottom: 10,}}>Aucun terrain sélectionné</Text>
      </View>
    );
  }

  const { terrain } = params;

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      {/* Bouton pour changer de terrain */}
      <TouchableOpacity
        style={styles.changeTerrainButton}
        onPress={() => {
          setSelectedDate(null);
          setSelectedHour(null);
          setReservationInfo(null);
          setModalVisible(false);
          setConfirmationVisible(false);
          navigation.navigate('Terrain');
        }}
      >
        <Text style={styles.changeTerrainText}>← Changer de terrain</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Terrain : {terrain.name}</Text>
      {terrain.address && <Text style={styles.subtitle}>🗺️​ ​{terrain.address}</Text>}

      <Calendar
        onDayPress={handleDateSelect}
        markedDates={selectedDate ? { [selectedDate]: { selected: true, selectedColor: '#ff5733' } } : {}}
        firstDay={1}
        theme={{
          backgroundColor: '#2C3E50',
          calendarBackground: '#2C3E50',
          textSectionTitleColor: 'white',
          selectedDayBackgroundColor: '#FFD700',
          selectedDayTextColor: '#000',
          todayTextColor: '#ff5733',
          dayTextColor: '#fff',
          textDisabledColor: '#888',
          dotColor: '#FFD700',
          selectedDotColor: '#000',
          arrowColor: 'green',
          monthTextColor: '#FFF8DC',
          indicatorColor: '#FFD700',
          textDayFontWeight: '500',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '700',
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 14,
        }}
      />

      {selectedDate && (
        <>
          <Text style={styles.sectionTitle}>Créneaux pour le {new Date(selectedDate).toLocaleDateString('fr-FR')}</Text>
          <FlatList
            data={availableHours}
            keyExtractor={(item) => item}
            horizontal
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.hourButton, selectedHour === item && styles.hourButtonSelected]}
                onPress={() => handleHourSelect(item)}
              >
                <Text style={[styles.hourText, selectedHour === item && styles.hourTextSelected]}>{item}</Text>
              </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 10 }}
            nestedScrollEnabled={true}

          />

          <TouchableOpacity style={styles.validateButton} onPress={handleValidation}>
            <Text style={styles.validateButtonText}>Valider la réservation</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Modal de confirmation */}
      <Modal
        visible={confirmationVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setConfirmationVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirmer la réservation</Text>
            <Text style={styles.modalText}>Souhaitez-vous réserver le terrain "{terrain.name}" le {selectedDate && new Date(selectedDate).toLocaleDateString('fr-FR')} à {selectedHour} ?</Text>
            <Text style={styles.modalText}>Prix à payer : {PRIX_RESERVATION}€</Text>
            <View style={{ flexDirection: 'row', gap: 20 }}>
              <TouchableOpacity style={styles.modalButton} onPress={() => setConfirmationVisible(false) }>
                <Text style={styles.modalButtonText}>Non</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={confirmReservation}>
                <Text style={styles.modalButtonText}>Oui</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de succès */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Entypo name="check" size={48} color="green" />
            <Text style={styles.modalTitle}>Réservation réussie !</Text>
            <Text style={styles.modalText}>Votre réservation pour le terrain "{reservationInfo?.terrainName}" a été enregistrée.</Text>
            <Text style={styles.modalText}>Date : {reservationInfo?.date}</Text>
            <Text style={styles.modalText}>Heure : {reservationInfo?.hour}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleCloseModal}>
              <Text style={styles.modalButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#2C3E50',
    paddingTop: 50,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  changeTerrainButton: {
    marginBottom: 10,
    padding: 12,
    backgroundColor: '#34495E',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
  },
  changeTerrainText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    backgroundColor: '#ff5733',
    padding: 16,
    borderRadius: 12,
    borderColor: 'black',
    borderWidth: 3,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: "white",
  },
  hoursContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 10,
    minHeight: 60,
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
    marginTop: 20,
    marginBottom: 55,
    borderWidth: 2,
  },
  validateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#ff5733',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginHorizontal: 10,
    minWidth: 80,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});