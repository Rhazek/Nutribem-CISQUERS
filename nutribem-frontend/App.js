import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import UserInfoScreen from "./screens/UserInfoScreen";
import HomeScreen from "./screens/HomeScreen";
import DoctorsScreen from "./screens/DoctorsScreen";
import DoctorProfileScreen from "./screens/DoctorProfileScreen";
import ScheduleScreen from "./screens/ScheduleScreen";
import ProfileScreen from "./screens/UserProfileScreen";
import LastAppointmentsScreen from "./screens/LastAppointmentsScreen";
import NotificationScreen from "./screens/NotificationScreen";
import MeuProgressoScreen from './screens/MeuProgressoScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="UserInfo" component={UserInfoScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Doctors" component={DoctorsScreen} />
        <Stack.Screen name="DoctorProfile" component={DoctorProfileScreen} />
        <Stack.Screen name="Schedule" component={ScheduleScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="LastAppointments" component={LastAppointmentsScreen}/>
        <Stack.Screen name="Notifications" component={NotificationScreen} />
        <Stack.Screen name="MeuProgresso" component={MeuProgressoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
