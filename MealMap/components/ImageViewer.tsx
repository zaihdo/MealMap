import {StyleSheet, Image, Dimensions, ImageSourcePropType} from 'react-native';

const wWidth = Dimensions.get('window').width;
const wHeight = Dimensions.get('window').height;

interface ImageViewerProps {
    placeHolderImageSource: ImageSourcePropType,
    selectedImage: string | null,
}

export default function ImageViewer({placeHolderImageSource, selectedImage} : ImageViewerProps){

    const imageSource = selectedImage ? {uri : selectedImage} : placeHolderImageSource;

    return (
        <Image source={imageSource} style={styles.image}/>
    );
}

const styles = StyleSheet.create({
    image:{
        width: 320,
        height: 440,
        borderRadius: 18
    }
});