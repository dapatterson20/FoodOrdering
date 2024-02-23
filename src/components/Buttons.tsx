//Import various UI elements
import {Pressable, StyleSheet, Text, View} from 'react-native';
//Import colors to set elements' colors
import Colors from '../constants/Colors';
//Import for helping set up the button
import {forwardRef} from 'react';

//Struct-like to keep track of button's text
type ButtonProps={
    //Text variable
    text: string;
//Add pressable component
} & React.ComponentPropsWithoutRef<typeof Pressable>;

//Function defines the button
const Button=forwardRef<View | null, ButtonProps>(
    //Text and pressableProps with reference
    ({text, ...pressableProps}, ref)=> {
        //Elements to display
        return (
            //Pressable element so users can tap/click on Button to make it do something
            //Text element shows the text of the button
            <Pressable ref={ref} {...pressableProps} style={styles.container}>
                <Text style={styles.text}>{text}</Text>
            </Pressable>
        );
    }
);

//styles contains reusable settings for the UI above
const styles=StyleSheet.create({
    //Container style, settings for containing a set of UI elements (i.e. an item in a FlatList)
    container: {
        //Set blue color
        backgroundColor: Colors.light.tint,
        //Add padding
        padding:15,
        //Center item
        alignItems: 'center',
        //Make the borders round
        borderRadius: 100,
        //Add vertical margin
        marginVertical: 10
    },
    //Style for text on the screen
    text: {
        //Set font size
        fontSize: 16,
        //Set weight
        fontWeight: '600',
        //Set color
        color: 'white',
    },
});

//Export so other files can access these elements
export default Button;