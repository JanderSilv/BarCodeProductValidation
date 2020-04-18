import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Modal, StatusBar } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Camera } from "expo-camera";
import BarcodeMask from "react-native-barcode-mask";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useExitAppOnDoublePress } from "@shankarmorwal/react-native-exit-on-double-press";

import { style } from "./styles";
// import BrinksLogo from "../../assets/logo/brinks_logo.png";

export default function Scanner() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [productID, setProductID] = useState();
    const [quantity, setQuantity] = useState(0);
    const [isValid, setIsValid] = useState(null);

    useExitAppOnDoublePress({
        condition: true,
        message: "Aperte novamente para sair",
        timeout: 2000,
    });

    const navigation = useNavigation();
    const routes = useRoute();

    const shipment = routes.params.shipment;

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setProductID(data);
        if (data === shipment["manifest no."]) {
            setIsValid(true);
            setQuantity(quantity + 1);
        } else {
            setIsValid(false);
        }
    };

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor="black" barStyle="light-content" />
            <Camera
                style={{ flex: 0.9 }}
                type={Camera.Constants.Type.back}
                ratio="16:9"
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            >
                <View style={style.cameraContainer}>
                    <BarcodeMask
                        edgeColor={"#2E74FF"}
                        showAnimatedLine={true}
                    />
                    <View style={{ flex: 1, marginTop: 10, marginLeft: 10 }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Shipments")}
                            style={{
                                width: 90,
                                height: 30,
                                backgroundColor: "white",
                                borderRadius: 50,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <MaterialCommunityIcons
                                name="door-open"
                                size={20}
                                color="gray"
                            />
                            <Text style={{ color: "gray", marginLeft: 5 }}>
                                Voltar
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={{ flex: 1, alignItems: "center" }}>
                        <Image
                            source={BrinksLogo}
                            style={scanned ? style.logoScanned : style.logo}
                        />
                    </View> */}
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
            <View>
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
                <View style={{ marginTop: 20, alignItems: "center" }}>
                    <Text>
                        Quantidade: {quantity}/{shipment["delivery qty"]}
                    </Text>
                    {productID && (
                        <Text
                            style={[
                                { marginTop: 10, fontSize: 16 },
                                isValid ? { color: "green" } : { color: "red" },
                            ]}
                        >
                            {isValid ? "Produto Válido" : "Produto Inválido"}
                        </Text>
                    )}
                </View>
            </View>
        </View>
    );
}
