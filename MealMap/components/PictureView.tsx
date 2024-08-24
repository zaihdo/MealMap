import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import IconButton from "./IconButton";
import { Image } from "expo-image";
import { saveToLibraryAsync } from "expo-media-library";

interface PictureViewProps {
    picture: string;
    setPicture: React.Dispatch<React.SetStateAction<string>>
}
export default function PictureView({picture, setPicture}: PictureViewProps) {
    
    return (
         <View>
          <View style={styles.rightButtonContainer}>
            <IconButton
              iosName="arrow.down"
              androidName="save"
              onPress={()=> {
                saveToLibraryAsync(picture)
                Alert.alert("Saved to gallery")
              }}
            />
          </View>
          <View style={styles.leftButtonContainer}>
            <IconButton
              iosName="xmark"
              androidName="close"
              onPress={()=> setPicture("")}
            />
          </View>
          <Image source={picture} style={{width: '100%', height: "100%"}}></Image>
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
  