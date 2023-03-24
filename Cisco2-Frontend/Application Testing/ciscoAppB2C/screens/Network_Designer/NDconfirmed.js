import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    KeyboardAvoidingView,
    TextInput
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { dummyData, COLORS, FONTS, icons } from "../../constants"

function NDconfirmed({navigation}){

    function renderHeader() {
        return (
            <View style={styles.headerContainer}>
                <View style={styles.header}>
                    <Text style={{ color: COLORS.white, ...FONTS.h1, fontSize: 25 }}>Hello, Network Designer!</Text>
                </View>
            </View>
        )
    }

    function renderIntroMessage() {
        return (
            <View style={styles.message}>
                <Text style={{ letterSpacing: 1, ...FONTS.h2 }}> Topology has been confirmed </Text>
            </View>
        )
    }

    function renderSubmitButton() {
        return (
            <View style={{ marginTop: 375 }}>
                <TouchableOpacity style={styles.button}
                    onPress={() => navigation.navigate("landingPage")}>
                    <Text style={styles.buttonText}> Main Menu</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <KeyboardAvoidingView>
            {renderHeader()}
            {renderIntroMessage()}
            {renderSubmitButton()}
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
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
    message: {
        paddingTop: 155,
        alignItems: 'center',
    },
    submissionBox: {
        marginTop: 5,
        marginHorizontal: 37,
        backgroundColor: COLORS.textInput,
        borderRadius: 5,
        ...FONTS.body2
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

export default NDconfirmed;