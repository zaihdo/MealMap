// ListCreation.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ScrollView, Text, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import styles from './styles';

// Define the types for the props
interface ListCreationProps {
  isVisible: boolean;
  onClose: () => void;
  onCreate: (listName: string, items: string[]) => void;
}

const ListCreation: React.FC<ListCreationProps> = ({ isVisible, onClose, onCreate }) => {
  const [listName, setListName] = useState<string>('');
  const [items, setItems] = useState<string[]>(['']); // Start with one empty item input

  // Function to add a new item input
  const addItem = () => {
    setItems([...items, '']);
  };

  // Function to handle changes in item input
  const handleItemChange = (text: string, index: number) => {
    const newItems = [...items];
    newItems[index] = text;
    setItems(newItems);
  };

  // Function to handle the creation of a new list
  const handleCreate = () => {
    if (listName.trim() === '' || items.some(item => item.trim() === '')) {
      Alert.alert('Error', 'Please provide a name and at least one item.');
      return;
    }
    onCreate(listName, items);
    // Clear the input fields
    setListName('');
    setItems(['']); // Reset to one empty item input
    onClose();
  };

  // Render the component only if isVisible is true
  if (!isVisible) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust behavior for iOS and Android
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} // Adjust offset based on platform
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.innerContainer}>
          <Text style={styles.header}>Create a New List</Text>
          <TextInput
            style={styles.input}
            placeholder="List Name"
            value={listName}
            onChangeText={setListName}
          />
          {items.map((item, index) => (
            <TextInput
              key={index}
              style={styles.input}
              placeholder={`Item ${index + 1}`}
              value={item}
              onChangeText={(text) => handleItemChange(text, index)}
            />
          ))}

          <TouchableOpacity style={styles.groceryButtons} onPress={addItem}>
            <Text style={styles.buttonText}>Add Item</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.groceryButtons} onPress={handleCreate}>
            <Text style={styles.buttonText}>Create List</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};



export default ListCreation;
