import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet

} from "react-native"
import LinearGradient from 'react-native-linear-gradient'

import { COLORS, images, FONTS } from "../constants"

const landingPage = ({ navigation }) => {

    function renderLogo() {
        return (
            <View style={styles.logo}>
                <Image
                    source={images.ciscoLogo}
                    resizeMode="contain"
                    style={{
                        width: "80%"
                    }}
                />
            </View>
        )
    }

    function renderTechnicianButton() {
        return (
            <View style={{ marginTop: 0, marginBottom: 4, marginHorizontal: 40 }}>
                <TouchableOpacity style={styles.button}
                    onPress={() => navigation.navigate("TechnicianPC")}
                >
                    <Text style={{ letterSpacing: 2, color: COLORS.black, ...FONTS.body1 }}>Technician</Text>
                </TouchableOpacity>
            </View>
        )
    }

    function renderNetworkButton() {
        return (
            <View style={{ marginVertical: 20, marginHorizontal: 40 }}>
                <TouchableOpacity style={styles.button}
                    onPress={() => navigation.navigate("Network Designer")}
                >
                    <Text style={styles.buttonText}>Network Designer</Text>
                </TouchableOpacity>
            </View>
        )
    }

    function renderWarehouseButton() {
        return (
            <View style={{ marginVertical: 5, marginHorizontal: 40 }}>
                <TouchableOpacity style={styles.button}
                    onPress={() => navigation.navigate("Warehouse Worker")}
                >
                    <Text style={styles.buttonText}>Warehouse Worker</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <LinearGradient
            colors={[COLORS.landingPageBackround, COLORS.landingPageBackround]}
            style={{ flex: 1 }}
        >
            <View>
                {renderLogo()}
                {renderTechnicianButton()}
                {renderNetworkButton()}
                {renderWarehouseButton()}
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    logo: {
        marginTop: 0,
        height: 350,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        height: 60,
        backgroundColor: COLORS.primary,
        borderRadius: 11,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        letterSpacing: 2,
        color: COLORS.black,
        ...FONTS.body1
    }
});

export default landingPage;