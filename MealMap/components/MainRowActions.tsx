import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { CameraMode } from 'expo-camera';
import { Image } from 'expo-image';
import { Asset, getAlbumsAsync, getAssetsAsync } from 'expo-media-library';
import { SymbolView } from 'expo-symbols';
import React from 'react'
import { TouchableOpacity, View, StyleSheet, ScrollView, FlatList } from 'react-native'

interface MainRowActionProps {
    handleTakePicture: ()=> void;
    cameraMode: CameraMode;
    isRecording: boolean;
}

export default function MainRowActions({handleTakePicture, cameraMode, isRecording}: MainRowActionProps) {
  const [assets, setAssets] = React.useState<Asset[]>([]);

  async function getAlbums() {
    const fetchedAlbums = await getAlbumsAsync();
    const albumAssets = await getAssetsAsync({
        album: fetchedAlbums[0],
        mediaType: "photo",
        sortBy: "creationTime",
        first: 4
    });
    console.log(albumAssets);
    setAssets(albumAssets.assets);
  }

  React.useEffect(() => {
    getAlbums();
  }, [assets])
  return (
    <View style={styles.container}>
        <ScrollView horizontal={true} contentContainerStyle={{gap: 4}} showsHorizontalScrollIndicator={false}>
        {[0, 1, 2].map((item) => (
            <SymbolView
            key={item}
            name="photo.circle"
            size={40}
            type="hierarchical"
            tintColor={"white"}
        />
        ))}       
        </ScrollView>
        <FlatList
            data={assets}
            horizontal
            showsHorizontalScrollIndicator={true}
            inverted
            contentContainerStyle={{gap: 6}}
            renderItem={({item}) => (
                <Image
                    key={item.id}
                    source={item.uri}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 5
                    }}
                />
            )}
        />
        <TouchableOpacity>
            <SymbolView 
            name={
                cameraMode=== "picture"
                ? "circle" : isRecording ? "record.circle" : "circle.circle" } 
            size={90} type='hierarchical' 
            tintColor={isRecording ? Colors.dark.snapPrimary : "white"}
            animationSpec={{
                effect: {
                    type: isRecording ? "pulse" : "bounce"
                },
                repeating: isRecording
            }}

            fallback={<Ionicons size={90} name={'add-circle'} color={Colors.dark.snapPrimary} />}
            >
            </SymbolView>    
        </TouchableOpacity> 
        <ScrollView horizontal={true} contentContainerStyle={{gap: 4}} showsHorizontalScrollIndicator={false}>
        {[0, 1, 2,].map((item) => (
            <SymbolView
            key={item}
            name="photo"
            size={40}
            type="hierarchical"
            tintColor={"white"}
        />
        ))}       
        </ScrollView>
    </View>

  )
}

const styles = StyleSheet.create({
    container: {
        bottom: 45,
        height: 100,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
    }
})