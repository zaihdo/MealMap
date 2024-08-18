import React from 'react';
import { StyleSheet, View } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import RecipeList from '@/components/RecipeList'; // Assuming you've placed the RecipeList in the components directory

const recipes = [
  {
    id: '1',
    name: 'Spaghetti Carbonara',
    picture: 'https://images.pexels.com/photos/4518844/pexels-photo-4518844.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.',
    time: '30 minutes',
  },
  {
    id: '2',
    name: 'Chicken Alfredo',
    picture: 'https://images.pexels.com/photos/11220209/pexels-photo-11220209.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Creamy pasta with tender chicken pieces and a rich Alfredo sauce.',
    time: '25 minutes',
  },
  {
    id: '3',
    name: 'Caesar Salad',
    picture: 'https://images.pexels.com/photos/6107787/pexels-photo-6107787.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'A fresh salad with Romaine lettuce, croutons, and Caesar dressing.',
    time: '15 minutes',
  },
  // Add more recipes as needed
];

export default function Recipes() {
  return (
    <View>
        <RecipeList recipes={recipes} />
    </View>    
  );
}

const styles = StyleSheet.create({
  // Add any additional styles if needed
});
