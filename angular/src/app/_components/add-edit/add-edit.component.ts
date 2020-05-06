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

  articleForm;
  collection;

  ingredients = [];
  ingredientName = '';
  ingredientAmount = '';

  private article;


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

    if (this.router.url.split('/')[1] === 'edit') {
      console.log(this.router.url.split('/'))

      this.getArticleEdit(this.router.url.split('/')[2], this.router.url.split('/')[3]);

    }


  }

  ngOnInit() {



  }

  addIngredient() {
    if (!this.ingredientName || !this.ingredientAmount)
      return;

    this.ingredients.push([this.ingredientAmount, this.ingredientName]);

    this.ingredientName = '';
    this.ingredientAmount = '';

    console.log(this.ingredients);
  }

  async getArticleEdit(collectionName, id) {
    this.articleservice.findArticle(collectionName, id).subscribe(
      article => {

        this.article = article;
        Object.keys(this.article.ingredients).forEach(key => this.ingredients.push([key, this.article.ingredients[key]]));

        console.log(this.article.ingredients, this.ingredients);

        this.collection = this.router.url.split('/')[2];

        this.articleForm = this.formBuilder.group({
          collection: `${this.router.url.split('/')[2]}`,
          title: new FormControl(`${this.article.title}`, Validators.required),
          description: new FormControl(`${this.article.description}`, Validators.required),
          body: `${this.article.body}`,
          tags: new FormControl(`${this.article.tags}`, Validators.required),
          ingredients: '',
          instructions: `${this.article.instructions}`,
          image: `${this.article.image}`
        });


        this.articleForm.controls['collection'].disable();
      },
      error => {
        this.notifService.showNotif(error.toString(), 'warning'); });
  }

  checkImage(imageSrc, bad, good) {
    let img = new Image();
    img.onerror = bad;
    img.onload = good;
    img.src = imageSrc;
  }

  sub(articleData, ingerd) {
    if (this.article) {//edit
      let body = {
        title: articleData.title,
        description: articleData.description,
        body: articleData.body,
        tags: articleData.tags,
        ingredients: ingerd,
        instructions: articleData.instructions,
        image: articleData.image,
        createdBy: this.article.createdBy,
        createdDate: this.article.createdDate,
      };

      console.log(this.router.url.split('/')[2], this.router.url.split('/')[3], body);


      this.articleservice.editArticle(this.router.url.split('/')[2], this.router.url.split('/')[3], body).pipe(first()).subscribe(
        resp => {
          this.router.navigate(['']);
          this.notifService.showNotif(resp['res'], 'response');
        }, error => {
          this.notifService.showNotif(error); });
    }
    else {

      console.log(articleData.image);

      let body = {
        article: {
          title: articleData.title,
          description: articleData.description,
          body: articleData.body,
          tags: articleData.tags,
          ingredients: ingerd,
          instructions: articleData.instructions,
          image: articleData.image,
          createdBy: this.authService.currentUserValue,
          createdDate: Date.now(),
        },
        "collection":  articleData.collection
      };

      console.log(body);

      this.articleservice.createArticle(body).pipe(first()).subscribe(
        resp => {
          this.router.navigate(['']);
          this.notifService.showNotif(resp['result'], 'response');
        }, error => {
          this.notifService.showNotif(error); });
    }
  }

  async onSubmit(articleData) {

    console.log(articleData);

    let ingerd = {};
    this.ingredients.forEach(e => ingerd[e[0]] = e[1]);
    console.log(ingerd);
    //check if image exists
    let a = await this.checkImage(articleData.image, () => {
      articleData.image = 'assets/images/logo.png';
      this.sub(articleData, ingerd);
      }, () => {
      this.sub(articleData, ingerd);
    } );

  }




}
