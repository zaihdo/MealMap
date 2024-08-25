
import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, TouchableOpacity, Keyboard, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import CameraViewComponent from '@/components/Camera';
import RecentActivity from '@/components/RecentActivity';
import { Image } from 'expo-image';

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
          <Text style={styles.welcomeText}>Welcome to BudgetBites</Text>
          {/* {uploadedText ? (
            <Text style={styles.uploadedText}>You uploaded: {uploadedText}</Text>
          ) : null} */}
          {image ? (
              <Image source={image} style={{width: '100%', height: 300, borderRadius: 25, marginBottom: 10}}></Image>
              //<Text style={styles.uploadedText}>You uploaded: {uploadedText}</Text>
          ) : null}
          <TextInput
            style={styles.textInput}
            placeholder="Enter your ingredients..."
            value={inputText}
            onChangeText={setInputText}
            multiline
            onSubmitEditing={handleUpload} // Trigger upload when the "Enter" key is pressed
            blurOnSubmit={true} // Dismiss keyboard when submitting
            placeholderTextColor="#888"
            returnKeyType="default" // Change the "Enter" key to "Done"
          />

          <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
            <Text style={styles.buttonText}>Submit List</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cameraButton} onPress={() => setShowCamera(true)}>
            <Text style={styles.buttonText}>Upload Picture</Text>
          </TouchableOpacity>

          <RecentActivity data={recentData} />
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'left',
    marginBottom: 30,
    marginTop: 30,
    color: '#333',
    flex: 2,
    flexDirection: "row",
    width: "100%",
  },
  contentContainer: {
    paddingBottom: 20, // Ensure padding at the bottom so content is not cut off
  },
  textInput: {
    width: '100%',
    padding: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    minHeight: 50, // Minimum height for the text box
    maxHeight: 150, // Set maximum height to prevent overflow
    textAlignVertical: 'top', // Align text at the top
  },
  uploadButton: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    marginBottom: 20,
  },
  cameraButton: {
    width: '100%',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#2196F3',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '500',
  },
  uploadedText: {
    fontSize: 16,
    color: '#555',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
});
