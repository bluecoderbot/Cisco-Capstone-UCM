import { Dimensions } from "react-native"
const { width, height } = Dimensions.get("window");

export const COLORS = {

    landingPageBackround: "#121318",

    gradient1:"#434343",

    gradient2:"#31323B",

    backround: "#F4F4EE",

    TabBar: "#121318",

    white: "#FFFFFF",

    black: "#000000",

    shadedblack: "#1E1F20",

    // primary: "#84C9FB",

    primary: "#78AEE1",

    secondary: "#78AEE1",

    textInput: "#E3E3E3",

    transparent: "transparent",

    pass:"#8CCE93",

    fail:"#D76666"
};

export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 30,
    padding: 5,
    padding2: 12,

    // font sizes
    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 20,
    h4: 18,
    body1: 26,
    body2: 18,
    body3: 16,
    body4: 15,
    body5: 12,

    // app dimensions
    width,
    height
};

export const FONTS = {
    largeTitle: { fontFamily: "Montserrat-Regular", fontSize: SIZES.largeTitle, lineHeight: 55 },
    h1: { fontFamily: "Montserrat-Regular", fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: "Montserrat-Regular", fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: "Montserrat-Regular", fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: "Montserrat-Regular", fontSize: SIZES.h4, lineHeight: 22 },
    body1: { fontFamily: "Montserrat-Regular", fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: "Montserrat-Regular", fontSize: SIZES.body2, lineHeight: 26 },
    body3: { fontFamily: "Montserrat-Regular", fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: "Montserrat-Regular", fontSize: SIZES.body4, lineHeight: 27 },
    body5: { fontFamily: "Montserrat-Regular", fontSize: SIZES.body5, lineHeight: 22 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;