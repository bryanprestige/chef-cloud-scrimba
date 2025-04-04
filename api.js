import { getRecipeFromChefClaude } from './src/ai.js';

export async function handler(event) {
  const ingredients = event.body.ingredients;
  const recipe = await getRecipeFromChefClaude(ingredients);
  return {
    statusCode: 200,
    body: JSON.stringify({ recipe }),
  };
}