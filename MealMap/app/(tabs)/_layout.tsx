import { Redirect, Tabs } from 'expo-router';
import React, {useState} from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import useIsFirstOpen from '@/hooks/useIsFirstOpen';
import { TouchableOpacity, View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { isFirstTime, isLoading} = useIsFirstOpen();

  if (isLoading) return <></>;
  if (isFirstTime) return <Redirect href={"/onboarding"}/>;
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
      name="index"
      options={{
        headerShown: true,
        title: 'PriceTrackGrocer', // We will set a custom headerTitle, so no default title
        headerTitleStyle: {
          fontSize: 28, // Enlarge the text
          fontWeight: 'bold', // Make the text bold
          textAlign: 'left', // Unfortunately, textAlign won't work with the default header title
        },
        // headerTitle: () => (
        //   <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        //     <Text style={{ fontSize: 24, fontWeight: 'bold', flex: 1, textAlign: 'left' }}>
        //       PriceTrackGrocer
        //     </Text>
        //   </View>
        // ),
        headerRight: () => (
          <TouchableOpacity style={{ marginRight: 15 }}>
            <Ionicons name="search" size={24} color="black" />
          </TouchableOpacity>
        ),
        tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? 'camera' : 'home-outline'} size={24} color={color} />
        ),
 
      }}
    />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="recipes"
        options={{
          title: 'Recipes',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'fast-food' : 'fast-food-outline'} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="GroceryList"
        options={{
          title: 'GroceryList',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'cart' : 'cart-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
