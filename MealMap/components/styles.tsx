import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fefefe",
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 30,
    marginTop: 30,
    color: "#333",
    flex: 2,
    flexDirection: "row",
    width: "100%",
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20, // Ensure padding at the bottom so content is not cut off
  },
  textInput: {
    width: "100%",
    padding: 15,
    fontSize: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    minHeight: 50, // Minimum height for the text box
    maxHeight: 150, // Set maximum height to prevent overflow
    textAlignVertical: "top", // Align text at the top
  },
  genericButton: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#2196F3",
    marginBottom: 20,
  },
  uploadButton: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    marginBottom: 20,
  },
  cameraButton: {
    width: "100%",
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#2196F3",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "500",
    textAlign: "center"
  },
  uploadedText: {
    fontSize: 16,
    color: "#555",
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
  },

  listContainer: {
    flex: 1,
  },
  listItem: {
    marginBottom: 15,
  },
  listName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  listItemText: {
    fontSize: 16,
    marginLeft: 10,
  },
  // Grocery List
  groceryButtons:
  {
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#2196F3",
    padding: 5,
  },
  cancelButton:{
    width: "100%",
    borderRadius: 10,
    backgroundColor: "red",
    padding: 5,
  },
    groceryText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
    createListButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  groceryContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  detailContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
    justifyContent: "center",
  },
  detailHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  detailItem: {
    fontSize: 18,
    color: "white",
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    backgroundColor: "white",
  },
  itemContainer: {
    maxHeight: 200,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#ff4444",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  // ListCreation.tsx
  innerContainer: {
    flex: 2,
    justifyContent: "center",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // for Android shadow
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default styles;
