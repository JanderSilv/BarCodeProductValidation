import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const AppStack = createStackNavigator();

import Shipments from "./pages/Shipments";
import Administrator from "./pages/Admnistrator";
import Scanner from "./pages/BarCodeScanner/BarCode";

import AdminButton from "./components/shipments/adminButton";

export default function src() {
    return (
        <NavigationContainer>
            <AppStack.Navigator>
                <AppStack.Screen
                    name="Shipments"
                    options={{
                        headerTitle: "Pedidos",
                        headerStyle: {
                            backgroundColor: "#163e7a",
                        },
                        headerTintColor: "white",
                        headerRight: () => <AdminButton />,
                    }}
                    component={Shipments}
                />
                <AppStack.Screen
                    name="Scanner"
                    component={Scanner}
                    options={{ headerShown: false }}
                />
                <AppStack.Screen
                    name="Administrator"
                    component={Administrator}
                    options={{ title: "Administrador" }}
                />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}
