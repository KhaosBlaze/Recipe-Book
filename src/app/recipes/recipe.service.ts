import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';
import { ShoppingListService } from '../shopping-list/shoppingList.service';
import { Subject } from 'rxjs';


@Injectable()
export class RecipeService {
	recipesChanged = new Subject<Recipe []>();

	private recipes: Recipe[] = [
        // new Recipe(
		// 	'Test Recipe',
		// 	'Just a path',
		// 	'https://img.jamieoliver.com/jamieoliver/recipe-database/oldImages/large/1571_2_1437661403.jpg?tr=w-800,h-1066',
		// 	[
		// 		new Ingredient('Meat', 1),
		// 		new Ingredient('French Bread', 1),
		// 		new Ingredient('French Fries', 12)
		// 	]
		// ),
        // new Recipe(
		// 	'Another Test Recipe',
		// 	'Just a path',
		// 	'https://img.jamieoliver.com/jamieoliver/recipe-database/oldImages/large/1571_2_1437661403.jpg?tr=w-800,h-1066',
		// 	[
		// 		new Ingredient('Cheese', 1),
		// 		new Ingredient('Bread', 1),
		// 		new Ingredient('SOUP', 12)
		// 	]
		// )
	];

	constructor(private slService: ShoppingListService){}

	setRecipes(recipes: Recipe[]){
		this.recipes = recipes;
		this.refresh();
	}

	getRecipes() {
		return this.recipes.slice();
	}

	getRecipe(index: number) {
		return this.recipes.slice()[index];
	}

	addIngredientsToShoppingList(ingredients: Ingredient[]) {
		this.slService.addIngredients(ingredients);
	}

	addRecipe(recipe: Recipe) {
		this.recipes.push(recipe);
		this.refresh();
	}

	updateRecipe(recipe: Recipe, index: number) {
		this.recipes[index] = recipe;
		this.refresh();
	}

	deleteRecipe(index: number) {
		this.recipes.splice(index, 1);
		this.refresh();
	}

	refresh() {
		this.recipesChanged.next(this.recipes.slice())
	}
}
