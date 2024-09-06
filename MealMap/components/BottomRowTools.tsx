import React, { useRef } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import IconButton from './IconButton'
import { Link } from 'expo-router'
import { ThemedText } from './ThemedText' // video view disabled
import { CameraMode, CameraType } from 'expo-camera'

interface BottomRowToolsProps {
    cameraMode: CameraMode;
    setCameraMode: (value: CameraMode) => void;
    cameraFacing: CameraType;
    setCameraFacing: (value: CameraType) => void;
    pickImage: () => void;
    saveImage: () => void;
}
export default function BottomRowTools({cameraMode, setCameraMode, cameraFacing, setCameraFacing, pickImage, saveImage}: BottomRowToolsProps) {
    const buttonRef = useRef<TouchableOpacity>(null);

 function toggleCameraFacing() {
    setCameraFacing(cameraFacing === "back" ? "front" : "back");
 }

 // video view disabled
 function toggleCameraMode() {
    setCameraMode(cameraMode === "picture" ? "video" : "picture");
    console.log("ssss"); 
 }

  return (
    <View style={[styles.bottomContainer, styles.directionRowItemsCenter]}>
        <IconButton ref={buttonRef} iosName={'photo'} androidName={'library'} onPress={pickImage}/>
        <IconButton
           ref={buttonRef}
           iosName="camera.rotate"
           androidName="flash"
           onPress={toggleCameraFacing}
          >
        </IconButton>
    </View>
    )
}

const styles = StyleSheet.create({
    directionRowItemsCenter: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    bottomContainer: {
        bottom: 5,
        paddingHorizontal: 5,
        width: "100%",
        justifyContent: "space-between",
        position: "absolute",
        alignSelf: "center"
    }
})