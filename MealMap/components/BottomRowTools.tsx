import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import IconButton from './IconButton'
import { Link } from 'expo-router'
import { ThemedText } from './ThemedText'
import { CameraMode, CameraType } from 'expo-camera'

interface BottomRowToolsProps {
    cameraMode: CameraMode;
    setCameraMode: (value: CameraMode) => void;
    cameraFacing: CameraType;
    setCameraFacing: (value: CameraType) => void;
}
export default function BottomRowTools({cameraMode, setCameraMode, cameraFacing, setCameraFacing}: BottomRowToolsProps) {

 function toggleCameraFacing() {
    setCameraFacing(cameraFacing === "back" ? "front" : "back");
 }
 function toggleCameraMode() {
    setCameraMode(cameraMode === "picture" ? "video" : "picture");
 }
  return (
    <View style={[styles.bottomContainer, styles.directionRowItemsCenter]}>
        <Link href={"/media-library"} asChild>
        <TouchableOpacity>
            <IconButton iosName={'photo.stack'} androidName={'library'}/>
        </TouchableOpacity>
        </Link>
        <View style={styles.directionRowItemsCenter}>
            <TouchableOpacity onPress={toggleCameraMode}>
                <ThemedText style={cameraMode == "picture" ? {fontWeight: 'bold'} : {fontWeight: "black"}}>Picture</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleCameraMode}>
                <ThemedText style={cameraMode == "video" ? {fontWeight: 'bold'} : {fontWeight: "black"}}>Video</ThemedText>
            </TouchableOpacity>
        </View>
        <IconButton
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
        gap: 12
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