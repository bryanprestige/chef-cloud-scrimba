import { useState } from 'react'
import Recipe from './Recipe.jsx'
import Loading from './LoadinScreen.jsx'
import {getRecipeFromChefClaude} from '../ai.js'
export default function IngredientsList(props)  {
    const ingredients = props.ingredients
    const[recipe, setRecipe] = useState('')
    const [isLoading, setIsLoading] = useState(true);
    const [buttonClicked, setButtonClicked] = useState(false)
    const ingredientsListItems = ingredients.map((ingredient) => {
        return <li key={ingredient}>{ingredient}</li>
   })

   async function getRecipe() {
    setButtonClicked(true)
    setIsLoading(true)
    const recipeGenerated = await getRecipeFromChefClaude(ingredients)
    setRecipe(recipeGenerated)
    setIsLoading(false)
    setButtonClicked(false)
  }
 
  return (
    <section className='ingredients-container'>
      <h2 className='ingredients-header'>Ingredients on hand:</h2>
      <ul className="ingredients-list" aria-live="polite">{ingredientsListItems}</ul>
      {ingredients.length > 3 && 
      <div className="get-recipe-container">
        <div>
          <h3>Ready for a recipe?</h3>
          <p>Generate a recipe from your list of ingredients.</p>
        </div>
        <button onClick={getRecipe}>Get a recipe</button>
        </div>}
        {buttonClicked && isLoading ? (
          <Loading />
        ) : (
          recipe && <Recipe recipe={recipe}></Recipe>
        )}
    </section>
  )
}
