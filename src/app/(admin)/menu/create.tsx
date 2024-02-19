import Button from '@/src/components/Buttons';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import Colors from '@/src/constants/Colors';
import { useState } from 'react';
import {View, Text, StyleSheet, TextInput, Image, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams } from 'expo-router';

const CreateProductScreen=()=> {
    const [name, setName]=useState('');
    const [price, setPrice]=useState('');
    const [image, setImage]=useState<string|null>(null);
    const {id}=useLocalSearchParams();
    const isUpdating=!!id;
    const resetFields=()=> {
        setName('');
        setPrice('');
    };
    const [errors, setErrors]=useState('');

    //Error checking
    const validateInput=()=> {
        setErrors('');
        if (!name) {
            setErrors('Name is required');
            return false;
        }
        if (!price) {
            setErrors('Price is required');
            return false;
        }
        if (isNaN(parseFloat(price))) {
            setErrors("Price is not a number");
            return false;
        }
        return true;
    };

    const onSubmit=()=> {
        if (isUpdating) {
            onUpdateCreate();
        }
        else {
            onCreate();
        }
    }

    const onCreate=()=> {
        if (!validateInput()) {
            return;
        }

        resetFields();
    };
    const onUpdateCreate=()=> {
        if (!validateInput()) {
            return;
        }

        resetFields();
    };

    //Delete an item
    const onDelete=()=> {
        console.warn('Delete!!!')
    };

    const confirmDelete=()=> {
        Alert.alert("Confirm", "Are you sure you want to delete this item?", [
            {
                text: "Cancel",
            },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: onDelete,
            }]);
    };

    //Pick an image from the local machine for the new product.
    const pickImage=async()=> {
        let result=await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        //UI, shows the image, text boxes for input, and create/update and delete elements.
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

const styles=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
    },
    image: {
        width: '15%',
        aspectRatio: 1,
        alignSelf: 'center',
    },
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginVertical: 10,
    }
});

export default CreateProductScreen;