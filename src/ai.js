import { HfInference } from '@huggingface/inference'
import Anthropic from "@anthropic-ai/sdk"

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients.
You don't need to use every ingredient they mention in your recipe. The recipe can include maximun 3 additional ingredients they didn't mention. Avoid using ingredients that wouldn't be available at a usual store.
Format your response in markdown to make it easier to render to a web page
`


/*ADD 3 DIFFERENT RECIPIES SHOWN ON THE PAGE*/ 
/*WHEN THE USER CLICKS ON THE RECIPE, IT SHOULD SHOW THE RECIPE,AND HIDE THE OTHER OPTIONS, ALSO A HIDE RECIPE BUTTON SHOULD SHOW*/ 
/*USER CAN EDIT ITS DECISION BY ADDING OR REMOVING INGREDIENTS*/ 
/**/ 


/*=====ANTHROPIC API =====*/

const anthropic = new Anthropic({
    apiKey: import.meta.env.VITE_ANTHROPIC_TOKEN,

    dangerouslyAllowBrowser: true,
})

export async function getRecipeFromChefClaude(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")

    const msg = await anthropic.messages.create({
        model: "claude-3-haiku-20240307",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [
            { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!, i want to make something with` },
        ],
    });
    return msg.content[0].text
}

/*=====HUGGING FACE API =====*/

const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN)

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    try {
        
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        })
        return response.choices[0].message.content
    } catch (err) {
        console.error(err.message)
    }
}