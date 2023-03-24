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

function NDEnterPC({navigation}){
// const WWLandingPage = ({ navigation }) => {

    // const state = {
    //     projectCode: ''
    // }
    // handleProjectCode = (text) => {
    //     this.setState({ projectCode: text })
    // }

    // login = (projectCode) => {
    //     alert('Project Code: ' + projectCode)
    //  }

    function renderHeader() {
        return (
            <View style={styles.headerContainer}>
                <View style={styles.header}>
                    <Text style={{ color: COLORS.white, ...FONTS.h1, fontSize: 25 }}>Hello, Network Designer!</Text>
                </View>
            </View>
        )
    }

    function renderBackButton() {
        return (
            <View style={{ marginTop: 140, paddingLeft: 15, alignItems: 'flex-start' }}>
                <TouchableOpacity style={styles.backButton}
                    onPress={() => navigation.navigate("Network Designer")}>
                    <Image
                        source={icons.backBlack}
                        resizeMode='center'
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function renderIntroMessage() {
        return (
            <View style={styles.message}>
                <Text style={{ letterSpacing: 1, ...FONTS.h2 }}> Enter project code to login: </Text>
            </View>
        )
    }

    function renderSubmissionBox() {
        return (
            <View style={{ marginTop: 0 }}>
                <TextInput style={styles.submissionBox}
                    placeholder="Project Code"
                    // onChangeText={this.handleProjectCode}
                />
            </View>
        )
    }

    function renderSubmitButton() {
        return (
            <View style={{ marginTop: 300 }}>
                <TouchableOpacity style={styles.button}
                    // onPress = {() => this.login(this.state.projectCode)}>
                    onPress={() => navigation.navigate("ND Upload")}> 
                    <Text style={styles.buttonText}> Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <KeyboardAvoidingView>
            {renderHeader()}
            {renderBackButton()}
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
    backButton: {
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    message: {
        paddingTop: 55,
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

export default NDEnterPC;