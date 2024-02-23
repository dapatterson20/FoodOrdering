//Import important functions like Text in order to implement them into the UI
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
//Import the React library
import React from 'react';
//Import the color library to set UI elements' colors
import Colors from '../constants/Colors';
//Import the CartItem type (like a struct) from the types.ts file
import { CartItem } from '../types';
//Import link to implement tappable links
import { Link } from 'expo-router';
//Import the URL of the default image to use when no other images present, from ProductListItem.tsx
import { defaultPizzaImage } from './ProductListItem';
//Import FontAwesome icons so the UI can contain icons
import { FontAwesome } from '@expo/vector-icons';
//Import useCart, which was exported from the CartProvider.tsx file
import { useCart } from '../providers/CartProvider';

//Struct-like with one element for UI
type CartListItemProps={
    //Variable that keeps track of the item in the cart
    cartItem: CartItem;
};

//Function that contains the UI for displaying a single item in the cart list.
const CartListItem=({cartItem}: CartListItemProps)=> {
    //UpdateQuantity used to keep track of number of the same product in the cart, handled in the CartProvider file
    const {updateQuantity}=useCart();
    //The actual result of the function, in this case display UI
    return (
        //UI for cart item, shows image, price, name, and quantity, starting with View container
        //Image sets the image of the item to be shown, either the existing picture or (if no such image exists) the default image
        //Image source is a URL to the image to be displayed, either the assigned image or the default
        //Image style sets the style of the image as set below
        //Image resizeMode sets the image to always be contained within the list entry

        //Another view which contains more elements
        //Text shows the name of the product
        //View contains price and size
        //Text shows price of the item up to two decimal points, the price from the product's assigned entry in Products.ts
        //Text Size shows the size of the pizza

        //View style={styles.quantitySelector} contains a minus icon to decrease the quantity of an item
        //Font awesome sets and displays the icon

        //Next text line shows the quantity of the product to be bought as a number
        //Next font awesome contains the icon for increasing the item quantity
        <View style={styles.container}>
            <Image
                source={{uri: cartItem.product.image || defaultPizzaImage}}
                style={styles.image}
                resizeMode="contain"
            />
            <View style={{flex: 1}}>
                <Text style={styles.title}>{cartItem.product.name}</Text>
                <View style={styles.subtitleContainer}>
                    <Text style={styles.price}>${cartItem.product.price.toFixed(2)}</Text>
                    <Text>Size: {cartItem.size}</Text>
                </View>
            </View>
            <View style={styles.quantitySelector}>
                <FontAwesome
                    //Minus button to remove number of a type of item from cart
                    onPress={()=>updateQuantity(cartItem.product.name, cartItem.size, -1)}
                    //set icon by name (minus sign)
                    name="minus"
                    //set color
                    color="gray"
                    //pad it out at the borders
                    style={{padding: 5}}
                />
                <Text style={styles.quantity}>{cartItem.quantity}</Text>
                <FontAwesome
                    //Plus button to add to quantity of item in cart
                    onPress={()=>updateQuantity(cartItem.product.name, cartItem.size, 1)}
                    //set icon by name
                    name="plus"
                    //set color
                    color="gray"
                    //set padding
                    style={{padding: 5}}
                />
            </View>
        </View>
    );
};

//styles contains reusable settings for the UI above
const styles=StyleSheet.create({
    //Container style, settings for containing a set of UI elements (i.e. an item in a FlatList)
    container: {
        //Set background color to white
        backgroundColor: 'white',
        //Give rounded corners
        borderRadius: 10,
        //Add padding
        padding: 5,
        //Add flex
        flex: 1,
        //Make the item straight in a row
        flexDirection: 'row',
        //Center it out
        alignItems: 'center',
    },
    //Style for images, sets their dimensions
    image: {
        //Set width
        width: 75,
        //Make sure it scales properly
        aspectRatio: 1,
        //Center it
        alignSelf: 'center',
        //Set right margin
        marginRight: 10
    },
    //Style for the title of content
    title: {
        //Give a lot of weight
        fontWeight: '500',
        //Set size of text
        fontSize: 16,
        //Set bottom margin
        marginBottom: 5
    },
    //Style for text like price and size
    subtitleContainer: {
        //Set flex to row
        flexDirection: 'row',
        //Add a gap
        gap: 5
    },
    //Style for the quantity selector (plus and minus signs)
    quantitySelector: {
        //Set flex to row
        flexDirection: 'row',
        //Add a gap
        gap: 10,
        //Center elements
        alignItems: 'center',
        //Add vertical margin
        marginVertical: 10
    },
    //Style for the quantity counter
    quantity: {
        //Set heavy weight
        fontWeight: '500',
        //Set size
        fontSize: 18
    },
    //Style for price of item
    price: {
        //Set color to blue
        color: Colors.light.tint,
        //make font bold
        fontWeight: 'bold'
    }
});

//Export CartListItem const so other files can access it.
export default CartListItem;