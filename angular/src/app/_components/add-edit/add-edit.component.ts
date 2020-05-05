import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {NgForm} from '@angular/forms';
import {find, first} from "rxjs/operators";
import {Router} from "@angular/router";
import {Article} from "../../_models/article";
import {ArticleService} from "../../_services/article.service";
import {NotificationService} from "../../_services/notification.service";
import {AuthService} from "../../_services/auth.service";

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {

  formItems;
  articleForm;
  control: FormControl;

  ingredients = [];
  ingredientName = '';
  ingredientAmount = '';

  collection;

  private article: Article;


  constructor( private formBuilder: FormBuilder,
               private authService: AuthService,
               private articleservice: ArticleService,
               private notifService: NotificationService,
               private router: Router) {
    this.article = null;

    this.articleForm = this.formBuilder.group({
      collection: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      body: '',
      tags: new FormControl('', Validators.required),
      ingredients: '',
      instructions: '',
      image: ''
    });
  }

  ngOnInit() {
    if (this.router.url.split('/')[2]) {
      console.log('edit')

      //this.getPAEdit(this.router.url.split('/')[2]);

    }


  }

  addIngredient() {
    if (!this.ingredientName || !this.ingredientAmount)
      return;

    this.ingredients.push([this.ingredientAmount, this.ingredientName]);

    this.ingredientName = '';
    this.ingredientAmount = '';

    console.log(this.ingredients);
  }

  /*

  async getPAEdit(id) {
    this.parecordservice.getAll().subscribe(
      parecords => {
        this.parecord = parecords.find(e => e['id'] === id);

        this.parecordForm = this.formBuilder.group({
          activityType: `${this.parecord.activityType}`,
          date: this.parecord.createdDate,
          calories: this.parecord.calories,
          minutes: this.parecord.minutes
        });

        this.parecordForm.controls['date'].disable();

      },
      error => {
        this.notifService.showNotif(error.toString(), 'warning'); });
  }

   */

  onSubmit(articleData) {

    console.log(articleData);

    if (this.article) {//edit

    }
    else {
      let body = {
        article: {
          title: articleData.title,
          description: articleData.description,
          body: articleData.body,
          tags: articleData.tags,
          ingredients: articleData.ingredients,
          instructions: articleData.instructions,
          image: articleData.image,
          createdBy: this.authService.currentUserValue,
          createdDate: Date.now(),
        },
        "collection":  articleData.collection
      };

      this.articleservice.createArticle(body).pipe(first()).subscribe(
        resp => {
          this.router.navigate(['']);
          this.notifService.showNotif(resp['result'], 'response');
        }, error => {
          this.notifService.showNotif(error); });
    }

    /*
    if (parecordData.activityType == null || parecordData.date == null || parecordData.minutes == null || parecordData.calories == null) {
      this.notifService.showNotif('All field must be filled', 'error')
    }

    if (this.parecord) {

      this.parecordservice.edit(this.parecord['id'], parecordData).pipe(first()).subscribe(
        resp => {
          this.router.navigate(['']);
          this.notifService.showNotif('update:' + resp['res'], 'response');
        }, error => {
          this.notifService.showNotif(error); });
    }
    else {
      this.parecordservice.add(parecordData).pipe(first()).subscribe(
        resp => {
          this.router.navigate(['']);
          this.notifService.showNotif(resp['result'], 'response');
        }, error => {
          this.notifService.showNotif(error); });
    }

     */


  }


}
