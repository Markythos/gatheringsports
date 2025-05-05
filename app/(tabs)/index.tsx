import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import SportsButtons from '../Screens/SportsButtons';
import SportScreen from '../Screens/SportsScreen';

type RootStackParamList = {
  Home: undefined;
  Sport: { sport: string; backgroundColor: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={SportsButtons} />
      <Stack.Screen name="Sport" component={SportScreen} />
    </Stack.Navigator>
  );
}