import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
	ingredientsChanged = new Subject<Ingredient[]>();
	startedEditing = new Subject<number>();

	private ingredients: Ingredient[] = [
		new Ingredient('Potato', 12),
		new Ingredient('Fries', 1),
		new Ingredient('Apples', 5),
	];

	getIngredients() {
		return this.ingredients.slice();
	}

	getIngredient(index: number) {
		return this.ingredients[index];
	}

	addIngredient(ingredient: Ingredient) {
		this.ingredients.push(ingredient);
		this.refresh();
	}

	addIngredients(ingredients: Ingredient[]) {
		this.ingredients.push(...ingredients);
		this.refresh();
	}

	updateIngredient(ingredient: Ingredient, index: number) {
		this.ingredients[index] = ingredient;
		this.refresh();
	}

	deleteIngredient(index: number) {
		this.ingredients.splice(index, 1);
		this.refresh();
	}

	refresh() {
		this.ingredientsChanged.next(this.ingredients.slice());
	}
}
