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

    //#endregion BackButtonStyles
    backButtonContainer: {
        flex: 1,
        marginTop: 10,
        marginLeft: 10,
    },

    backButton: {
        width: 90,
        height: 30,
        backgroundColor: "white",
        borderRadius: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    //#endregion

    bottomContainer: {
        paddingTop: 20,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },

    finishedShipment: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
