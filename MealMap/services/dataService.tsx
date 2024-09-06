// Data Service

class DataService {
    private baseUrl = "https://forava-service-tbqsewu5uq-uc.a.run.app" // should move to env vars

    constructor() {

    }

    public async uploadImage(imageUri: string): Promise<RecipeResponse | null> {
        try {
            const formData = new FormData();
            const fileName = imageUri.split('/').pop() || 'photo.jpg';
            const fileType = fileName.split('.').pop() || 'jpeg';
            formData.append('image', {
                uri: imageUri,
                name: fileName,
                type: `image/${fileType}`,
            } as any);
    
            const response = await fetch(`${this.baseUrl}/generate-recipe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.text();
    
            // Parse the JSON string into a RecipeResponse object
            const recipeResponse: RecipeResponse = JSON.parse(data);
    
            console.log('Recipe markdown', recipeResponse);
            return recipeResponse;
        } catch (error) {
            console.error('Error uploading image', error instanceof Error ? error.message : String(error));
            return null; // Return null to indicate failure
        }
    }

    public async getStoreResults(ingredients: string[]): Promise<StoreResults | null> {
        try {
          const response = await fetch(`${this.baseUrl}/price-compare-by-store`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ingredients }),
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
    
          const data = await response.json();
          console.log('Store results', data);
    
          // Assuming the API returns the data in the correct format
          return data.storeResults as StoreResults;
        } catch (error) {
          console.error('Error fetching store results', error instanceof Error ? error.message : String(error));
          return null; // Return null to indicate failure
        }
      }
    
}

export default DataService;