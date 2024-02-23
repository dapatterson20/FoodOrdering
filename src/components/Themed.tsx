/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

//Import UI elements from react native
import { Text as DefaultText, View as DefaultView } from 'react-native';

//Import colors so the UI can be set to different colors
import Colors from '@/src/constants/Colors';
//Import color scheme so the app can switch between light and dark mode
import { useColorScheme } from './useColorScheme';

//Struct handling light and dark colors for each mode
type ThemeProps = {
  //String for light settings
  lightColor?: string;
  //String for dark settings
  darkColor?: string;
};

//Export text with theme prop
export type TextProps = ThemeProps & DefaultText['props'];
//Export view
export type ViewProps = ThemeProps & DefaultView['props'];

//Function to set theme colors based on light or dark mode
export function useThemeColor(
  //Set light and dark strings for props
  props: { light?: string; dark?: string },
  //Set color names for each mode
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  //Set theme based on color mode
  const theme = useColorScheme() ?? 'light';
  //Set props based on set theme
  const colorFromProps = props[theme];

  //if statment checking if props have a color to be set to
  if (colorFromProps) {
    //Return colors
    return colorFromProps;
    //otherwise,
  } else {
    //return set color name and theme
    return Colors[theme][colorName];
  }
}

//Text function sets text color based on theme
export function Text(props: TextProps) {
  //Set colors and props absed on inputted text props
  const { style, lightColor, darkColor, ...otherProps } = props;
  //Set color based on darl/light theme
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  //Return style based on color mode
  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

//Function to set background based on color theme
export function View(props: ViewProps) {
  //Set colors and props absed on inputted text props
  const { style, lightColor, darkColor, ...otherProps } = props;
  //Set background color based on dark/light mode
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  //Return style based on color mode
  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
