import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Comment } from "../comment";
import { AngularFirestore } from '@angular/fire/firestore';
import { compileComponentFromRender2 } from '@angular/compiler/src/render3/view/compiler';

@Component({
  selector: 'app-commenting',
  templateUrl: './commenting.component.html',
  styleUrls: ['./commenting.component.css']
})
export class CommentingComponent implements OnInit {
  public commentsForm: FormGroup;  // Define FormGroup to student's form

  url : string;
  error: any;
  comments : Comment[];

  constructor(
    public fb: FormBuilder,      // Form Builder service for Reactive forms
    private route: ActivatedRoute,
    private firestore: AngularFirestore
    ) { }

  ngOnInit(): void {
    this.commentForm();
    //Get url
    this.route.queryParams.subscribe(params => {
      this.url = params['url'];
      console.log('url ' + this.url)
    });
    this.getComments();
  }

  commentForm() {
    this.commentsForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      comment: ['', [Validators.required,Validators.minLength(10)]]
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
    let comment_id = Math.random().toString(36).substr(2, 9);
    let commented = { // Add timestamp
      articleUrl: this.url,
      commentId : comment_id,
      authorName: this.commentsForm.value.name,
      authorEmail: this.commentsForm.value.email,
      content: this.commentsForm.value.comment
    }
    console.log(commented);
    this.firestore.collection('comments').add(commented);
    this.ResetForm();  // Reset form when clicked on reset button
    this.getComments(); // To display the new comment
  }

  ResetForm() {
    this.commentsForm.reset();
  } 

  // Method to get all the comments from the database that correspond to the url
  getComments(){
    const query = this.firestore.collection('comments', ref => ref.where('articleUrl', '==', this.url));
    console.log(this.url);
    const exists = query.get()
    .subscribe(
      result => {
        console.log(result.docs);
        result.docs.map(doc => {
          console.log(doc.data());
          
          //console.log(this.firestore.collection('comments').doc(doc.id).get().subscribe(doc => console.log(doc.data())))
        }) //this.comments = result.docs;
      },
      error => (this.error = error) //Might need better error-handling
    )
    const snapshotResult = this.firestore.collection('comments', ref =>
        ref.where('articleUrl', '==', this.url))
        .snapshotChanges(); 
    snapshotResult.subscribe(doc => {
        console.log(doc)
        console.log(doc.map(data => {
          data.payload.doc.data();
        }));
        //this.comments = <Comment>doc.payload.doc.data();
    });

    var docRef = this.firestore.collection('comments', ref => ref.where('articleUrl', '==', this.url)).doc("comments");
    console.warn(docRef);
    docRef.get().subscribe(result =>{
      console.log(result);
    });
    /*docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });*/
  }

}
