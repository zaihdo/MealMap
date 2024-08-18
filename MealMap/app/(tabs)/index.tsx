// import BottomRowTools from '@/components/BottomRowTools';
// import MainRowActions from '@/components/MainRowActions';
// import PictureView from '@/components/PictureView';
// import VideoViewComponent from '@/components/VideoView';
// import { CameraView, CameraType, useCameraPermissions, CameraMode } from 'expo-camera';
// import {usePermissions} from 'expo-media-library';
// import React from 'react';
// import { useState } from 'react';
// import { Button, StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   const [facing, setFacing] = useState<CameraType>('back');
//   const [cameraMode, setCameraMode] = useState<CameraMode>("picture");
//   const cameraRef = React.useRef<CameraView>(null);
//   const [cameraPermission, requestCameraPermission] = useCameraPermissions();
//   const [mediaPermission, requestMediaPermission] = usePermissions();
//   const [picture, setPicture] = useState<string>("");
//   const [video, setVideo] = useState<string>('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');

//   if (!cameraPermission && !mediaPermission) {
//     // Camera permissions are still loading.
//     return <View />;
//   }

//   if (!cameraPermission?.granted) {
//     // Camera permissions are not granted yet.
//     return (
//       <View style={styles.container}>
//         <Text style={styles.message}>We need your permission to show the camera</Text>
//         <Button onPress={requestCameraPermission} title="grant permission" />
//       </View>
//     );
//   }

//   if (!mediaPermission?.granted) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.message}>We need your permission to access your gallery</Text>
//         <Button onPress={requestMediaPermission} title="grant permission"></Button>

//       </View>
//     )
//   }

//   if (picture) return <PictureView picture={picture} setPicture={setPicture}/>
  
//   if (video) return <VideoViewComponent video={video} setVideo={setVideo}/>
  
//   async function handleTakePicture() {
//     const response = await cameraRef.current?.takePictureAsync({});
//     setPicture(response!.uri);
//   }

//   async function handleTakeVideo() {
//     const response = await cameraRef.current?.recordAsync({});
//     setVideo(response!.uri)
//   }

//   function toggleCameraMode(value:CameraMode) {
//     setCameraMode(value);
//   }
//   function toggleCameraFacing() {
//     setFacing(current => (current === 'back' ? 'front' : 'back'));
//   }

//   return (
//     <View style={styles.container}>
//       <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
//           <MainRowActions 
//             cameraMode={cameraMode} 
//             isRecording={false}
//             handleTakePicture={cameraMode === "picture" ? handleTakePicture : handleTakeVideo }
//           />
//           <BottomRowTools cameraMode={cameraMode} setCameraMode={setCameraMode} cameraFacing={facing} setCameraFacing={setFacing}></BottomRowTools>
//       </CameraView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   message: {
//     textAlign: 'center',
//     paddingBottom: 10,
//   },
//   camera: {
//     flex: 1,
//   },
//   buttonContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     // alignItems: 'flex-end',
//     // justifyContent: 'flex-end',
//     marginTop: 45,
//     marginRight: 10
//   },
//   button: {
//     flex: 1,
//     alignSelf: 'flex-end',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'white',
//   },
// });
import React, { useState } from 'react';
import { StyleSheet, View, Button, TextInput, Text, TouchableOpacity, Keyboard } from 'react-native';
import CameraViewComponent from '@/components/Camera';

export default function App() {
  const [showCamera, setShowCamera] = useState(false);
  const [inputText, setInputText] = useState('');
  const [uploadedText, setUploadedText] = useState('');

  const handleUpload = () => {
    setUploadedText(inputText);
    setInputText(''); // Clear the input field after uploading
    Keyboard.dismiss(); // Dismiss the keyboard after upload
  };

  return (
    <View style={styles.container}>

      {showCamera ? (
        <CameraViewComponent onClose={() => setShowCamera(false)} />
      ) : (
        <View style={styles.contentContainer}>
          <Text style={styles.welcomeText}>Welcome to Your App</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Type something..."
            value={inputText}
            onChangeText={setInputText}
            multiline
            onSubmitEditing={handleUpload} // Trigger upload when the "Enter" key is pressed
            blurOnSubmit={true} // Dismiss keyboard when submitting
            placeholderTextColor="#888"
            returnKeyType="done" // Change the "Enter" key to "Done"
          />

          <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
            <Text style={styles.buttonText}>Upload</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cameraButton} onPress={() => setShowCamera(true)}>
            <Text style={styles.buttonText}>Open Camera</Text>
          </TouchableOpacity>

          {uploadedText ? (
            <Text style={styles.uploadedText}>You uploaded: {uploadedText}</Text>
          ) : null}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  contentContainer: {
    alignItems: 'center',
  },
  textInput: {
    width: '100%',
    padding: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    minHeight: 50, // Minimum height for the text box
    maxHeight: 150, // Set maximum height to prevent overflow
    textAlignVertical: 'top', // Align text at the top
  },
  uploadButton: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    marginBottom: 20,
  },
  cameraButton: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#2196F3',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '500',
  },
  uploadedText: {
    fontSize: 16,
    color: '#555',
    marginTop: 20,
    textAlign: 'center',
  },
});
