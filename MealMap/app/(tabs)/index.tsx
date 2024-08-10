import { Image, StyleSheet, Platform, Button, View, TouchableOpacity } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {} from 'expo-camera';
import Camera from '@/components/Camera';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { IconButton } from '@/components/IconButton';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [cameraVisible, setCameraVisible] = React.useState(false);

  React.useEffect(() => {
    // handleCamera();
  }, [])
  
  const handleCamera = () => {
    setCameraVisible(!cameraVisible)
  }
  
  return (
    <View style={styles.container}>
      {cameraVisible ? (
        <Camera/> 
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleCamera}>
          <Ionicons name="camera-outline" size={32} color="black" />
          {/* <Text>Open Camera</Text> */}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  closeButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    color: '#000',
  },
});
