import React from 'react';
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack"
import { NavigationContainer, DefaultTheme } from "@react-navigation/native"
import { Button, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'

import Tabs from './navigation/tabs'
import { landingPage, Home, QRScanner, 
  serialEntries, NDLandingPage, WWLandingPage, 
  technicianPC, testingMnt, switch2Instructions, 
  switch3Instructions, tor1Testing, retestTor1, 
  tor2Testing, 
  Completed,
  NDEnterPC,
  NDCreateNew,
  NDUpload,
  NDconfirmed} from "./screens"

const Stack = createStackNavigator()

const App = () => {
  return (
    // <NavigationContainer theme={theme}>
    <NavigationContainer>
      <StatusBar translucent backgroundColor="transparent" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName={"landingPage"}
      >
        <Stack.Screen name="landingPage" component={landingPage} />
        <Stack.Screen name="TechnicianPC" component={technicianPC} />
        <Stack.Screen name="Home" component={Tabs} />

        {/* Nework Designer Screens */}
        <Stack.Screen name="Network Designer" component={NDLandingPage} />
        <Stack.Screen name="ND Enter PC" component={NDEnterPC} />
        <Stack.Screen name="ND Create New" component={NDCreateNew} />
        <Stack.Screen name="ND Upload" component={NDUpload} />
        <Stack.Screen name="ND Confirmed" component={NDconfirmed} />

        {/* Warehouse Worker Screens */}
        <Stack.Screen name="Warehouse Worker" component={WWLandingPage} />
        <Stack.Screen name="serialEntries" component={serialEntries} />
        {/* <Stack.Screen name="QRScanner" component={QRScanner} /> */}

        {/* Instruction Screens */}
        <Stack.Screen name="switch2Instructions" component={switch2Instructions} />
        <Stack.Screen name="switch3Instructions" component={switch3Instructions} />
        {/* Testing Screens */}
        <Stack.Screen name="Testing Managment" component={testingMnt}/>
        <Stack.Screen name="Testing Tor1" component={tor1Testing}/>
        <Stack.Screen name="Retest Tor1" component={retestTor1}/>
        <Stack.Screen name="Testing Tor2" component={tor2Testing}/>
        <Stack.Screen name="Completed" component={Completed} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
