import React from "react";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    shipment: {
        width: "100%",
        minHeight: 60,
        marginBottom: 10,
        marginRight: 20,
        paddingHorizontal: 10,

        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: "#ebebeb",

        // flexWrap: "wrap",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    shipmentTexts: {
        // width: 10,
        flexDirection: "column",
        alignItems: "center",
    },
});
