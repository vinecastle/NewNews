import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-commenting',
  templateUrl: './commenting.component.html',
  styleUrls: ['./commenting.component.css']
})
export class CommentingComponent implements OnInit {
  public commentsForm: FormGroup;  // Define FormGroup to student's form

  url : string;

  constructor(
    public fb: FormBuilder,      // Form Builder service for Reactive forms
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.commentsForm;
  }

  studenForm() {
    this.commentsForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      comment: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]]
    })  
  }

   // Accessing form control using getters
   get name() {
    return this.commentsForm.get('name');
  }

  get email() {
    return this.commentsForm.get('email');
  }  

  get comment() {
    return this.commentsForm.get('comment');
  }

  // Submit method that sends the data to the firestore database
  // Fetch the url
  // Creates a comment Id
  onSubmitComment(){
    //Get url
    this.route.queryParams.subscribe(params => {
      this.url = params['url'];
      console.log('url ' + this.url)
    });
    let comment_id = Math.random().toString(36).substr(2, 9);
    console.log(this.commentsForm.value);
    this.ResetForm();  // Reset form when clicked on reset button

  }

  ResetForm() {
    this.commentsForm.reset();
  } 

  // Method to get all the comments from the database that correspond to the url
  getComments(){

  }

}
