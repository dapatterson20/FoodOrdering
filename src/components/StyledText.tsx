// This imports the "Text" and "TextProps" components from a module called "Themed" 
// which allows text to be displayed and text to be passed on props, such as font color and size.
import { Text, TextProps } from './Themed';

// This defines a function component named "MonoText" which takes props as an argument. 
// This allows the "MonoText" component to inherit any props passed to it and pass them 
// along to the "Text" component.
export function MonoText(props: TextProps) {
  //  This applies styling to the "Text" component setting the font family to "SpaceMono".
  return <Text {...props} style={[props.style, { fontFamily: 'SpaceMono' }]} />;
}
