// GroceryList.tsx
import React, { useState } from 'react';
import { StyleSheet, View, Alert, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, TextInput, Button } from 'react-native';
import ListCreation from '@/components/ListCreation'; // Import the ListCreation component
import ListCard from '@/components/ListCard'; // Import the ListCard component
import styles from '@/components/styles';

interface GroceryListItem {
  listName: string;
  items: string[];
}

export default function GroceryList() {
  const [isCreatingList, setCreatingList] = useState<boolean>(false);
  const [groceryLists, setGroceryLists] = useState<GroceryListItem[]>([]);
  const [selectedList, setSelectedList] = useState<GroceryListItem | null>(null);
  const [newItem, setNewItem] = useState<string>('');

  const handleCreateNewList = (listName: string, items: string[]) => {
    if (listName.trim() === '' || items.some(item => item.trim() === '')) {
      Alert.alert('Error', 'Please provide a name and at least one item.');
      return;
    }
    setGroceryLists([...groceryLists, { listName, items }]);
    Alert.alert('Success', `New list "${listName}" created with ${items.length} items.`);
    setCreatingList(false); // Hide the form after creating the list
  };

  const handleCardPress = (list: GroceryListItem) => {
    setSelectedList(list);
  };

  const handleAddItem = () => {
    if (selectedList) {
      // Update the items array with the new item
      const updatedList = {
        ...selectedList,
        items: [...selectedList.items, newItem],
      };
      setGroceryLists(groceryLists.map(list => (list.listName === selectedList.listName ? updatedList : list)));
      setSelectedList(updatedList);
      setNewItem(''); // Clear input field
    }
  };

  const handleDeleteList = () => {
    if (selectedList) {
      Alert.alert(
        'Confirm Deletion',
        `Are you sure you want to delete the list "${selectedList.listName}"?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Delete', 
            onPress: () => {
              setGroceryLists(groceryLists.filter(list => list.listName !== selectedList.listName));
              setSelectedList(null); // Deselect the list
            },
            style: 'destructive'
          }
        ]
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.groceryContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust behavior for iOS and Android
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} // Adjust offset based on platform
    >
      <Text style={styles.groceryText}>Grocery List</Text>
      <TouchableOpacity style={styles.genericButton} onPress={() => setCreatingList(true)}>
        <Text style={styles.buttonText}>Create New List</Text>
      </TouchableOpacity>

      {/* Conditional rendering of the ListCreation component */}
      {isCreatingList && (
        <ListCreation
          isVisible={isCreatingList}
          onClose={() => setCreatingList(false)}
          onCreate={handleCreateNewList}
        />
      )}

      {/* Display the created lists as cards */}
      <ScrollView style={styles.listContainer}>
        {groceryLists.map((list, index) => (
          <ListCard
            key={index}
            listName={list.listName}
            onPress={() => handleCardPress(list)}
          />
        ))}
      </ScrollView>

      {/* Display details of the selected list */}
      {selectedList && (
        <View style={styles.detailContainer}>
          <Text style={styles.detailHeader}>{selectedList.listName}</Text>
          <ScrollView style={styles.itemContainer}>
            {selectedList.items.map((item, idx) => (
              <Text key={idx} style={styles.detailItem}>- {item}</Text>
            ))}
          </ScrollView>
          <TextInput
            style={styles.input}
            placeholder="Add new item"
            value={newItem}
            onChangeText={setNewItem}
          />
          <Button title="Add Item" onPress={handleAddItem} />
          <Button title="Delete List" onPress={handleDeleteList} color="red" />
          <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedList(null)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}


