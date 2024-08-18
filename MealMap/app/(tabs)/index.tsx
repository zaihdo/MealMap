import BottomRowTools from '@/components/BottomRowTools';
import MainRowActions from '@/components/MainRowActions';
import PictureView from '@/components/PictureView';
import VideoViewComponent from '@/components/VideoView';
import { CameraView, CameraType, useCameraPermissions, CameraMode } from 'expo-camera';
import {usePermissions} from 'expo-media-library';
import React from 'react';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [cameraMode, setCameraMode] = useState<CameraMode>("picture");
  const cameraRef = React.useRef<CameraView>(null);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = usePermissions();
  const [picture, setPicture] = useState<string>("");
  const [video, setVideo] = useState<string>('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');

  if (!cameraPermission && !mediaPermission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!cameraPermission?.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestCameraPermission} title="grant permission" />
      </View>
    );
  }

  if (!mediaPermission?.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to access your gallery</Text>
        <Button onPress={requestMediaPermission} title="grant permission"></Button>

      </View>
    )
  }

  if (picture) return <PictureView picture={picture} setPicture={setPicture}/>
  
  if (video) return <VideoViewComponent video={video} setVideo={setVideo}/>
  
  async function handleTakePicture() {
    const response = await cameraRef.current?.takePictureAsync({});
    setPicture(response!.uri);
  }

  async function handleTakeVideo() {
    const response = await cameraRef.current?.recordAsync({});
    setVideo(response!.uri)
  }

  function toggleCameraMode(value:CameraMode) {
    setCameraMode(value);
  }
  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
          <MainRowActions 
            cameraMode={cameraMode} 
            isRecording={false}
            handleTakePicture={cameraMode === "picture" ? handleTakePicture : handleTakeVideo }
          />
          <BottomRowTools cameraMode={cameraMode} setCameraMode={setCameraMode} cameraFacing={facing} setCameraFacing={setFacing}></BottomRowTools>
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
    // alignItems: 'flex-end',
    // justifyContent: 'flex-end',
    marginTop: 45,
    marginRight: 10
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
