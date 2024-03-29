import { Component, OnDestroy, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

    recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
      this.recipeService.recipesChanged
        .subscribe(
            (recipes: Recipe[]) => {
                this.recipes = recipes;
            }
        )
      this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy() {
      this.recipeService.recipesChanged.unsubscribe();
  }

}
