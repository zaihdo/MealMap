import React, { useRef, useState } from 'react';
import { CameraView, CameraType, useCameraPermissions, CameraMode } from 'expo-camera';
import { usePermissions } from 'expo-media-library';
import { StyleSheet, View, Text, Button } from 'react-native';
import BottomRowTools from '@/components/BottomRowTools';
import MainRowActions from '@/components/MainRowActions';
import PictureView from '@/components/PictureView';
import VideoViewComponent from '@/components/VideoView';
import IconButton from './IconButton';

interface CameraViewProps {
  onClose: () => void;
  onSave: (picture: string) => void;
}

export default function CameraViewComponent({ onClose, onSave }: CameraViewProps) {
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
  
  if (picture) return <PictureView onSave={onSave} setPicture={setPicture} onClose={onClose} picture={picture} />;
  if (video) return <VideoViewComponent video={video} setVideo={setVideo} />;
  return (
    <View style={{flex: 2, marginHorizontal: "-3%", alignItems: "stretch", justifyContent: "center"}}>
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
        <View style={styles.leftButtonContainer}>
            <IconButton
              iosName="xmark"
              androidName="close"
              onPress={onClose}
            />
          </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    alignItems: 'stretch',
  },
  leftButtonContainer: {
    position: "absolute",
    zIndex: 1,
    left: 6,
    paddingTop: 50,
    gap: 10
  },
});
