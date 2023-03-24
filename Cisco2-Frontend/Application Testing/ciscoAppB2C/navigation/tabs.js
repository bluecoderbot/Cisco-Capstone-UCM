import React from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    StyleSheet,
    ColorPropType
} from 'react-native';
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs"
import LinearGradient from "react-native-linear-gradient"

import { Home, landingPage, inProgress, QRScanner, Testing, Completed } from "../screens"
import { COLORS, FONTS, icons } from "../constants"

const Tab = createBottomTabNavigator()

const TabBarCustomButton = ({ children, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                top: -20,
                justifyContent: 'center',
                alignItems: 'center', 
                shadowOffset: { height: 0, width: 1 }, 
                shadowOpacity: 1, 
                shadowRadius: 1, 
                shadowColor:'#fff',
                backgroundColor: '#fff',
                elevation: 4, 
                height: 59,
                width: 60,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
            }}
            onPress={onPress}
        >
            <LinearGradient
                colors={['#181B24', '#616B74']}
                style={{
                    width: 60,
                    height: 60,
                    borderRadius: 10
                }}
            >
                {children}
            </LinearGradient>
        </TouchableOpacity>
    )
}

const Tabs = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style: {
                    position: 'absolute',
                    borderRadius: 15,
                    bottom: 8,
                    left: 6,
                    right: 6,
                    elevation: 10,
                    backgroundColor: COLORS.TabBar,
                    borderTopColor: "transparent",
                    height: 60
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={icons.home}
                                resizeMode="contain"
                                style={{
                                    // when icon is selected it will be colored with PRIMARY, if not it will be secondary
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? COLORS.primary : COLORS.white,
                                }}
                            />
                            <Text style={{ color: focused ? COLORS.primary : COLORS.white,...FONTS.body5}}>Home</Text>
                        </View>
                    )
                }}
            />

            <Tab.Screen
                name="In-Progress"
                component={inProgress}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={icons.inProgress}
                                resizeMode="contain"
                                style={{
                                    // when icon is selected it will be colored with PRIMARY, if not it will be secondary
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? COLORS.primary : COLORS.white
                                }}
                            />
                            <Text style={{ color: focused ? COLORS.primary : COLORS.white,...FONTS.body5 }}>Instructions</Text>
                        </View>
                    )
                }}
            />

            <Tab.Screen
                name="QRScanner"
                component={QRScanner}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.qr}
                            resizeMode="contain"
                            style={{
                                width: 40,
                                height: 40,
                                tintColor: focused ? COLORS.primary : COLORS.white
                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                            {...props}
                        />
                    )
                }}
            />

            <Tab.Screen
                name="Testing"
                component={Testing}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={icons.testing}
                                resizeMode="contain"
                                style={{
                                    // when icon is selected it will be colored with PRIMARY, if not it will be secondary
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? COLORS.primary : COLORS.white
                                }}
                            />
                            <Text style={{ color: focused ? COLORS.primary : COLORS.white,...FONTS.body5 }}>Testing</Text>
                        </View>
                    )
                }}
            />

            <Tab.Screen
                name="Completed"
                component={Completed}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={icons.completed}
                                resizeMode="contain"
                                style={{
                                    // when icon is selected it will be colored with PRIMARY, if not it will be secondary
                                    width: 27,
                                    height: 27,
                                    tintColor: focused ? COLORS.primary : COLORS.white
                                }}
                            />
                            <Text style={{ color: focused ? COLORS.primary : COLORS.white,...FONTS.body5 }}>Completed</Text>
                        </View>
                    )
                }}
            />

        </Tab.Navigator>
    )
}

export default Tabs;
