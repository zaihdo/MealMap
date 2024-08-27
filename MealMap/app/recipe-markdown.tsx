import DataService from '@/services/dataService';
import { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, SectionList, StyleSheet, TouchableOpacity } from 'react-native';
import { useGlobalSearchParams } from 'expo-router';


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
    }, [imageProp]);

    const renderItem = ({ item }: { item: string }) => (
        <View style={styles.card}>
            <Text style={styles.cardText}>{item}</Text>
        </View>
    );

    const renderSectionHeader = ({ section }: { section: { title: string } }) => (
        <Text style={styles.sectionTitle}>{section.title}</Text>
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (!recipe) {
        return <Text>No recipe found</Text>;
    }

    const sections = [
        { title: 'Title', data: [recipe.name] },
        { title: 'Description', data: [recipe.description] },
        { title: 'Ingredients', data: recipe.ingredients },
        { title: 'Steps', data: recipe.steps },
        { title: 'Additional Information', data: [recipe.additional_info] },
    ];

    return (
        <View style={styles.container}>
            <SectionList
                sections={sections}
                renderSectionHeader={renderSectionHeader}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.listContent}
            />
            <TouchableOpacity style={styles.continueButton}>
                <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    listContent: {
        flexGrow: 1,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
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
        backgroundColor: '#007AFF',
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 30,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 30,
        left: 16,
        right: 16,
    },
    continueButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
