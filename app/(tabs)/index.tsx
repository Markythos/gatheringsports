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