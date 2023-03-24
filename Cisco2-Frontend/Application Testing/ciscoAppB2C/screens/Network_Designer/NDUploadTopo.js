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

// Instead of dummyData create a .js file that will make send Project Code to backend
import { dummyData, COLORS, FONTS, icons } from "../../constants"

function NDUploadTopo({navigation}){

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
                <Text style={{ letterSpacing: 1, ...FONTS.h2 }}> Enter Topology: </Text>
            </View>
        )
    }

    function renderSubmissionBox() {
        return (
            <View style={{ marginTop: 0 }}>
                <TextInput style={styles.submissionBox}
                    placeholder="Topology :"
                    editable
                    multiline
                />
            </View>
        )
    }

    function renderSubmitButton() {
        return (
            <View style={{ marginTop: 25 }}>
                <TouchableOpacity style={styles.button}
                    onPress={() => navigation.navigate("ND Confirmed")}>
                    <Text style={styles.buttonText}> Upload Topology</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <KeyboardAvoidingView>
            {renderHeader()}
            {renderIntroMessage()}
            {renderSubmissionBox()}
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
        paddingTop: 150,
        paddingBottom: 0,
        alignItems: 'center',
    },
    submissionBox: {
        
        marginTop: 0,
        height: 400,
        marginHorizontal: 37,
        backgroundColor: COLORS.textInput,
        borderRadius: 5,
        borderWidth: 1,
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

export default NDUploadTopo;