import {View, Text, Image, StyleSheet, Pressable} from 'react-native'
import React from 'react'
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import products from '@assets/data/Products';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import {useState} from 'react';
import Button from '@components/Buttons';
import { useCart } from '@/src/providers/CartProvider';
import { PizzaSize } from '@/src/types';


//Available pizza sizes
/*
Creating a list/array of strings which contains the available sizes of pizza
Comment by Lillie Hunter
*/
const sizes: PizzaSize[]=['S','M','L','XL'];

//Available pizza sizes

/*
Creating a constant component named Product Details Screen which will be the interface that user get 
a decription of various products and are able to add items to their cart. There is an add to cart component 
that when a product is selected (True) it will return that product, its selected size, and push it to the cart. Otherwise it will return nothing (null)
The compontent also returns how the product information is to be displayed (font styles, background colors).
Comment by Lillie Hunter
*/
const ProductDetailsScreen=() => {
    const{id}=useLocalSearchParams();
    const{addItem}=useCart();
    const router=useRouter();
    const[selectedSize, setSelectedSize]=useState<PizzaSize>('M');
    const product=products.find((p)=>p.id.toString()==id);
    const addToCart=()=> {
        if (!product) {
            return;
        }
        addItem(product, selectedSize);
        router.push('/cart');
    };
    if (!product) {
        return <Text>Oops! No food here!</Text>
    }
    return (
        <View style={styles.container}>
            <Stack.Screen options={{title: product.name}}/>
            <Image  //Product details screen UI
                source={{uri: product.image || defaultPizzaImage}}
                style={styles.image}
            />

            <Text>Select size:</Text>

            <View style={styles.sizes}>
                {sizes.map((size)=> (
                    <Pressable 
                        //Set size of item by pressing a size.
                        onPress={()=>{setSelectedSize(size)}}
                        style={[styles.size, {backgroundColor: selectedSize==size ? 'gainsboro': 'white'}]} key={size}
                        >
                        <Text style={[styles.sizeText, {color: selectedSize==size ? 'black': 'gray'}]}>{size}</Text>
                    </Pressable>))}
            </View>
            <Text style={styles.price}>${product.price}</Text>
            <Button onPress={addToCart} text="Add to cart" />
        </View>
    );
};

/*
This code contains the styes associated with the component and how it is to be displayed to the user. 
This includes styles for how the product's image, asociated price, and size is supposed to be displayed.
Comment by Lillie Hunter
*/

const styles=StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 10,
    },
    image: {
        width: '30%',
        aspectRatio: 1,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    sizes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    size: {
        backgroundColor: 'gainsboro',
        width: 50,
        aspectRatio: 1,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sizeText: {
        fontSize: 20,
        fontWeight: '500',
    },
});

/*
Deploys the component for usage in the project
Comment by Lillie Hunter
*/
export default ProductDetailsScreen
