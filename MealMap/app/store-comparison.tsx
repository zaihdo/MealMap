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
            <Text>{item.ingredient}</Text>
            <Text>{item.matchedProduct}</Text>
            <Text>${item.price.toFixed(2)}</Text>
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
        <Text style={styles.summaryText}>Potential Savings: ${potentialSavings.toFixed(2)}</Text>
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
  container: { flex: 1, padding: 10 },
  summary: { padding: 10, backgroundColor: '#e0e0e0', marginBottom: 10 },
  summaryText: { fontSize: 16, fontWeight: 'bold' },
  storeContainer: { marginBottom: 20, padding: 10, borderWidth: 1, borderColor: '#ddd' },
  cheapestStore: { backgroundColor: '#e6ffe6' },
  storeName: { fontSize: 18, fontWeight: 'bold' },
  totalCost: { fontSize: 16, marginBottom: 10 },
  itemContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
});

export default StoreComparisonScreen;