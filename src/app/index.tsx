// This imports "View" and "Text" components from the package "react-native". This allows
// for structure layout and design within a screen, as well as text ensuring text is displayed on the screen.
import {View, Text} from 'react-native';

// The "React" is imported here because it is an important library that provides 
// the necessary functions and APIs for creating and managing React components, 
// handling state, managing the component lifecycle, and more.
import React from 'react';

// The "Button" component is being imported from a file located in a directory named 
// components, and within that directory, there's a file named "Buttons"
import Button from '../components/Buttons';

// The "Link" component is being imported from the 'expo-router' package. This allows for
// routing functionalities for navigating between different screens. This component is used to 
// create links or navigation buttons that allow users to navigate between different screens in the app.
import {Link} from 'expo-router';

// This component "index" is being defined:
const index=()=> {
    //return the following...
    return (
        // "View" acts as a container for other components and it has styles applied to it 
        // to make it fill the available space, center its content vertically, horizontally, and add padding.
        <View style={{flex: 1, justifyContent: 'center', padding: 10}}>
            // The "Link" component allows for navigation functionality.
            // The "href" props of these "Link" components specify the destination routes to which the buttons will navigate to. 
            // The "asChild" prop delegates the rendering of a component to its single child element.
            // The "Button" components represent buttons that users can click to navigate to different 
            // sections of the application. The "text" prop of the "Button" components specifies the text displayed on the buttons.
            <Link href={'/(user)'} asChild>
                <Button text="User"/>
            </Link>
            <Link href={'/(admin)'} asChild>
                <Button text="Admin"/>
            </Link>
        </View>
    );
};
// This allows for the "index" component to be the default export. 
// When this file is imported into another file, the index component will be imported by default, 
// allowing it to be used elsewhere in the application.
export default index;
