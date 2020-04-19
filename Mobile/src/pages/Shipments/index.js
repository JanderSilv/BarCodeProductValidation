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

    const navigation = useNavigation();

    useEffect(() => {
        api.get("/shipments")
            .then((res) => {
                // console.log(res.data);
                setShipments(res.data);
            })
            .catch((error) => {
                console.log("Shipments =>", error);
            });
    }, []);

    function navigateToScanner(shipment) {
        navigation.reset({
            index: 0,
            routes: [{ name: "Scanner", params: { shipment: shipment } }],
        });
    }

    const shipmentList = ({ item: shipmentsArray }) => {
        return shipmentsArray.map((shipment) => {
            return (
                <View
                    key={shipment["delivery no."]}
                    style={{
                        alignItems: "center",
                        paddingLeft: 20,
                        paddingRight: 5,
                    }}
                >
                    <TouchableOpacity
                        style={style.shipment}
                        onPress={() => navigateToScanner(shipment)}
                    >
                        <View style={style.shipmentTexts}>
                            <Text>Nº Pedido:</Text>
                            <Text>{shipment["delivery no."]}</Text>
                        </View>
                        <View style={style.shipmentTexts}>
                            <Text>Nº do Manifesto:</Text>
                            <Text>{shipment["manifest no."]}</Text>
                        </View>
                        <View style={[style.shipmentTexts, { maxWidth: 150 }]}>
                            <Text>Destino:</Text>
                            <Text>
                                {shipment.city}-{shipment.udf}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        });
    };

    return (
        <View
            style={{
                flex: 1,
                paddingTop: 20,
                // paddingHorizontal: 16,
            }}
        >
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <Text
                style={{ textAlign: "center", marginBottom: 20, fontSize: 20 }}
            >
                Escolha um pedido
            </Text>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={shipments}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={shipmentList}
                />
            </View>
        </View>
    );
}
