import { Image } from "expo-image";
import { Asset, getAssetsAsync } from "expo-media-library";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";


export default function MediaLibraryScreen({}) {
    const [assets, setAssets] = useState<Asset[]>([]);

    useEffect(()=> {
        getAlbums();
    }, []);

    async function getAlbums() {
        const albumAssets = await getAssetsAsync({
            mediaType: "photo",
            sortBy: "creationTime"
        });
        setAssets(albumAssets.assets);
    }

    return (
        <>
        <ScrollView
            contentContainerStyle={{
                flexDirection: "row",
                flexWrap: "wrap"
            }}
        >
            {assets.map((photo) => (
                <Image key={photo.id} source={photo.uri} style={{width: "25%", height: 100}}/>
            ))}
        </ScrollView>
        </>
    );
}