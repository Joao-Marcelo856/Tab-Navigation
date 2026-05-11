import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootStackParamList, TabParamList } from "./types/navigation";

// Importa as telas corrigidas
import Ongs from "./screens/ongs";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Perfil from "./screens/Perfil";
import Detalhes from "./screens/Detalhes";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function TabNavigator({ route }: any) {
  const usuario = route.params?.usuario;
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Explorar"
        component={Home}
        initialParams={{ usuario }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        initialParams={{ usuario }}
      />
      <Tab.Screen
        name="Ongs"
        component={Ongs}
        initialParams={{ usuario }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigation() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen
        name="PetDetalhes"
        component={Detalhes}
        options={{ headerShown: true, title: 'Detalhes' }}
      />
    </Stack.Navigator>
  );
}