import React, { useRef, useState } from 'react';
import { CameraView, CameraType, useCameraPermissions, CameraMode } from 'expo-camera';
import { usePermissions } from 'expo-media-library';
import { StyleSheet, View, Text, Button } from 'react-native';
import BottomRowTools from '@/components/BottomRowTools';
import MainRowActions from '@/components/MainRowActions';
import PictureView from '@/components/PictureView';
import VideoViewComponent from '@/components/VideoView';

export default function CameraViewComponent({ onClose }: { onClose: () => void }) {
  const [facing, setFacing] = useState<CameraType>('back');
  const [cameraMode, setCameraMode] = useState<CameraMode>("picture");
  const cameraRef = useRef<CameraView>(null);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = usePermissions();
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [picture, setPicture] = useState<string>("");
  const [video, setVideo] = useState<string>("");

  if (!cameraPermission && !mediaPermission) {
    return <View />;
  }

  if (!cameraPermission?.granted) {
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
    );
  }

  
  async function handleTakePicture() {
    const response = await cameraRef.current?.takePictureAsync({});
    setPicture(response!.uri);
  }
  
  async function handleTakeVideo() {
    if (isRecording) {
      cameraRef.current?.stopRecording();
      setIsRecording(false);
    } else {
      const response = await cameraRef.current?.recordAsync({});
      setVideo(response!.uri);
    }
  }
  
  if (picture) return <PictureView picture={picture} setPicture={setPicture} />;
  if (video) return <VideoViewComponent video={video} setVideo={setVideo} />;
  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <MainRowActions
          cameraMode={cameraMode}
          isRecording={isRecording}
          handleTakePicture={cameraMode === "picture" ? handleTakePicture : handleTakeVideo}
        />
        <BottomRowTools
          cameraMode={cameraMode}
          setCameraMode={setCameraMode}
          cameraFacing={facing}
          setCameraFacing={setFacing}
        />
        <Button title="Close Camera" onPress={onClose} />
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
});
