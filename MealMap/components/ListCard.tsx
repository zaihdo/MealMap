// ListCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styles from './styles';

interface ListCardProps {
  listName: string;
  onPress: () => void;
}

const ListCard: React.FC<ListCardProps> = ({ listName, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.cardText}>{listName}</Text>
    </TouchableOpacity>
  );
};



export default ListCard;
