import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function AdminButton() {
    const navigation = useNavigation();

    function GoToAdminPage() {
        navigation.navigate("Administrator");
    }
    return (
        <TouchableOpacity
            style={{
                width: 75,
                height: 23,
                marginRight: 10,

                backgroundColor: "white",
                borderRadius: 50,

                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
            }}
            onPress={GoToAdminPage}
        >
            <Ionicons name="ios-person" size={20} color="#505050" />
            <Text style={{ fontSize: 14, color: "#505050", marginLeft: 5 }}>
                Admin
            </Text>
        </TouchableOpacity>
    );
}
