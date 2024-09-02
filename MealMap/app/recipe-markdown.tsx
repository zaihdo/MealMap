import DataService from '@/services/dataService';
import { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, SectionList, StyleSheet, TouchableOpacity } from 'react-native';
import { useGlobalSearchParams } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import styles from '@/components/styles';


export default function RecipeMarkdown() {
    const [data, setData] = useState<RecipeResponse>();
    const [loading, setLoading] = useState<boolean>(true);
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const { imageProp } = useGlobalSearchParams();

    useEffect(() => {
        const fetchRecipe = async () => {
            const ds = new DataService();
            try {
                const fetchedRecipe = Array.isArray(imageProp)
                    ? await ds.uploadImage(imageProp[0])
                    : await ds.uploadImage(imageProp);

                setRecipe(fetchedRecipe?.Recipes[0] || null);
            } catch (error) {
                console.error('Error fetching recipe:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, []);

    const renderItem = ({ item }: { item: string }) => (
        <View style={styles2.card}>
            <Text style={styles2.cardText}>{item}</Text>
        </View>
    );

    const renderSectionHeader = ({ section }: { section: { title: string } }) => (
        <Text style={styles2.sectionTitle}>{section.title}</Text>
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (!recipe) {
        return <Text>No recipe found</Text>;
    }

    const sections = [
        { title: 'Description', data: [recipe.description] },
        { title: 'Ingredients', data: recipe.ingredients },
        { title: 'Steps', data: recipe.steps },
        { title: 'Additional Information', data: [recipe.additional_info] },
    ];

    return (
        <View style={styles2.container}>
            <ThemedView style={styles2.titleContainer}>
             <ThemedText type="subtitle">{recipe.name}</ThemedText>
            </ThemedView>
            <SectionList
                style={styles2.sectionContainer}
                sections={sections}
                renderSectionHeader={renderSectionHeader}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles2.listContent}
            />
            <View style={{flex: 0}}>
            <TouchableOpacity style={styles.cameraButton}>
            <Text style={styles.buttonText}>Get Ingredients</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Save Recipe</Text>
          </TouchableOpacity>
            </View>
        </View>
    );
}

const styles2 = StyleSheet.create({
    sectionContainer: {
        marginBottom: 25
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    listContent: {
        flexGrow: 1,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '800',
        marginBottom: 10,
        color: '#444',
    },
    card: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    cardText: {
        fontSize: 16,
        color: '#555',
    },
    continueButton: {
        backgroundColor: Colors.dark.foravaGreen,
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 10,
        left: 16,
        right: 16,
    },
    continueButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
});
