//Import react library
import React from 'react';
//Import font awesome icons
import FontAwesome from '@expo/vector-icons/FontAwesome';
//Import linking and tab functions to create different tabs
import { Link, Tabs } from 'expo-router';
//Import pressable so buttons can be pressed
import { Pressable } from 'react-native';

//Import colors so the UI can be set to different colors
import Colors from '@/src/constants/Colors';
//Import color scheme module from useColorScheme.ts, exported from react
import { useColorScheme } from '@/src/components/useColorScheme';
//Import from ts file as server automatic rendering isn't supported
import { useClientOnlyValue } from '@/src/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
//Function to set icons of bottom tabs
function TabBarIcon(props: {
  //Name type
  name: React.ComponentProps<typeof FontAwesome>['name'];
  //Color type
  color: string;
}) {
  //Return size and style of icons
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

//Export tab layout to be shown on screen
export default function TabLayout() {
  //Set color scheme
  const colorScheme = useColorScheme();

  //Return UI elements to be shown on screen
  return (
    //Tabs container
    <Tabs
       //Screen options gives settings for tab
      screenOptions={{
        //Set active color based on color mode
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        //Tabs at the bottom of the screen below
        //Tabs.screen contains actual UI elements of tabs
      }}>

        <Tabs.Screen name="index" options={{href: null}}/>

      <Tabs.Screen
        //Set name to menu
        name="menu"
        //Contains more settings for tab
        options={{
          //Set title
          title: 'Menu',
          //Don't show a header
          headerShown: false,
          //Set the actual icon and color
          tabBarIcon: ({ color }) => <TabBarIcon name="cutlery" color={color} />,
          //next tabs.screen handles other tab
        }}
      />
      <Tabs.Screen
        //Set name to two
        name="two"
        //Contains more settings for tab
        options={{
          //Set title
          title: 'Orders',
          //Set icon and color
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
    </Tabs>
  );
}
