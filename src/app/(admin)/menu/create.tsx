//imports button from the button file 
import Button from '@/src/components/Buttons';
//imports a default image from the ProductListItem file in the components folder
import { defaultPizzaImage } from '@/src/components/ProductListItem';
//imports colors from the colors file which allows colors to be used
import Colors from '@/src/constants/Colors';
//imports useState from react which allows users to track state in a function component
import { useState } from 'react';
/*
imports view, text, StyleSheet, TextInput, image, and alert from react native, view is a container, text displays text, StyleSheet is used to create styles that are separate from react native components and pressable can detect various stages of press interactions, TextInput is used for inputting text into an app via keyboard, images allows images to be displayed, and alert is used to launch an alert dialog with the specified title and message 
*/
import {View, Text, StyleSheet, TextInput, Image, Alert} from 'react-native';
//imports imagepicker from expo image picker which allows selection of images and videos from the phone's library or taking a photo with the camera
import * as ImagePicker from 'expo-image-picker';
/*
imports stack and useLocalSearchParams from expo router, stack wraps the native stack navigator from react navigation and useLocalSearchParams returns the URL search params for the selected route 
*/
import { Stack, useLocalSearchParams } from 'expo-router';
//defines functional component CreateProductScreen
const CreateProductScreen=()=> {
    //Uses useState to define name and sets name
    const [name, setName]=useState('');
    //Uses useState to define price and sets price
    const [price, setPrice]=useState('');
    //Uses useState to define image and sets image
    const [image, setImage]=useState<string|null>(null);
    //Extracts id using useLocalSearchParams
    const {id}=useLocalSearchParams();
    //Checks if id is there and sets isUpdating as the result
    const isUpdating=!!id;
    /*
    -Defines resetFields
    -Resets name to empty string
    -Resets price to empty string
    */
    const resetFields=()=> {
        setName('');
        setPrice('');
    };
    //Defines errors and setErrors and intialize it with an empty string
    const [errors, setErrors]=useState('');

    //Error checking
    //Defines validateInput
    const validateInput=()=> {
        //Resets any errors
        setErrors('');
        //Checks if name is false
        if (!name) {
            //If name is empty it will send a message saying "Name is required"
            setErrors('Name is required');
            //Returns false
            return false;
        }
        //Checks if price is false
        if (!price) {
            //If price is empty it will send a message saying "Price is required"
            setErrors('Price is required');
            //Returns false
            return false;
        }
        //Checks if price is a valid number
        if (isNaN(parseFloat(price))) {
            //If price is not a valid number it will send a message saying "Price is not a number"
            setErrors("Price is not a number");
            //Returns false
            return false;
        }
        //If all of the above are correct it will instead return true
        return true;
    };
    
    //Used when a user submits 
    const onSubmit=()=> {
        //Checks if isUpdating is true
        if (isUpdating) {
            //If true calls onUpdateCreate
            onUpdateCreate();
        }
        //Else
        else {
            //If false calls onCreate
            onCreate();
        }
    }
    //Used for creating a prodcut
    const onCreate=()=> {
        //Checks if the input is valid
        if (!validateInput()) {
            //If not valid it will return
            return;
        }
        //If it is valid it will call resetFields to clear any input
        resetFields();
    };
    //Used for updating a product
    const onUpdateCreate=()=> {
        //Checks if the input is valid
        if (!validateInput()) {
            //If not vaild ir will return
            return;
        }
        //If it is valid it will call resetFields to clear any input
        resetFields();
    };

    //Delete an item
    //Used when a user wants to delete a product
    const onDelete=()=> {
        //It will give a warning message of "Delete!!!"
        console.warn('Delete!!!')
    };
    //Used when a user wants to delete a product and the system wants to confirm the deletion
    const confirmDelete=()=> {
        //Sends alert saying "Confirm" and "Are you sure you want to delete this item?"
        Alert.alert("Confirm", "Are you sure you want to delete this item?", [
            {
                //Allows user to cancel the delete
                text: "Cancel",
            },
            {
                //Allows users to delete
                text: 'Delete',
                //Style of button, destructive since user wants to delete
                style: 'destructive',
                //When the delete button is pressed onDelete will be called
                onPress: onDelete,
            }]);
    };

    //Pick an image from the local machine for the new product.
    //Defines pickImage will be asynchronus 
    const pickImage=async()=> {
        //Waits for ImagePicker.launchImageLibraryAsync to complete, then opens the device's image library and allows the user to select an image
        let result=await ImagePicker.launchImageLibraryAsync({
            //Allows all media types to be chosen
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            //Allows user to edit the image they chose
            allowsEditing: true,
            //Sets the aspect ration of the image to 4:3
            aspect: [4,3],
            //Sets the quality to 1
            quality: 1,
        });
        //Checks if action was canceled
        if (!result.canceled) {
            //If image is not canceled, set image to URI
            setImage(result.assets[0].uri);
        }
    };

    return (
        //UI, shows the image, text boxes for input, and create/update and delete elements.
        /*
        -Uses view with styles.container
        -Renders the stack.screen component, checks if updating, if true then will update product if not will create product
        -Renders image, sets style
        -Renders text, sets style to textButton
        -Renders text for Item Name and sets style
        -Renders TextInput, uses placeholder, sets style
        -Renders text for Item Price
        -Renders textInput, uses placeholder, sets style, allows numeric input
        -Renders text displays errors in red
        -Renders button, onPress uses onSubmit, if isUpdating is true, will display Update, if not will display Create
        -Renders text for isUpdate when true, sets style, uses onPress for confirmDelete
        */
        <View style={styles.container}>
            <Stack.Screen options={{title: isUpdating ? 'Update Product': 'Create Product'}}/>
            <Image source={{uri: image || defaultPizzaImage}} style={styles.image}/>
            <Text style={styles.textButton} onPress={pickImage}>Select Image</Text>
            <Text style={styles.label}>Item Name</Text>
            <TextInput placeholder="Name" style={styles.input} value={name} onChangeText={setName}/>

            <Text style={styles.label}>Item Price ($)</Text>
            <TextInput placeholder="9.99" style={styles.input} keyboardType="numeric" value={price} onChangeText={setPrice}/>

            <Text style={{color: 'red'}}>{errors}</Text>
            <Button onPress={onSubmit} text={isUpdating ? "Update":'Create'}/>
            {isUpdating && <Text style={styles.textButton} onPress={confirmDelete}>Delete</Text>}
        </View>
    );
};
//creates stylesheet
const styles=StyleSheet.create({
    /*
    -define container
    -sets justifyContent to center
    -sets padding to 10
    */
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    /*
    -defines input
    -sets background color to white
    -sets padding to 10
    -sets borderRadius to 5
    -sets marginTop to 5
    -sets marginBottom to 20
    */
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
    },
    /*
    -defines label
    -sets fontSize to 16
    */
    label: {
        fontSize: 16,
    },
    /*
    -defines image
    -sets width to 15%
    -sets aspect ratio to 1
    -sets alignSelf to center
    */
    image: {
        width: '15%',
        aspectRatio: 1,
        alignSelf: 'center',
    },
    /*
    -define textButton
    -sets alignSelf to center
    -sets fontWeight to bold
    -sets color to Colors.light.tint
    -sets marginVertical to 10
    */
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginVertical: 10,
    }
});
//exports CreateProductScreen so it can be used somewhere else
export default CreateProductScreen;
