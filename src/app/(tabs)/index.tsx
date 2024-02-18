import { StyleSheet, Image } from 'react-native';

import EditScreenInfo from '@/src/components/EditScreenInfo';
import { Text, View } from '@/src/components/Themed';
import Colors from '../../constants/Colors';
import Products from '../../../assets/data/Products';

const product=Products.products[1];

const ProductListItem=()=> {
  return(
    <View style={styles.container}>
      <Text style={styles.title}>Pizza Hut</Text>
      <Text style={{fontSize: 5}}> </Text>
      <Image style={styles.image} source={{uri: product.image}}/>
      <Text style={styles.subTitle}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  )
}

export default function TabOneScreen() {
  return (
    <View>
      <ProductListItem/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lime',
    padding: 10,
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
    width: '25%',
    aspectRatio: 1,
  }
});
