import React, { useState, useEffect } from "react";
import {
    View,
    FlatList,
    Text,
    TouchableOpacity,
    StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import api from "../../services/api";

import { style } from "./styles";

export default function Shipments() {
    const [shipments, setShipments] = useState([]);
    const numColumns = 2;

    const navigation = useNavigation();

    useEffect(() => {
        api.get("/shipments")
            .then((res) => {
                // console.log(res.data);
                setShipments(res.data);
            })
            .catch((error) => {
                console.log("Shipments => ", error);
            });
    }, []);

    function navigateToScanner(shipment) {
        navigation.reset({
            index: 0,
            routes: [{ name: "Scanner", params: { shipment: shipment } }],
        });
    }

    return (
        <View
            style={{
                flex: 1,
                paddingTop: 20,
                paddingHorizontal: 16,
            }}
        >
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <Text
                style={{ textAlign: "center", marginBottom: 20, fontSize: 20 }}
            >
                Escolha um pedido
            </Text>
            <FlatList
                data={shipments}
                keyExtractor={(shipment) => String(shipment["delivery no."])}
                showsVerticalScrollIndicator={false}
                numColumns={numColumns}
                renderItem={({ item: shipment }) => (
                    <View style={{ alignItems: "center" }}>
                        <TouchableOpacity
                            style={style.shipment}
                            onPress={() => navigateToScanner(shipment)}
                        >
                            <Text>Nº Pedido:</Text>
                            <Text>{shipment["delivery no."]}</Text>
                            <Text>Nº do Manifesto:</Text>
                            <Text>{shipment["manifest no."]}</Text>
                            <Text>Destino:</Text>
                            <Text>
                                {shipment.city}-{shipment.udf}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}
