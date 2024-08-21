import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

interface Recipe {
  id: string;
  name: string;
  picture: string;  // URL or local path
  description: string;
  time: string;
}

interface RecipeListProps {
  recipes: Recipe[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  const renderRecipe = ({ item }: { item: Recipe }) => (
    <View style={styles.recipeCard}>
      <Image source={{ uri: item.picture }} style={styles.recipeImage} />
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeName}>{item.name}</Text>
        <Text style={styles.recipeDescription}>{item.description}</Text>
        <Text style={styles.recipeTime}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recommended Recipes</Text>
      <FlatList
        data={recipes}
        renderItem={renderRecipe}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    padding: 16,
    marginBottom:45,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    color: '#333',
  },
  listContent: {
    paddingBottom: 16,
  },
  recipeCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  recipeImage: {
    width: '100%',
    height: 150,
  },
  recipeInfo: {
    padding: 12,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  recipeDescription: {
    fontSize: 14,
    color: '#777',
    marginVertical: 4,
  },
  recipeTime: {
    fontSize: 12,
    color: '#999',
  },
});

export default RecipeList;
