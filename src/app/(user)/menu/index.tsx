import { StyleSheet, Image, FlatList } from 'react-native';

import EditScreenInfo from '@/src/components/EditScreenInfo';
import { Text, View } from '@/src/components/Themed';
import Colors from '../../../constants/Colors';
import products from '@assets/data/Products';
import ProductListItem from '@components/ProductListItem';

export default function MenuScreen() {
  return (
    //List of products in two columns
    <FlatList
      data={products}
      renderItem={({item})=> <ProductListItem product={item}/>}
      numColumns={2}
      contentContainerStyle={{gap: 10, padding: 10}}
      columnWrapperStyle={{gap: 10}}
  />
  );
}
