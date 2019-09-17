import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Recipe } from '../model/recipe';
const RECIPE_SERVER = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class RecipeServiceService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  public getAllRecipes(): Observable<any> {
    return this.http
      .get<Recipe>(RECIPE_SERVER + '/recipe/all');//.subscribe((response:Recipe[])) => { console.log(response['_body']); });

  }
  public getRecipeById(id: number): Observable<any> {
    return this.http
      .get<Recipe>(RECIPE_SERVER + '/recipe/findById/' + id);
  }
  public createRecipe(recipe: Recipe): Observable<any> {
    return this.http.post<Recipe>(RECIPE_SERVER + '/recipe/addRecipe', JSON.stringify(recipe), this.httpOptions);
  }
  public updateRecipe(recipe: Recipe): Observable<any> {
    return this.http.put<Recipe>(RECIPE_SERVER + '/recipe/' + recipe.id, JSON.stringify(recipe), this.httpOptions);

  }

  public deleteRecipe(recipe: Recipe): Observable<any> {
    return this.http.delete<Recipe>(RECIPE_SERVER + '/recipe/' + recipe.id);
  }
}
