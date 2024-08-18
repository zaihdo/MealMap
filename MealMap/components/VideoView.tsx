import { CameraType } from "expo-camera";
import React, { useRef, useState } from "react";
import { TouchableOpacity, View, StyleSheet, Alert } from "react-native";
import IconButton from "./IconButton";
import { Image } from "expo-image";
import { saveToLibraryAsync } from "expo-media-library";
import { useVideoPlayer, VideoView } from "expo-video";

interface VideoViewComponentProps {
    video: string;
    setVideo: React.Dispatch<React.SetStateAction<string>>
}
export default function VideoViewComponent({video, setVideo}: VideoViewComponentProps) {
    const videoViewRef = useRef<VideoView>(null);
    const player = useVideoPlayer(video, (player) => {
      player.loop = true;
    })
    return (
         <View>
          <View style={styles.rightButtonContainer}>
            <IconButton
              iosName="arrow.down"
              androidName="save"
              onPress={()=> {
                saveToLibraryAsync(video)
                Alert.alert("Saved to gallery")
              }}
            />
          </View>
          <View style={styles.leftButtonContainer}>
            <IconButton
              iosName="xmark"
              androidName="close"
              onPress={()=> {
                setVideo("")
              }}
            />
          </View>
          <VideoView ref={videoViewRef} player={player} allowsFullscreen nativeControls style={{width: '100%', height: "100%"}}/>
         </View> 
    )
}

const styles = StyleSheet.create({
    rightButtonContainer: {
      position: "absolute",
      zIndex: 1,
      right: 6,
      paddingTop: 50,
      gap: 10
    },
    leftButtonContainer: {
      position: "absolute",
      zIndex: 1,
      left: 6,
      paddingTop: 50,
      gap: 10
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
  