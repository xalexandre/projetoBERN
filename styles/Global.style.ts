import { Appearance } from "react-native";
const isDarkMode = Appearance.getColorScheme() == 'dark';

const FontConstants = {
    familyRegular: 'Comfortaa',
    color: isDarkMode ? "#ffffff" : "#023047",
    sizeTitle: 26,
    sizeSubitle: 24,
    sizeLabel: 20,
};

const ColorsConstants = {
    backgroundColor: isDarkMode ? "#023047" : "#ffffff",
};

const SizeConstants = {

};

export {
    FontConstants,
    ColorsConstants,
    SizeConstants,
};