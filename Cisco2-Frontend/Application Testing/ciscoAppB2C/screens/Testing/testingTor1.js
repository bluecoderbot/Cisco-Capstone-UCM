import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList
} from "react-native";

import { dummyData, COLORS, FONTS, icons } from "../../constants"

const testingTor1 = ({ navigation }) => {

    const [switchData, setSwitchData] = React.useState(dummyData.switchData);

    function renderHeader() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={{ color: COLORS.white, ...FONTS.h1 }}>Testing</Text>
                </View>
            </View>
        )
    }

    function renderTestOutput() {
        return (
            <View style={{ marginTop: 170, marginHorizontal: 20 }}>
                <Text style={{ color: COLORS.black, ...FONTS.h1 }}> Test Output:</Text>
                <View style={styles.output}>
                    <Image
                        source={icons.failedAlert}
                        resizeMode='contain'
                        style={{
                            width: "13%",
                            marginLeft: 10
                        }}
                    />
                    <Text style={{ marginLeft: 10, color: COLORS.black, ...FONTS.body3 }}>
                        {switchData.switches[1].name} - {switchData.switches[1].testing}
                    </Text>
                </View>
            </View>
        )
    }

    function renderNewInstructions() {
        const renderItem = ({ item }) => (
            <View style={{
                paddingHorizontal: 20,
                paddingVertical: 5,
            }}>
                <View
                    style={{
                        width: "100%",
                        height: 70,
                        paddingTop: 7,
                        paddingLeft:10,
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
                    data={switchData.switches[1].rewire_instructions}
                    renderItem={renderItem}
                    // keyExtractor={item => '${item.id}'}
                    keyExtractor={(item, index) => item.id}
                // showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }

    function renderContinue() {
        return (
            <View>
                <TouchableOpacity style={styles.continueButton}
                    onPress={() => navigation.navigate("Retest Tor1")}>
                    <Text style={{ color: COLORS.primary, ...FONTS.h1, letterSpacing: 3 }}>Continue</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View>
            {renderHeader()}
            {renderTestOutput()}
            <View style={{ height: 270, marginTop: 10 }}>
                {renderNewInstructions()}
            </View>
            {renderContinue()}
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
    output: {
        height: 80,
        backgroundColor: COLORS.fail,
        borderRadius: 15,
        marginHorizontal: 10,
        marginTop: 10,
        paddingTop: 0,
        alignItems: 'center',
        flexDirection: 'row'
    },
    buttonText: {
        color: COLORS.primary,
        letterSpacing: 2,
        ...FONTS.body1
    },
    continueButton: {
        height: 60,
        backgroundColor: COLORS.landingPageBackround,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
        marginHorizontal: 50
    },
});

export default testingTor1;