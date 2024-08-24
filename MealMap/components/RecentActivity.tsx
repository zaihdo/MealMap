import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface RecentActivityProps {
  data: { id: string; title: string; daysAgo: number }[];
}

export default function RecentActivity({ data }: RecentActivityProps) {
  return (
    <View style={styles.container}>
    <Text style={styles.headerText}> Recent Activity</Text>
      {data.map((item) => (
        <View key={item.id} style={styles.itemContainer}>
          <Text style={styles.itemText}>{item.title}</Text>
          <Text style={styles.daysAgoText}>{item.daysAgo} days ago</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  itemContainer: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#333',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    paddingVertical: 5
  },
  daysAgoText: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
});
