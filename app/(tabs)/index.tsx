import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import SportsButtons from '../Screens/SportsButtons';
import Reservation from './Reservation';
import TerrainScreen from './Terrain';


type RootStackParamList = {
  Home: undefined;
  Sport: { sport: string; backgroundColor: string };
  Reservation: { terrain: { id: number; name: string; sport: string; address: string } };
  Terrain: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={SportsButtons} />
      <Stack.Screen name="Reservation" component={Reservation} />
      <Stack.Screen name="Terrain" component={TerrainScreen} />
    </Stack.Navigator>
  );
}