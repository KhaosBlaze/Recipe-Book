import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shoppingList.service'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
    ingredients: Ingredient[] = [];

  constructor(private ingredientService: ShoppingListService) { }

  ngOnInit(): void {
      this.ingredients = this.ingredientService.getIngredients();
  }

  onIngredientAdded(ingredient: Ingredient) {
      this.ingredients.push(ingredient);
  }

}