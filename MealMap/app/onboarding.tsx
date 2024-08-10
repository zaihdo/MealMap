import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SymbolView } from 'expo-symbols';

export default function OnboardingScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#1E807F', dark: '#5DB07F' }}
      headerImage={
        // <SymbolView 
        //     name="05.circle.fill"
        //     size={240}
        // />
        <Image
          source={require('@/assets/images/bargainBearHorizontal.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome to BargainBear!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">🛒 Find ingredients</ThemedText>
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
        <ThemedText type="subtitle">🍜 Get recommended recipes</ThemedText>
        <ThemedText>
          Having no inspiration? Select from a recommended recipe to try out.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">🤖 Leverage AI </ThemedText>
        <ThemedText>
          Upload pictures and let our AI do the rest
          {/* <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>. */}
        </ThemedText>
      </ThemedView>
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
