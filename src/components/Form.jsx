import { useState } from 'react'
import IngredientsList from './IngredientsList.jsx'

export default function Form()  {
    const [ingredients, setIngredients] = useState([])

    function addIngredient(FormData) {
        const newIngredient = FormData.get('ingredient')
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    return (
        <main className='form-component'> 
            <form action = {addIngredient} className='add-ingredient-form'>
                <input type='text' placeholder='e.g.: oregano' name='ingredient' />
                <button type='submit'>+ Add Ingredient</button>
            </form>
            {ingredients.length > 0 && <IngredientsList ingredients={ingredients} ></IngredientsList>}
        </main>
    )
}