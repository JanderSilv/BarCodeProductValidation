import React, { useState, useEffect, Fragment } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import api from "../../services/api";
import { FontAwesome5 } from "@expo/vector-icons";

import { styles } from "./styles";

export default function Admnistrator() {
    const [excel, setExcel] = useState(null);

    function handleFileSelection() {
        DocumentPicker.getDocumentAsync({
            type: "*/*",
            copyToCacheDirectory: false,
        })
            .then((res) => {
                console.log(res);
                if (res.type === "cancel") return;
                else setExcel(res);
            })
            .catch((error) => {
                console.log("fileSelection =>" + error);
            });
    }

    function handleFileUpload() {
        let config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };
        let formData = new FormData();
        formData.append("file", excel);
        api.post(`/upload`, formData, config)
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log("serverUpload => " + error);
            });
    }

    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <Text style={{ fontSize: 16 }}>Faça o upload do Excel</Text>
            <TouchableOpacity
                style={!excel ? styles.fileSelection : styles.fileSelected}
                onPress={handleFileSelection}
            >
                {!excel ? (
                    <Fragment>
                        <Text style={{ marginBottom: 10 }}>
                            Selecione um arquivo
                        </Text>
                        <FontAwesome5
                            name="file-excel"
                            size={30}
                            color="gray"
                        />
                    </Fragment>
                ) : (
                    <View style={styles.fileSelectedContainer}>
                        <Text style={{ marginLeft: 10 }}>{excel.name}</Text>
                        <FontAwesome5
                            name="file-excel"
                            size={30}
                            color="green"
                        />
                    </View>
                )}
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleFileUpload}
                style={excel ? styles.sendButton : styles.sendButtonDisabled}
                disabled={excel ? false : true}
            >
                <Text style={{ fontSize: 14, color: "white" }}>Enviar</Text>
            </TouchableOpacity>
        </View>
    );
}
