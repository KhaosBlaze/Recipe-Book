import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
	ingredients: Ingredient[] = [
		new Ingredient('Potato', 12),
		new Ingredient('Fries', 1),
	];

	getIngredients() {
		return this.ingredients.slice();
	}
}
