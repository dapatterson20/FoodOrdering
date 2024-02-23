//Import various elements from react to update quantity and check its children
import {PropsWithChildren, createContext, useContext, useState} from 'react';
//Import structs from types.ts to use variables here
import { CartItem, Product } from '../types';

//Struct to keep track of item, quantity, etc.
type CartType={
    //Array of cart items
    items: CartItem[],
    //Function to potentially add new products to the list
    addItem: (product: Product, size: CartItem['size'])=>void;
    //Function to update quantity of a particular item
    updateQuantity: (itemName: string, itemSize: string, amount: -1 | 1)=> void;
    //Total to keep track of quantity
    total: number;
}

//Funciton which sets variables from struct above
const CartContext=createContext<CartType>({
    //Set items to empty array
    items: [],
    //Add item is an empty function
    addItem: ()=>{},
    //Update empty for now
    updateQuantity:()=>{},
    //total initialized to 0
    total: 0,
    },
);

//Main function, handles updating the quantity of items
const CartProvider=({children}: PropsWithChildren)=> {
    //Get state of this cart item to get its information for further use
    const [items, setItems]=useState<CartItem[]>([]);

    const addItem=(product: Product, size: CartItem['size'])=>{
        //if already in cart, increment quantity
        const existingItem=items.find(item=>item.product==product && item.size==size);
        //Check if item is already in cart
        if (existingItem) {
            //If so, then update the quantity of that item in the cart
            updateQuantity(existingItem.product.name, existingItem.size, 1);
            //Return to end function
            return;
        }
        //Define values of item based on struct found in types.ts
        const newCartItem:CartItem={
            //ID of item
            id: '1', //generate
            //Product entry from Products.ts
            product,
            //ID from Products.ts
            product_id: product.id,
            //Set Size (M, L, etc.)
            size,
            //Number of items to be purchased
            quantity: 1,
            //Unique ID, combination of name with ID from Products.ts; actually goes unused!
            nameID: product.name+product.id,
        };
        setItems([newCartItem, ...items]);
    };

    //Update quantity: make sure not to add duplicate items to array of items in cart; if same name and size, simply increment  quantity counter.
    const updateQuantity= (itemName: string, itemSize: string, amount: -1 | 1)=> {
        //Check if item already in the cart, if so, increase its quantity; if not, add new element to cart list
        const updatedItems=items.map(item=>item.product.name+item.size!=itemName+itemSize? item: {...item, quantity: item.quantity+amount});
        //Set cart list items with new values
        setItems(updatedItems.filter((item)=>item.quantity>0));
    };

    //Set total quantity.
    const total=items.reduce((sum, item)=>(sum+=item.product.price*item.quantity),0);

    //Elements to be returned and thus accessed by other files
    return (
        //Value is the updated quantity
        //Handle children of item
        <CartContext.Provider value={{items,addItem,updateQuantity, total}}>
            {children}
        </CartContext.Provider>
    );
};

//Export main function's return value
export default CartProvider;

//Export function so it can be called externally
export const useCart=()=>useContext(CartContext);