import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shoppingList.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
    @ViewChild('f') slForm: NgForm;
    subscription: Subscription;
    editMode = false;
    editedItemIndex: number;
    editedIngredient: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
      this.subscription = this.slService.startedEditing.subscribe(
          (index: number) => {
              this.editMode = true;
              this.editedItemIndex = index;
              this.editedIngredient = this.slService.getIngredient(index);
              this.slForm.setValue({
                  name: this.editedIngredient.name,
                  amount: this.editedIngredient.amount
              })
          }
      );
  }

  onSubmit(form: NgForm) {
      const value = form.value;
      const newIngredient = new Ingredient(value.name, value.amount);
      if(this.editMode) {
          this.slService.updateIngredient(newIngredient, this.editedItemIndex);
      } else {
          this.slService.addIngredient(newIngredient);
      }
      this.editMode = false;
      form.reset();
  }

  onDelete() {
      this.slService.deleteIngredient(this.editedItemIndex);
      this.onClear();
  }

  onClear() {
      this.slForm.reset();
      this.editMode = false;
  }

  ngOnDestroy(){
      this.subscription.unsubscribe();
  }
}
