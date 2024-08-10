import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type IconButtonProps = {
  onPress: () => void;
  iconName: React.ComponentProps<typeof Ionicons>['name'];  // Correct typing for Ionicons name
  iconSize?: number;
  iconColor?: string;
  label?: string;
};

export const IconButton: React.FC<IconButtonProps> = ({
  onPress,
  iconName,
  iconSize = 24,
  iconColor = 'black',
  label,
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons name={iconName} size={iconSize} color={iconColor} />
      {label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
  },
});
