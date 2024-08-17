import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import IconButton from './IconButton'
import { Link } from 'expo-router'
import { ThemedText } from './ThemedText'
import { CameraMode } from 'expo-camera'

export default function BottomRowTools() {
 const [cameraMode, setCameraMode] = useState<CameraMode>("picture");

 function toggleCamearMode() {
    setCameraMode(cameraMode === "picture" ? "video" : "picture");
 }
  return (
    <View style={[styles.bottomContainer, styles.directionRowItemsCenter]}>
        <Link href={"/media-library"} asChild>
            <IconButton iosName={'photo.stack'} androidName={'library'}/>
        </Link>
        <View style={styles.directionRowItemsCenter}>
            <TouchableOpacity onPress={toggleCamearMode}>
                <ThemedText style={cameraMode == "picture" ? {fontWeight: 'bold'} : {fontWeight: "black"}}>Picture</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleCamearMode}>
                <ThemedText style={cameraMode == "video" ? {fontWeight: 'bold'} : {fontWeight: "black"}}>Video</ThemedText>
            </TouchableOpacity>
        </View>
        <IconButton iosName='magnifyingglass' androidName='add'></IconButton>
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