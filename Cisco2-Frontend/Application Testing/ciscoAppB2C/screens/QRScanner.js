import React from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

import { dummyData, COLORS, SIZES, FONTS, icons, images } from "../constants"

// QR Scanner with a text input, and text input should make a request to backend 
// depending on what the input is and retrieve instructions for specific switch/ server

const QRScanner = () =>{

    function renderHeader() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={{ color: COLORS.white, ...FONTS.h1 }}>QR Scanner</Text>
                </View>
            </View>
        )
    }

    return(
        <View>
            {renderHeader()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        backgroundColor: COLORS.landingPageBackround,
        height: 130,
        width: "100%",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingTop: 75,
        paddingLeft: 25
    },
    button: {
        height: 60,
        backgroundColor: COLORS.landingPageBackround,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 50
    },
    buttonText: {
        color: COLORS.primary,
        letterSpacing: 2,
        ...FONTS.body1
    }
});

export default QRScanner;
