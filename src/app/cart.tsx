import { View, Text, Platform, FlatList } from "react-native";
import {StatusBar} from 'expo-status-bar';
import { useCart } from "../providers/CartProvider";
import { CartItem } from "../types";
import CartListItem from "../components/CartListItem";
import Button from '@components/Buttons'

const CartScreen=()=> {
    const{items, total}=useCart();
    return (
        //Flatlist UI to organize items in cart in a list of one column
        <View style={{padding: 10}}>
            <FlatList 
            data={items} 
            renderItem={({item})=><CartListItem cartItem={item}/>}
            contentContainerStyle={{padding: 10, gap: 10}}
            />
            <Text style={{marginTop: 20, fontSize: 20, fontWeight: '500'}}>Total: ${total}</Text>
            <Button text="Checkout"/>
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    );
};

export default CartScreen;