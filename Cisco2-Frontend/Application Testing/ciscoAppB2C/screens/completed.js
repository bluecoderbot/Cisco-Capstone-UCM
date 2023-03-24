import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

import { dummyData, COLORS, SIZES, FONTS, icons, images } from "../constants"

const Completed = () => {

    const [switchData, setSwitchData] = React.useState(dummyData.switchData);

    function renderHeader() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={{ color: COLORS.white, ...FONTS.h1 }}>Wiring Complete</Text>
                </View>
            </View>
        )
    }

    function renderHardwareList() {
        return (
            <View style={{ marginTop: 10, marginHorizontal: 20 }}>
                <View style={styles.output}>
                    <Image
                        source={icons.serverIcon}
                        resizeMode='contain'
                        style={{
                            width: "20%",
                            marginLeft: 10
                        }}
                    />
                    <Text style={{ marginLeft: 10, color: COLORS.black, ...FONTS.body2 }}>
                        Managment Switch                            Serial Number: abcdef
                    </Text>
                </View>
                <View style={styles.output}>
                    <Image
                        source={icons.serverIcon}
                        resizeMode='contain'
                        style={{
                            width: "20%",
                            marginLeft: 10
                        }}
                    />
                    <Text style={{ marginLeft: 10, color: COLORS.black, ...FONTS.body2 }}>
                        Tor 1 Switch                                    Serial Number: abcdeg
                    </Text>
                </View>
                <View style={styles.output}>
                    <Image
                        source={icons.serverIcon}
                        resizeMode='contain'
                        style={{
                            width: "20%",
                            marginLeft: 10
                        }}
                    />
                    <Text style={{ marginLeft: 10, color: COLORS.black, ...FONTS.body2 }}>
                        Tor 2 Switch                                    Serial Number: abcdeh
                    </Text>
                </View>
            </View>
        )
    }
    return (
        <View>
            {renderHeader()}
            <View style={{ marginTop: 165, marginHorizontal: 20, alignItems: 'center' }}>
                <Text style={{ ...FONTS.h2, textAlign: 'center', fontSize: 28 }}>
                    Wiring is completed for the following hardware:</Text>
            </View>
            {renderHardwareList()}
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
    },
    output: {
        height: 80,
        backgroundColor: COLORS.pass,
        borderRadius: 15,
        marginHorizontal: 10,
        marginTop: 10,
        paddingTop: 0,
        alignItems: 'center',
        flexDirection: 'row'
    }
});

export default Completed;