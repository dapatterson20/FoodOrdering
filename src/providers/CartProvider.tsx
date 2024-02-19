import {PropsWithChildren, createContext, useContext, useState} from 'react';
import { CartItem, Product } from '../types';

type CartType={
    items: CartItem[],
    addItem: (product: Product, size: CartItem['size'])=>void;
    updateQuantity: (itemName: string, itemSize: string, amount: -1 | 1)=> void;
    total: number;
}

const CartContext=createContext<CartType>({
    items: [],
    addItem: ()=>{},
    updateQuantity:()=>{},
    total: 0,
    },
);

const CartProvider=({children}: PropsWithChildren)=> {
    const [items, setItems]=useState<CartItem[]>([]);

    const addItem=(product: Product, size: CartItem['size'])=>{
        //if already in cart, increment quantity
        const existingItem=items.find(item=>item.product==product && item.size==size);
        if (existingItem) {
            updateQuantity(existingItem.product.name, existingItem.size, 1);
            return;
        }
        const newCartItem:CartItem={
            id: '1', //generate
            product,
            product_id: product.id,
            size,
            quantity: 1,
            nameID: product.name+product.id,
        };
        setItems([newCartItem, ...items]);
    };

    //Update quantity: make sure not to add duplicate items to array of items in cart; if same name and size, simply increment  quantity counter.
    const updateQuantity= (itemName: string, itemSize: string, amount: -1 | 1)=> {
        const updatedItems=items.map(item=>item.product.name+item.size!=itemName+itemSize? item: {...item, quantity: item.quantity+amount});
        setItems(updatedItems.filter((item)=>item.quantity>0));
    };

    const total=items.reduce((sum, item)=>(sum+=item.product.price*item.quantity),0);

    return (
        <CartContext.Provider value={{items,addItem,updateQuantity, total}}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;

export const useCart=()=>useContext(CartContext);