import React from "react";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        backgroundColor: "transparent",
        // flexDirection: "row",
    },

    //#region ButtonStyles
    buttonContainer: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 100,
    },

    button: {
        backgroundColor: "#2E74FF",
        width: 200,
        height: 50,
        borderRadius: 10,
        justifyContent: "center",
    },

    buttonText: {
        fontSize: 16,
        color: "white",
        textAlign: "center",
    },
    //#endregion

    //#region LogoStyles
    logoScanned: {
        flex: 1,
        width: "50%",
        resizeMode: "contain",
    },

    logo: {
        flex: 1,
        width: "50%",
        resizeMode: "contain",
        position: "absolute",
        top: 0,
    },
    //#endregion
});
