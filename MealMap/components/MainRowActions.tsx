import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Asset, getAlbumsAsync, getAssetsAsync } from 'expo-media-library';
import { SymbolView } from 'expo-symbols';
import React from 'react'
import { TouchableOpacity, View, StyleSheet, ScrollView, FlatList } from 'react-native'

interface MainRowActionProps {
    handleTakePicture: ()=> void;
}

export default function MainRowActions(handleTakePicture: MainRowActionProps) {
  const [assets, setAssets] = React.useState<Asset[]>([]);

  async function getAlbums() {
    const albumAssets = await getAssetsAsync({
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
                    source={item.url}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 5
                    }}
                />
            )}
        />
        <TouchableOpacity>
            <SymbolView name={'circle'} size={90} type='hierarchical' tintColor={Colors.dark.snapPrimary}
                fallback={<Ionicons size={90} name={'add-circle'} color={Colors.dark.snapPrimary} />}
            >
            </SymbolView>    
        </TouchableOpacity> 
        <ScrollView horizontal={true} contentContainerStyle={{gap: 4}} showsHorizontalScrollIndicator={false}>
        {[0, 1, 2].map((item) => (
            <SymbolView
            key={item}
            name="photo"
            size={40}
            type="hierarchical"
            tintColor={"transparent"}
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