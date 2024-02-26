/*
imports view, text, image, stylesheet, and pressable from react native, view is a container, text displays text, images allows images to be displayed, StyleSheet is used to create styles that are separate from react native components and pressable can detect various stages of press interactions 
*/
import {View, Text, Image, StyleSheet, Pressable} from 'react-native'
// Tells code to use functions and objects
import React from 'react'
/*
imports useLocalSearchParams, stack, useRouter, and link from expo router, useLocalSearchParams returns the URL search params for the selected route, stack wraps the native stack navigator from react navigation, useRouter can redirect a request to a different IRL based, and link is used to navigate to a route using a declarative API 
*/
import { useLocalSearchParams, Stack, useRouter, Link } from 'expo-router';
//imports products from the products file that is in the data folder
import products from '@assets/data/Products';
//imports a default image from the ProductListItem file in the components folder 
import { defaultPizzaImage } from '@/src/components/ProductListItem';
//imports useState from react which allows users to track state in a function component
import {useState} from 'react';
//imports button from the buttons file which
import Button from '@components/Buttons';
//imports useCart from the CartProvider file
import { useCart } from '@/src/providers/CartProvider';
//imports PizzaSize from the types file
import { PizzaSize } from '@/src/types';
//imports FontAwesome from vector icons which allow users to use an icon set
import { FontAwesome } from '@expo/vector-icons';

//Sizes of Pizza for the user to choose
const sizes: PizzaSize[]=['S','M','L','XL'];

//Defines functional component ProductDetailsScreen
const ProductDetailsScreen=() => {
    //Extracts id from the return value of useLocalSearchParam
    const{id}=useLocalSearchParams();
    //Extracts addItem from the return value of useCart
    const{addItem}=useCart();
    //Uses useRouter to have access to the next router object
    const router=useRouter();
    //Declares variable selectedSize and function setSelectedSize. selectedSize will be a type of PizzaSize
    const[selectedSize, setSelectedSize]=useState<PizzaSize>('M');
    //Finds products wherever id = id. If a product is found and has a match, it will be assigned as a product
    const product=products.find((p)=>p.id.toString()==id);
    /*
    -define addToCart
    -check if there is a product, if not it returns
    -if there is, it will call the addItem function and use product, selectedSize as args
    -after adding an item it will use router to nav to the cart route
    */
    const addToCart=()=> {
        if (!product) {
            return;
        }
        addItem(product, selectedSize);
        router.push('/cart');
    };
    /*
    -checks if there is no product
    -if there is no product, it will display "Oops! No food here!"
    */
    if (!product) {
        return <Text>Oops! No food here!</Text>
    }
    return (
        //Menu screen
        /*
        -Uses view with styles.container
        -Renders options
        -Renders pressable component
        -Pressable takes presses as a param
        -Uses icons from FontAwesome
        -Set size to 25
        -Set style
        -Renders stack.screen component and sets title to product.name
        -Renders image component
        -Sets source to uri
        -Applies style to styles.image
        -Renders text to display product.name and applies style
        -Render text to display product.price and applies style
        */
        <View style={styles.container}>
            <Stack.Screen options={{title: 'Menu', headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    //color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),}}/>
            <Stack.Screen options={{title: product.name}}/>
            <Image 
                source={{uri: product.image || defaultPizzaImage}}
                style={styles.image}
            />

            <Text style={styles.sizeText}>{product.name}</Text>
            <Text style={styles.price}>${product.price}</Text>
        </View>
    );
};

//Styles
//creates stylesheet
const styles=StyleSheet.create({
    /*
    -define container
    -sets background color to white
    -sets flex to 1
    -sets padding to 10
    */
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 10,
    },
    /*
    -defines image
    -sets width to 30%
    -sets aspect ratio to 1
    */
    image: {
        width: '30%',
        aspectRatio: 1,
    },
    /*
    -defines price
    -sets fontSize to 18
    -sets fontWeight to bold
    */
    price: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    /*
    -defines sizes
    -sets flexDirection to row
    -sets justifyContent to space around
    -sets marginalVertical to 10
    */
    sizes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    /*
    -defines size
    -sets backgroundColor to gainsboro 
    -sets aspect ratio to 1
    -sets borderRadius to 25
    -sets alignItems to center
    -sets justifyContent to center
    */
    size: {
        backgroundColor: 'gainsboro',
        width: 50,
        aspectRatio: 1,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    /*
    -defines sizeText
    -sets fontSize to 20
    -sets fontWeight to 500
    */
    sizeText: {
        fontSize: 20,
        fontWeight: '500',
    },
});
//exports ProductDetailsScreen so it can be used somewhere else
export default ProductDetailsScreen
