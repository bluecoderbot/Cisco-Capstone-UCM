import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    FlatList,
    StyleSheet,
    Button,
    KeyboardAvoidingView,
    TouchableOpacity
} from "react-native";

import { dummyData, COLORS, FONTS, icons } from "../../constants"

const serialEntries = ({navigation}) => {

    const [EnteredSerialNum, setEnteredSerialNum] = useState('');
    const [SerialNum, setSerialNum] = useState([]); //EMPTY ARRAY
    console.log(SerialNum);

    const serialInputHandler = (enteredText) => {
        setEnteredSerialNum(enteredText);
    };

    const addGoalHandler = () => {
        console.log(EnteredSerialNum); // Check to see if goal was saved correctly
        // ... Spread Operator, create new array and add all elements from old array
        // ...coursGoals is previous state, being updated with EnteredSerialNum
        // setSerialNum([...SerialNum, EnteredSerialNum]);
        // setSerialNum(currentGoals => [...currentGoals, EnteredSerialNum]);
        setSerialNum(currentGoals => [
            ...currentGoals,
            // { key: Math.random().toString(), value: EnteredSerialNum }
            { id: Math.random().toString(), value: EnteredSerialNum }
            // { id: Math.random().toString(), value: EnteredSerialNum }
        ]);
    }

    function renderHeader() {
        return (
            <View style={styles.headerContainer}>
                <View style={styles.header}>
                    <Text style={{ color: COLORS.white, ...FONTS.h1, fontSize: 25 }}>Box Cataloging</Text>
                </View>
            </View>
        )
    }

    function renderMessage() {
        return (
            <View style={styles.message}>
                <Text style={{ letterSpacing: 0, ...FONTS.body2 }}> Enter serial numbers for cataloging:</Text>
            </View>
        )
    }

    function renderSubmissionForm() {
        return (
            <KeyboardAvoidingView style={{ paddingTop: 0 }}>
                {/* Keyboard Avoiding View */}
                <View style={styles.inputContainer}>
                    <TextInput style={styles.submissionBox}
                        placeholder="Serial Number"
                        onChangeText={serialInputHandler}
                        value={EnteredSerialNum}
                    />
                    <TouchableOpacity title='Add' style={styles.button} onPress={addGoalHandler} > 
                        <Text style={{color: COLORS.primary,...FONTS.body3}}>Enter</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
    function renderSubmitButton() {

        useEffect(() => {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // id: '0'
                    name: 'SAMPLE',
                    // devices: "{0: 'abcdef', 1: '12345678',2: '11345678',3: '12145678',4: '12315678',5: '12341678',6: 'abcdeg',7: 'abcdeh'}"
                    devices: 'SerialNum'
                })
            };
            fetch('http://13.57.81.55/add_devices', requestOptions)
                .then((response) => response.json())
                // .then((json) => setData(json))
                .catch((error) => console.error(error))
    
        }, []);
        return (
            <View style={{ marginTop: 40 }}>
                <TouchableOpacity style={styles.submitButton}
                    // onPress = {() => this.login(this.state.projectCode)}>
                    onPress={() => navigation.navigate("landingPage")}> 
                    <Text style={styles.submitButtonText}> Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View>
            {renderHeader()}
            {renderMessage()}
            <View style={{ height: 280, marginBottom: 20 }}>
                <FlatList
                    keyExtractor={(item, index) => item.id}
                    data={SerialNum}
                    renderItem={itemData => (
                        <View style={styles.listItem}>
                            <Text style={styles.listItem}>{itemData.item.value}</Text>
                        </View>
                    )}
                />
            </View>
            {renderSubmissionForm()}
            {renderSubmitButton()}
        </View>
        
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
        marginTop: 150,
        alignItems: 'center',
    },
    submissionBox: {
        marginTop: 0,
        marginLeft: 10 ,
        backgroundColor: COLORS.textInput,
        borderRadius: 5,
        ...FONTS.body2,
        width: '75%'
    },
    button: {
        height: 50,
        backgroundColor: COLORS.landingPageBackround,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 0,
        width: 70,
        marginRight: 10
    },
    buttonText: {
        color: COLORS.primary,
        letterSpacing: 2,
        ...FONTS.body1
    },

    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 0
    },
    listItem: {
        marginLeft: 5,
        ...FONTS.body3
    },
    submitButton: {
        height: 60,
        backgroundColor: COLORS.landingPageBackround,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 50
    },
    submitButtonText: {
        color: COLORS.primary,
        letterSpacing: 2,
        ...FONTS.body1
    }

});

export default serialEntries;