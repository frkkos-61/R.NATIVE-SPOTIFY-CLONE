import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';

import ProfileScreen from '../screens/ProfileScreen';
import SonginfoScreen from '../screens/SonginfoScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import SongsScreen from '../screens/SongsScreen';

const Tab = createBottomTabNavigator();

//* Burada Nav.Con içine dahil etmek için, dışarıda bir sabit ile tanımlayıp, gerekli sayfalara verilmesini sağladık.
const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#131624',
          shadowOpacity: 0.3,
          shadowRadius: 4,
          shadowOffset: {
            width: 0,
            height: -10,
          },
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 60,
          borderEndWidth: 0,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarLabelStyle: {color: 'white', fontSize: 14, fontWeight: '500'},
          tabBarIcon: ({focused}) =>
            focused ? (
              <Entypo name="home" color="white" size={24} />
            ) : (
              <AntDesign name="home" color="white" size={24} />
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarLabelStyle: {color: 'white', fontSize: 13, fontWeight: '500'},
          tabBarIcon: ({focused}) =>
            focused ? (
              <Entypo name="user" color="white" size={24} />
            ) : (
              <AntDesign name="user" color="white" size={24} />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={BottomTabs} />
        <Stack.Screen name="Songs" component={SongsScreen} />
        <Stack.Screen name="Info" component={SonginfoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
