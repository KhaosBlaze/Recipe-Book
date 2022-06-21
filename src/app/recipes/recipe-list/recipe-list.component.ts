import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
    recipes: Recipe[] = [
        new Recipe('Test Recipe', 'Just a path', 'https://img.jamieoliver.com/jamieoliver/recipe-database/oldImages/large/1571_2_1437661403.jpg?tr=w-800,h-1066'),
        new Recipe('Test Recipe', 'Just a path', 'https://img.jamieoliver.com/jamieoliver/recipe-database/oldImages/large/1571_2_1437661403.jpg?tr=w-800,h-1066')
    ];

  constructor() { }

  ngOnInit(): void {
  }

}
