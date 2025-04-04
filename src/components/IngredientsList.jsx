import { useState } from 'react'
import Recipe from './Recipe.jsx'

export default function IngredientsList(props)  {

    const ingredients = props.ingredients
    console.log('ingredients', ingredients)
    
    const ingredientsListItems = ingredients.map((ingredient) => {
        return <li key={ingredient}>{ingredient}</li>
   })

    const [getRecipe, setGetRecipe] = useState(false)

    function getSuggestedRecipe() {
        setGetRecipe(true)
        
    }
    return (
        <section className='ingredients-container'>
            <h2 className='ingredients-header'>Ingredients on hand:</h2>
            <ul className="ingredients-list" aria-live="polite">{ingredientsListItems}</ul>
            {ingredients.length > 3 && <div className="get-recipe-container">
                <div>
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                </div>
                <button onClick={getSuggestedRecipe}>Get a recipe</button>
            </div>}
            {getRecipe && <Recipe></Recipe>}
        </section>
    )
    
}
