import { postRecipe } from '../services/RecipeService'

import * as data from './data.json'

data.recipes.forEach((recipe) => {
  postRecipe(recipe, recipe.image).catch((error) => console.error(error))
})

export default data
