import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import DataService from '@/services/dataService';
import { useGlobalSearchParams } from 'expo-router';

const StoreComparisonScreen = ({}) => {
  const [storeResults, setStoreResults] = useState<StoreResults | null>(null);
  const [cheapestStore, setCheapestStore] = useState<string | null>(null);
  const { ingredientsProp } = useGlobalSearchParams();

  useEffect(() => {
    const fetchResults = async () => {
      const dataService = new DataService();
      const ingredientsArray = Array.isArray(ingredientsProp) ? ingredientsProp : [ingredientsProp]; // Ensure it's always an array
      const results = await dataService.getStoreResults(ingredientsArray);
      if (results) {
        setStoreResults(results);
        setCheapestStore(findCheapestStore(results));
      }
    };
    fetchResults();
  }, [ingredientsProp]);

  const findCheapestStore = (results: StoreResults): string => {
    return Object.entries(results).reduce((a, b) => a[1].totalCost < b[1].totalCost ? a : b)[0];
  };

  const renderStoreResult = ({ item: [storeName, result] }: { item: [string, StoreResult] }) => (
    <View style={[styles.storeContainer, storeName === cheapestStore && styles.cheapestStore]}>
      <Text style={styles.storeName}>{storeName}</Text>
      <Text style={styles.totalCost}>Total: ${result.totalCost.toFixed(2)}</Text>
      <FlatList
        data={result.items}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.itemDetails}>
              <Text style={styles.ingredientText}>Ingredient: {item.ingredient}</Text>
              <Text style={styles.matchedItemText}>Matched Item: {item.matchedProduct}</Text>
            </View>
            <Text style={styles.priceText}>${item.price.toFixed(2)}</Text>
          </View>
        )}
        keyExtractor={(item) => item.ingredient}
      />
    </View>
  );

  if (!storeResults) {
    return <Text>Loading...</Text>;
  }

  const potentialSavings = cheapestStore ? 
    Math.max(...Object.values(storeResults).map(r => r.totalCost)) - storeResults[cheapestStore].totalCost : 0;

  return (
    <View style={styles.container}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>Cheapest Store: {cheapestStore}</Text>
        <Text style={styles.savingsText}>Potential Savings: ${potentialSavings.toFixed(2)}</Text>
      </View>
      <FlatList
        data={Object.entries(storeResults)}
        renderItem={renderStoreResult}
        keyExtractor={([storeName]) => storeName}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#f5f5f5' },
  summary: { padding: 15, backgroundColor: '#e0f7fa', borderRadius: 10, marginBottom: 15 },
  summaryText: { fontSize: 18, fontWeight: 'bold', color: '#00796b' },
  savingsText: { fontSize: 16, color: '#388e3c' },
  storeContainer: { marginBottom: 25, padding: 15, backgroundColor: '#fff', borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 3 }, elevation: 1 },
  cheapestStore: { borderColor: '#43a047', borderWidth: 2, backgroundColor: "#e6ffe6" },
  storeName: { fontSize: 20, fontWeight: 'bold', marginBottom: 5, color: '#424242' },
  totalCost: { fontSize: 18, fontWeight: 'bold', color: '#d32f2f', marginBottom: 15 },
  itemContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  itemDetails: { flex: 1 },
  ingredientText: { fontSize: 16, color: '#424242' },
  matchedItemText: { fontSize: 14, color: '#757575', marginTop: 2 },
  priceText: { fontSize: 16, fontWeight: 'bold', color: '#388e3c' },
});

export default StoreComparisonScreen;
