import { Image, StyleSheet, Platform, Button, Alert } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SymbolView } from 'expo-symbols';
import { Colors } from '@/constants/Colors';
import {usePermissions} from 'expo-media-library';
import {useCameraPermissions} from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

export default function OnboardingScreen() {
 const [cameraPermissions, requestCameraPermissions] = useCameraPermissions();
 const [mediaLibraryPermissions, requestMediaLibraryPermissions] = usePermissions();

 async function handleContinue() {
    const allPermissions = await requestAllPermissions();
    if (allPermissions) {
        console.log(allPermissions);
        router.replace("/(tabs)");
    } else {
        Alert.alert("To continue please provide permissions in your phone's settings");
    }
 }

 async function requestAllPermissions() {
    const cameraStatus = await requestCameraPermissions();
    if (!cameraStatus.granted) {
        Alert.alert("Please provide camera access in order to upload your recipe pictures.")
        return false;
    }

    const mediaLibraryStatus = await requestMediaLibraryPermissions();
    if (!mediaLibraryStatus.granted) {
        Alert.alert("Please provide media library access in order to upload your recipe pictures.")
        return false;
    }

    await AsyncStorage.setItem("hasopened", "true");
    return true;
 }
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#1E807F', dark: '#5DB07F' }}
      headerImage={
        <SymbolView 
            name="camera.macro.circle"
            size={250}
            type="hierarchical"
            tintColor={Colors.dark.snapPrimary}
            animationSpec={{ 
                effect: {
                    type: "bounce"
                },
            }}
            fallback={
                <Image
              source={require('@/assets/images/bargainBearHorizontal.png')}
              style={styles.reactLogo}
            />
            }
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="subtitle" >Welcome to BudgetBites!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="defaultSemiBold">🛒 Find ingredients</ThemedText>
        <ThemedText>
          Search for the <ThemedText type="defaultSemiBold">cheapest</ThemedText> ingredients 
          for your recipes
          {/* Press{' '} */}
          {/* <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
          </ThemedText>{' '}
          to open developer tools. */}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="defaultSemiBold">🍜 Get recommended recipes</ThemedText>
        <ThemedText>
          Having no inspiration? Select from a recommended recipe to try out.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="defaultSemiBold">🤖 Leverage AI </ThemedText>
        <ThemedText>
          Upload pictures and let our AI do the rest
          {/* <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>. */}
        </ThemedText>
      </ThemedView>
      <Button title="Continue" onPress={handleContinue}></Button>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 148,
    width: 309,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
