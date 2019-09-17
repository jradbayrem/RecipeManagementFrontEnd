import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Location } from '@angular/common';

import { Recipe } from '../../model/recipe';
import { RecipeServiceService } from '../../services/recipe-service.service';


@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  recipe: Recipe;

  recipes: Recipe[];

  constructor(private router: Router, private route: ActivatedRoute, private recipeService: RecipeServiceService,
    private location: Location) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.getRecipeById(parseInt(params.get('recipe_id'), 10));
    });
  }


  public getRecipeById(id: number): void {
    this.recipeService.getRecipeById(id).subscribe(
      (response) => {
        this.recipe = response;
        console.log(this.recipe);

      });
  }

  findRecipeById(id: number): Recipe {
    for (const recipe of this.recipes) {
      if (recipe.id === id) {
        return recipe;
      }
    }

    return null;
  }

  goBackButtonPressed(): void {
    this.location.back();
  }

  public deleteButtonPressed(): void {

    this.recipeService.deleteRecipe(this.recipe).subscribe(
      (response) => {
        this.router.navigateByUrl('/recipes');

      }
    )

  }


  public editButtonPressed(): void {
    this.router.navigateByUrl('/editnewrecipe/' + this.recipe.id);
  }

}
