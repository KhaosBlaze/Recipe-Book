import { EventEmitter } from '@angular/core'

import { Recipe } from './recipe.model'

export class RecipeService {
	recipeSelected = new EventEmitter<Recipe>();

	private recipes: Recipe[] = [
        new Recipe('Test Recipe', 'Just a path', 'https://img.jamieoliver.com/jamieoliver/recipe-database/oldImages/large/1571_2_1437661403.jpg?tr=w-800,h-1066'),
        new Recipe('Another Test Recipe', 'Just a path', 'https://img.jamieoliver.com/jamieoliver/recipe-database/oldImages/large/1571_2_1437661403.jpg?tr=w-800,h-1066')
	];

	getRecipes() {
		return this.recipes.slice();
	}
}
