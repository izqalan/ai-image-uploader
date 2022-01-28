import React from 'react'
import { UserContextProvider, useUser } from './components/UserContext'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DefaultTheme, Provider as PaperProvider, Button } from 'react-native-paper';
import AuthScreen from './screens/AuthScreen'
import ProfileScreen from "./screens/ProfileScreen";
import MainScreen from "./screens/MainScreen";
import CameraScreen from './screens/CameraScreen';
import 'react-native-url-polyfill/auto';

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: '#845ee3',
    accent: '#4C2F96',
    text: '#444444',
  },
};

function LoggedInTabs() {
  return (
    <Tab.Navigator
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      barStyle={{ backgroundColor: theme.colors.primary }}
      shifting="true"
    >
      <Tab.Screen
        name="To Do"
        component={MainScreen}
        options={{
          tabBarLabel: 'Face Index',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="view-list" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Container = () => {
  const { user } = useUser()
  return user ? <LoggedInTabs /> : <AuthScreen />
}

export default function App() {
  return (
    <UserContextProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name={"UNITEN"}
              component={Container}
            />
            <Stack.Screen
              name={"CameraScreen"}
              component={CameraScreen}
              options={{
                title: 'Camera',
                headerTintColor: '#000000',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </UserContextProvider>
  )
}