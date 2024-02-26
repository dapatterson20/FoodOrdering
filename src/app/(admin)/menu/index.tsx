// "StyleSheet", "Image", and "FlatList" are modules imported from "react-native". 
// "StyleSheet" allows for stylesheets to be created for styling React Native components 
// using a JavaScript syntax similar to CSS.
// "Image" is used to display images.
// "Flatlist" is used to render data lists, particularly with extensive datasets, 
// by displaying only the items currently visible on the screen.
import { StyleSheet, Image, FlatList } from 'react-native';

// "EditScreenInfo" is being imported from a file located in a directory named src and then components, 
// and within that directory, there's a file named "EditScreenInfo".
import EditScreenInfo from '@/src/components/EditScreenInfo';

// The "Text" and "View" modules are being imported from a file located in a directory 
// named src and then components, and within that directory, there's a file named "Themed".
import { Text, View } from '@/src/components/Themed';

// This imports the "Colors" file within the "constants" directory.
import Colors from '../../../constants/Colors';
// This imports the "products" file within the "assets" directory under "data".
import products from '@assets/data/Products';
// This imports the "ProductListItem" file from the "components" directory.
import ProductListItem from '@components/ProductListItem';

// The function "MenuScreen" is being defined and will be responsible for displaying 
// a list of products in a grid layout with two columns.
export default function MenuScreen() {
  return ( // return the following...
    //Shows list of items including product name, image, and price
    <FlatList
      data={products} // This sets the data of "FlatList" to be the "products". This will be the data displayed in the list.
      renderItem={({item})=> <ProductListItem product={item}/>} // This will render each product in the list.
      numColumns={2} // The list will have two columns.
      contentContainerStyle={{gap: 10, padding: 10}} // This adds padding around the list and sets the gap between items to 10.
      columnWrapperStyle={{gap: 10}} // This sets styles for the column container. It sets the gap between columns to 10.
  />
  );
}
