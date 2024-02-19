import { StyleSheet, Image } from 'react-native';

import EditScreenInfo from '@/src/components/EditScreenInfo';
import { Text, View } from '@/src/components/Themed';
import Colors from '../constants/Colors';
import {Product} from '../types';
import {Link} from 'expo-router';

export const defaultPizzaImage=
    'https://sawepecomcdn.blob.core.windows.net/ph-web-ordering/Pizza_Hut_PL/Zdjecia/Refresh_26.10.23/WWW/1.PIZZE/pizza_pepperoni_1000x1000.jpg';

type ProductListItemProps={
    product: Product;
}

const ProductListItem=({product}: ProductListItemProps)=> {
  return(
    <Link href={`../menu/${product.id}`} style={styles.container}>
        <Text style={{fontSize: 5}}> </Text>
        <Image 
            style={styles.image} 
            source={{uri: product.image || defaultPizzaImage}}
            resizeMode="contain"
        />
        <Text style={styles.subTitle}>{product.name}</Text>
        <Text> {'\n'} </Text>
        <Text style={styles.price}>${product.price}</Text>
    </Link>
  )
}

export default ProductListItem;


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'orange',
    padding: 10,
    flex: 1,
    maxWidth: '50%'
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: 'bold'
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  }
});