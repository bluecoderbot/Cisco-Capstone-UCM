import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    FlatList,
    Image,
    ImageBackground,
    SafeAreaView,
    TouchableOpacity
} from "react-native";

import { dummyData, COLORS, SIZES, FONTS, icons, images } from "../../constants"

const switch2Instructions = ({navigation}) => {

    // const [output, setOutputLog] = React.useState(dummyData.outputLog);

    const [switchData, setSwitchData] = React.useState(dummyData.switchData);

    function renderHeader() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={{ color: COLORS.white, ...FONTS.h1 }}>{switchData.switches[1].name}</Text>
                </View>
            </View>
        )
    }

    function renderInstructions() {
        const renderItem = ({ item }) => (
            <View style={{
                paddingHorizontal: 20,
                paddingVertical: 5,
            }}>
                <View
                    style={{
                        width: "100%",
                        height: 50,
                        padding: 10,
                        borderRadius: 15,
                        backgroundColor: COLORS.secondary
                    }}
                >
                    <Text style={{ ...FONTS.body4 }}>{item}</Text>
                    {/* <Text style={{ ...FONTS.body3 }}>{item.description}</Text> */}
                </View>
            </View>
        )

        return (
            <View>
                <FlatList
                    contentContainerStyle={{ marginTop: 0 }}
                    data={switchData.switches[1].instructions}
                    renderItem={renderItem}
                    // keyExtractor={item => '${item.id}'}
                    keyExtractor={(item, index) => item.id}
                // showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }

        function renderFinish() {
            return (
                <View style={{ marginTop: 10 }}>
                    <TouchableOpacity style={styles.button}
                        // onPress = {() => this.login(this.state.projectCode)}>
                        onPress={() => navigation.navigate("Testing Tor1")}> 
                        <Text style={styles.buttonText}>Test Wiring</Text>
                    </TouchableOpacity>
                </View>
            )
        }

    return (
        <View>
            {renderHeader()}
            <Text style={{...FONTS.body1, marginTop: 150, marginLeft: 190}}>Instructions</Text>
            <View style={{ height: 400, marginTop: 5 }}>
                {renderInstructions()}
            </View>
            {/* <View style={{ height: 550, marginTop: 140 }}>
                {renderOutputLog()}
            </View> */}
            {renderFinish()}
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
        letterSpacing: 3,
        ...FONTS.body1
    }
});


export default switch2Instructions;