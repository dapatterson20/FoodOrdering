import { FontAwesome } from '@expo/vector-icons';
import {Stack, Link} from 'expo-router';
import {Pressable} from 'react-native';
import Colors from '../../../constants/Colors';

export default function MenuStack() {
    return <Stack>
        <Stack.Screen name="index" options={{title: 'Menu', headerRight: () => (
            <Link href="/(admin)/menu/create" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="plus"
                    size={25}
                    color="lime"
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),}}/>
          
    </Stack>
}