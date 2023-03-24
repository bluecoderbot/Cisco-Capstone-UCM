import landingPage from "./landingPage"

// TECHNICIAN SCREENS ---------------------------------------------
import technicianPC from "./technicianPC"
import Home from "./Home"
import QRScanner from "./QRScanner"

// In-Progress Screens
import inProgress from "./inProgress"
import instructionScreen from "./inProgress_TAB/instructionScreen"

import Testing from "./testing"
import Completed from "./completed"

// Instruction Screens
import switch2Instructions from "./instructionScreens/switch2"
import switch3Instructions from "./instructionScreens/switch3"

// Testing Screens
import testingMnt from "./Testing/testingMnt"
import tor1Testing from "./Testing/testingTor1"
import tor2Testing from "./Testing/tetsingTor2"

import retestTor1 from "./Testing/retestTor1"
//----------------------------------------------------------------

// Network Designer Screens ---------------------------------------
import NDLandingPage from "./Network_Designer/NDLandingPage"
import NDCreateNew from "./Network_Designer/NDCreateNew"
import NDEnterPC from "./Network_Designer/NDEnterPC"
import NDUpload from "./Network_Designer/NDUploadTopo"
import NDconfirmed from "./Network_Designer/NDconfirmed"
//-----------------------------------------------------------------

// Warehouse Worker Screens ---------------------------------------
import WWLandingPage from "./Warehouse_Worker/WWLandingPage"
import serialEntries from "./Warehouse_Worker/serialEntries"
//-----------------------------------------------------------------

export {
    landingPage,
    // Technician,
    technicianPC,
    Home,
    QRScanner,
    inProgress,
    instructionScreen,
    Testing,
    Completed,
    //Instruction Screens
    switch2Instructions,
    switch3Instructions,
    // Testing Screens
    testingMnt,
    tor1Testing,
    tor2Testing,
    retestTor1,
    // Network Desginer
    NDLandingPage,
    NDCreateNew,
    NDEnterPC,
    NDUpload,
    NDconfirmed,
    // Warehouse Worker
    WWLandingPage,
    serialEntries
}