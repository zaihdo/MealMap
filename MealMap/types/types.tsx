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