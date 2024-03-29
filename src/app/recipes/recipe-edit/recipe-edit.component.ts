import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model'

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
    recipeForm: FormGroup;
    id: number;
    editMode: boolean = false;

  constructor(private route: ActivatedRoute,
            private recipeService: RecipeService,
            private router: Router) { }

  ngOnInit(): void {
      this.route.params.subscribe(
          (params: Params) => {
              this.id = +params['id'];
              this.editMode = params['id'] != null;
              this.initForm();
          }
      )
  }

  onSubmit() {
      const newRecipe = new Recipe(
          this.recipeForm.value['name'],
          this.recipeForm.value['imagePath'],
          this.recipeForm.value['description'],
          this.recipeForm.value['ingredients']
      );

      if(this.editMode) {
          this.recipeService.updateRecipe(newRecipe, this.id);
      } else {
          this.recipeService.addRecipe(newRecipe);
      }
      this.onCancel();
  }

  onCancel() {
      this.router.navigate(['../'], {relativeTo: this.route})
  }

  onAddIngredient() {
      (<FormArray>this.recipeForm.get('ingredients')).push(
          new FormGroup({
              'name': new FormControl(null, Validators.required),
              'amount': new FormControl(null, [
                  Validators.required,
                  Validators.min(1)
              ])
          })
      )
  }

  onDeleteIngredient(index: number) {
      (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  private initForm() {
      let recipeName = '';
      let recipeImagePath = '';
      let recipeDescription = '';
      let recipeIngredients = new FormArray([]);

      if (this.editMode) {
          const recipe = this.recipeService.getRecipe(this.id);
          recipeName = recipe.name;
          recipeImagePath = recipe.imagePath;
          recipeDescription = recipe.description;
          if(recipe['ingredients']) {
              for (let ingredient of recipe.ingredients) {
                  recipeIngredients.push(
                      new FormGroup({
                          'name': new FormControl(ingredient.name, Validators.required),
                          'amount': new FormControl(ingredient.amount, [
                              Validators.required,
                              Validators.min(1)
                          ])
                      })
                  );
              }
          }

      }

      this.recipeForm = new FormGroup({
          'name': new FormControl(recipeName, Validators.required),
          'imagePath': new FormControl(recipeImagePath, Validators.required),
          'description': new FormControl(recipeDescription, Validators.required),
          'ingredients': recipeIngredients
      })
  }

}
