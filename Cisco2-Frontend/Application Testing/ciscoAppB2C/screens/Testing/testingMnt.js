import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";

import { dummyData, COLORS, FONTS, icons } from "../../constants"

const testingMnt = ({ navigation }) => {

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
                        source={icons.checkMark}
                        resizeMode='contain'
                        style={{
                            width: "13%",
                            marginLeft: 10
                        }}
                    />
                    <Text style={{ marginLeft: 10, color: COLORS.black, ...FONTS.body3 }}>
                        {switchData.switches[0].name} - {switchData.switches[0].testing}
                    </Text>
                </View>
            </View>
        )
    }

    function renderContinue() {
        return (
            <View>
                <TouchableOpacity style={styles.continueButton}
                    onPress={() => navigation.navigate("switch2Instructions")}>
                    <Text style={{ color: COLORS.primary, ...FONTS.h1, letterSpacing: 3 }}>Continue</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View>
            {renderHeader()}
            {renderTestOutput()}
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
        backgroundColor: COLORS.pass,
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
        marginTop: 307,
        marginHorizontal: 50
    },
});

export default testingMnt;