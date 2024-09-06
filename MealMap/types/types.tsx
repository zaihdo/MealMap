interface Recipe {
    name: string;
    description: string;
    ingredients: string[];
    steps: string[];
    additional_info: string;
}

interface RecipeResponse {
    Recipes: Recipe[];
} 

interface IngredientsInput {
    ingredients: string[];
}

interface Item {
    ingredient: string;
    matchedProduct: string;
    price: number;
}
  
interface StoreResult {
totalCost: number;
items: Item[];
}

interface StoreResults {
[storeName: string]: StoreResult;
}

interface APIResponse {
storeResults: StoreResults;
}