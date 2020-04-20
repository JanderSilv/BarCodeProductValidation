import react from "react";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    fileSelection: {
        width: 200,
        height: 100,
        marginTop: 15,
        borderRadius: 20,
        borderColor: "gray",
        borderStyle: "dashed",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    fileSelected: {
        width: 270,
        height: 100,
        marginTop: 15,
        borderRadius: 20,
        borderColor: "gray",
        borderStyle: "dashed",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },

    fileSelectedContainer: {
        flexDirection: "row-reverse",
        justifyContent: "center",
        alignItems: "center",
    },

    sendButton: {
        width: 100,
        height: 30,
        marginTop: 15,
        borderRadius: 50,
        backgroundColor: "#4f9ca8",

        alignItems: "center",
        justifyContent: "center",
    },

    sendButtonDisabled: {
        width: 100,
        height: 30,
        marginTop: 15,
        borderRadius: 50,
        backgroundColor: "gray",

        alignItems: "center",
        justifyContent: "center",
    },
});
