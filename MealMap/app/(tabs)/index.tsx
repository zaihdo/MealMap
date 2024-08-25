

import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, TouchableOpacity, Keyboard, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import CameraViewComponent from '@/components/Camera';
import RecentActivity from '@/components/RecentActivity';
import styles from '@/components/styles'
import { Image } from 'expo-image';
import DataService from '@/services/dataService';

const recentData = [
  { id: '1', title: 'Uploaded Recipe: Spaghetti Bolognese', daysAgo: 2 },
  { id: '2', title: 'Grocery List: Weekly Shopping', daysAgo: 3 },
  { id: '3', title: 'Grocery List: Meal Prep ingredients', daysAgo: 5 },
];

export default function App() {
  const [showCamera, setShowCamera] = useState(false);
  const [inputText, setInputText] = useState<string>("");
  const [uploadedText, setUploadedText] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const router = useRouter();

  const handleUpload = () => {
    setUploadedText(inputText);
    setInputText(''); // Clear the input field after uploading
    Keyboard.dismiss(); // Dismiss the keyboard after upload
  };

  const handlePictureSave = (image: string) => {
    setImage(image);
    setShowCamera(false);
    console.log(image);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined} // Adjust behavior for iOS and Android
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} // Adjust offset based on platform
    >
      {showCamera ? (
        <CameraViewComponent onSave={handlePictureSave} onClose={() => setShowCamera(false)} />
      ) : (
        <ScrollView style={{ flex: 1 }}contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
          <Text style={styles.welcomeText}>Forage | Find | Feast</Text>
          {/* {uploadedText ? (
            <Text style={styles.uploadedText}>You uploaded: {uploadedText}</Text>
          ) : null} */} 
          {image ? (
              <>
                <Text style={styles.subheadingText}>Preview</Text>
                <Image source={image} style={{width: '100%', height: 300, borderRadius: 25, marginBottom: 10}}></Image>
                <TouchableOpacity style={styles.cameraButton} onPress={() => {new DataService().uploadImage(image)}}>
                  <Text style={styles.buttonText}>Upload Image</Text>
                </TouchableOpacity>
              </>
              //<Text style={styles.uploadedText}>You uploaded: {uploadedText}</Text>
          ) : null}
          {/* <TextInput
            style={styles.textInput}
            placeholder="Enter your ingredients..."
            value={inputText}
            onChangeText={setInputText}
            multiline
            onSubmitEditing={handleUpload} // Trigger upload when the "Enter" key is pressed
            blurOnSubmit={true} // Dismiss keyboard when submitting
            placeholderTextColor="#888"
            returnKeyType="default" // Change the "Enter" key to "Done"
          /> */}

          {/* <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
            <Text style={styles.buttonText}>Submit List</Text> 
          </TouchableOpacity> */}

          <TouchableOpacity style={styles.cameraButton} onPress={() => router.push('/GroceryList')}>
            <Text style={styles.buttonText}>Create Grocery List</Text> 
          </TouchableOpacity>

          {!image ? (
            <TouchableOpacity style={styles.cameraButton} onPress={() => setShowCamera(true)}>
            <Text style={styles.buttonText}>Upload Recipe</Text>
          </TouchableOpacity>
          ): null}

          <TouchableOpacity style={styles.cameraButton} onPress={handleUpload}>
            <Text style={styles.buttonText}>Compare Prices</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cameraButton} onPress={() => router.push('/recipes')}>
            <Text style={styles.buttonText}>Recommended Recipes</Text>
          </TouchableOpacity>

          <RecentActivity data={recentData} />
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
}
