// import { Image, StyleSheet, Platform, Button, View, TouchableOpacity } from 'react-native';

// import { HelloWave } from '@/components/HelloWave';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
// import {} from 'expo-camera';
// import Camera from '@/components/Camera';
// import { TabBarIcon } from '@/components/navigation/TabBarIcon';
// import { IconButton } from '@/components/IconButton';
// import React from 'react';
// import { Ionicons } from '@expo/vector-icons';

// export default function HomeScreen() {
//   const [cameraVisible, setCameraVisible] = React.useState(false);

//   React.useEffect(() => {
//     // handleCamera();
//   }, [])
  
//   const handleCamera = () => {
//     setCameraVisible(!cameraVisible)
//   }
  
//   return (
//     <View style={styles.container}>
//       {cameraVisible ? (
//         <Camera/> 
//       ) : (
//         <TouchableOpacity style={styles.button} onPress={handleCamera}>
//           <Ionicons name="camera-outline" size={32} color="black" />
//           {/* <Text>Open Camera</Text> */}
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     // justifyContent: 'center',
//     // alignItems: 'center',
//   },
//   button: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     backgroundColor: '#ddd',
//     borderRadius: 5,
//   },
//   label: {
//     marginLeft: 8,
//     fontSize: 16,
//   },
//   camera: {
//     flex: 1,
//     width: '100%',
//   },
//   buttonContainer: {
//     flex: 1,
//     backgroundColor: 'transparent',
//     flexDirection: 'row',
//     margin: 20,
//   },
//   closeButton: {
//     position: 'absolute',
//     bottom: 20,
//     left: 20,
//     backgroundColor: '#fff',
//     padding: 10,
//     borderRadius: 5,
//   },
//   text: {
//     fontSize: 18,
//     color: '#000',
//   },
// });
// import React from 'react'
// import { CameraView } from 'expo-camera'
// import { Image, StyleSheet, Platform, View, Text } from 'react-native';

// import { HelloWave } from '@/components/HelloWave';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import IconButton from '@/components/IconButton';

// export default function Camera() {
//     const cameraRef = React.useRef<CameraView>(null);

//     return (
//     <View style={{flex: 1}}>
//       <CameraView ref={cameraRef} style={{flex: 1}}>
//         <IconButton iosName={'0.circle'} androidName={'key'}        
//         />
//       </CameraView>
//     </View>
//   )
// }
import BottomRowTools from '@/components/BottomRowTools';
import IconButton from '@/components/IconButton';
import MainRowActions from '@/components/MainRowActions';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  // const [permission, requestPermission] = useCameraPermissions();

  // if (!permission) {
  //   // Camera permissions are still loading.
  //   return <View />;
  // }

  // if (!permission.granted) {
  //   // Camera permissions are not granted yet.
  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.message}>We need your permission to show the camera</Text>
  //       <Button onPress={requestPermission} title="grant permission" />
  //     </View>
  //   );
  // }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
          {/* <IconButton iosName={'0.circle'} androidName={'key'}  /> */}
          <MainRowActions handleTakePicture={() => {}}></MainRowActions>
          <BottomRowTools></BottomRowTools>
        {/* <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity> */}
        {/* </View> */}
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
