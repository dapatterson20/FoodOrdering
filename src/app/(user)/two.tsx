//Import StyleSheet to define various settings for UI elements
import { StyleSheet } from 'react-native';
//Import editScreenInfo so the path to the code for the screen is displayed
import EditScreenInfo from '@/src/components/EditScreenInfo';
//Import text and view so you can add text and view UI elements to the app screen
import { Text, View } from '@/src/components/Themed';

//Export the function so it can be imported and accessed by other files.
export default function TabTwoScreen() {
  //The actual result of the function, in this case display UI
  return (
    //Creates a view container which displays everything within it to the screen
    //Text displays text within the view container
    //View with style separator sets coloring for dark mode and light mode
    //EditScreenInfo shows path to this code so the user can edit it
    //Last view line closes off this container of UI
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/two.tsx" />
    </View>
  );
}
//styles contains reusable settings for the UI above
const styles = StyleSheet.create({
  //Container style, settings for containing a set of UI elements (i.e. an item in a FlatList)
  container: {
    //set flex to maintain consistent size
    flex: 1,
    //Align UI elements in the center
    alignItems: 'center',
    //Justify to center
    justifyContent: 'center',
  },
  //Style for the title of content
  title: {
    //Set a font size of the title to 20
    fontSize: 20,
    //Make the font type bold
    fontWeight: 'bold',
  },
  //Separator style for dark and light mode
  separator: {
    //Set vertical margin
    marginVertical: 30,
    //set height to 1
    height: 1,
    //Set width
    width: '80%',
  },
});
