import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import BarcodeMask from "react-native-barcode-mask";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BrinksLogo from "../../assets/logo/brinks_logo.png";

import { style } from "./styles";

export default function App() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [productID, setProductID] = useState();

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setProductID(data);
        alert(`Código de barra do tipo ${type} e id ${data} foi escaneado!`);
    };

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={{ flex: 1 }}>
            <Camera
                style={{ flex: 0.8 }}
                type={Camera.Constants.Type.back}
                ratio="16:9"
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            >
                <View style={style.cameraContainer}>
                    <BarcodeMask
                        edgeColor={"#2E74FF"}
                        showAnimatedLine={true}
                    />
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <Image
                            source={BrinksLogo}
                            style={scanned ? style.logoScanned : style.logo}
                        />
                    </View>
                    {scanned && (
                        <View style={style.buttonContainer}>
                            <TouchableOpacity
                                style={style.button}
                                onPress={() => setScanned(false)}
                            >
                                <Text style={style.buttonText}>
                                    Scanear Novamente
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </Camera>
            <View
                style={{
                    paddingTop: 20,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                }}
            >
                <MaterialCommunityIcons
                    name="barcode-scan"
                    size={25}
                    color="#000"
                />
                <Text style={{ marginLeft: 10, fontSize: 16 }}>
                    {productID}
                </Text>
            </View>
        </View>
    );
}
