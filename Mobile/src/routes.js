import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const AppStack = createStackNavigator();

import Scanner from "./pages/BarCodeScanner/BarCode";
import Shipments from "./pages/Shipments";

export default function src() {
    return (
        <NavigationContainer>
            <AppStack.Navigator>
                <AppStack.Screen name="Shipments" component={Shipments} />
                <AppStack.Screen
                    name="Scanner"
                    component={Scanner}
                    options={{ headerShown: false }}
                />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}
