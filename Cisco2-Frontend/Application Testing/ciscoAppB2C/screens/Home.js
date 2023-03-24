import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    FlatList,
} from "react-native";

import { dummyData, COLORS, SIZES, FONTS, icons, images } from "../constants"
// import { outputLog } from "../constants/dummy";

const Home = () => {

    const [output, setOutputLog] = React.useState(dummyData.outputLog);

    function renderHeader() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={{ color: COLORS.white, ...FONTS.h1 }}>Hello, Technician!</Text>
                </View>
            </View>
        )
    }

    function renderIntroMessage() {
        return (
            <View style={{
                paddingHorizontal: 20,
                paddingTop: 140,
                paddingVertical: 10,
            }}>
                <View style={{
                    backgroundColor: COLORS.secondary,
                    height: 130,
                    width: "100%",
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 15,
                }}>
                    <Text style={{ color: COLORS.black, ...FONTS.body2, textAlign: 'center' }}>Welcome to B2C’s
                    rack wiring application. Please start by scanning the Managment
                    Switch labeled 'DeviceNumber: 0 mgmt'</Text>
                </View>

                <View style={{
                    backgroundColor: COLORS.secondary,
                    height: 80,
                    width: "100%",
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 5,
                    marginTop:10
                }}>
                    <Text style={{ color: COLORS.black, ...FONTS.body2, textAlign: 'center' }}> Proceed to scanning 
                    the next switch labeled 'DeviceNumber: 6 tor1'</Text>
                </View>
                <View style={{
                    backgroundColor: COLORS.secondary,
                    height: 80,
                    width: "100%",
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 5,
                    marginTop:10
                }}>
                    <Text style={{ color: COLORS.black, ...FONTS.body2, textAlign: 'center' }}> Proceed to scanning 
                    the next switch labeled 'DeviceNumber: 7 tor2'</Text>
                </View>
            </View>
        )
    }

    // function renderOutputLog() {
    //     const renderItem = ({ item }) => (
    //         <View style={{
    //             paddingHorizontal: 20,
    //             paddingVertical: 5,
    //         }}>
    //             <View
    //                 style={{
    //                     width: "100%",
    //                     height: 100,
    //                     padding: 10,
    //                     borderRadius: 20,
    //                     backgroundColor: COLORS.secondary
    //                 }}
    //             >
    //                 <Text style={{ ...FONTS.body2 }}>{item.action}</Text>
    //                 <Text style={{ ...FONTS.body3 }}>{item.description}</Text>
    //             </View>
    //         </View>
    //     )

    //     return (
    //         <View>
    //             <FlatList
    //                 contentContainerStyle={{ marginTop: 0 }}
    //                 data={output}
    //                 renderItem={renderItem}
    //                 // keyExtractor={item => '${item.id}'}
    //                 keyExtractor={(item, index) => item.id}
    //                 showsVerticalScrollIndicator={false}
    //             />
    //         </View>
    //     )
    // }

    return (
        <View>
            {renderHeader()}
            {renderIntroMessage()}
            {/* <Text
                style={{ paddingLeft: 10, ...FONTS.h2 }}>Output Log</Text> */}
            {/* <View style={{ height: 380, marginBottom: 20 }}>
                {renderOutputLog()}
            </View> */}

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
    }
});

export default Home;