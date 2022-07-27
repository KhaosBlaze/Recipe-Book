import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';
import { ShoppingListService } from '../shopping-list/shoppingList.service';

@Injectable()
export class RecipeService {
	recipeSelected = new EventEmitter<Recipe>();

	private recipes: Recipe[] = [
        new Recipe(
			'Test Recipe',
			'Just a path',
			'https://img.jamieoliver.com/jamieoliver/recipe-database/oldImages/large/1571_2_1437661403.jpg?tr=w-800,h-1066',
			[
				new Ingredient('Meat', 1),
				new Ingredient('French Bread', 1),
				new Ingredient('French Fries', 12)
			]
		),
        new Recipe(
			'Another Test Recipe',
			'Just a path',
			'https://img.jamieoliver.com/jamieoliver/recipe-database/oldImages/large/1571_2_1437661403.jpg?tr=w-800,h-1066',
			[
				new Ingredient('Cheese', 1),
				new Ingredient('Bread', 1),
				new Ingredient('SOUP', 12)
			]
		)
	];

	constructor(private slService: ShoppingListService){}

	getRecipes() {
		return this.recipes.slice();
	}

	getRecipe(index: number) {
		return this.recipes.slice()[index];
	}

	addIngredientsToShoppingList(ingredients: Ingredient[]) {
		this.slService.addIngredients(ingredients);
	}
}
