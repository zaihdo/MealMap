import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import IconButton from "./IconButton";
import { Image } from "expo-image";
import { saveToLibraryAsync } from "expo-media-library";

interface PictureViewProps {
    picture: string;
    setPicture: React.Dispatch<React.SetStateAction<string>>
    onClose: () => void
    onSave: (picture: string) => void
}
export default function PictureView({picture, setPicture, onClose, onSave}: PictureViewProps) {
    
    return (
         <View style={{flex: 1, margin: "-3%", alignItems: "stretch"}}>
          <View style={styles.rightButtonContainer}>
            <IconButton
              iosName="arrow.up"
              androidName="save"
              containerStyle={{backgroundColor: "green"}}
              onPress={()=> {
                onSave(picture);
              }}
            />
          </View>
          <View style={styles.leftButtonContainer}>
            <IconButton
              iosName="xmark"
              androidName="close"
              containerStyle={{backgroundColor: "red"}}
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
      paddingHorizontal: 15,
      paddingVertical: 40,
    },
    leftButtonContainer: {
      position: "absolute",
      zIndex: 1,
      left: 6,
      paddingHorizontal: 15,
      paddingVertical: 40,
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
  