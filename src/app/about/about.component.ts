import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormGroupDirective} from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Contact } from "../contact";
import { AngularFirestore } from '@angular/fire/firestore';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public contactForm: FormGroup;  // Define FormGroup to student's form

  error: any;

  constructor(
    public fb: FormBuilder,      // Form Builder service for Reactive forms
    private firestore: AngularFirestore,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.contactsForm();
  }

  contactsForm(){
    this.contactForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      messageFC: new FormControl('', [Validators.required, Validators.minLength(30)]),
      name: new FormControl('', [Validators.required, Validators.pattern('^.{2}.*$')])
    }) 

  }

  //also figure out how custom validators work, no error message now if there's no name
  getEmptyMessageError() {
    if(this.contactForm.get("messageFC").hasError('required')) {
      return "Please write a message."; 
    }
  }

  getNoNameError() {
    if(this.contactForm.get("name").hasError('required')) {
      return "Please write your name."; 
    }
  }

  getEmailErrorMessage() {
    if (this.contactForm.get("email").hasError('required')) {
      return 'You must enter an email.';
    }
    return this.contactForm.get("email").hasError('email') ? 'Not a valid email' : '';
  }
  // handle other error messages, if input in email does not have the correct structure?

  ResetForm(formData: any, formDirective: FormGroupDirective) {
    formDirective.resetForm();
    this.contactForm.reset();
  } 

  onSubmitContact(formData: any, formDirective: FormGroupDirective){
    if(this.contactForm.valid){
      const current = new Date();
      let contact_id = Math.random().toString(36).substr(2, 9);
      let contact_info = { // Add timestamp
        contactId : contact_id,
        authorName: this.contactForm.value.name,
        authorEmail: this.contactForm.value.email,
        content: this.contactForm.value.messageFC,
        timestamp: current.getTime()
      }
      console.log(contact_info);
      this.firestore.collection('contact').add(contact_info);
      this.ResetForm(formData, formDirective);  // Reset form when clicked on reset button
      this._snackBar.open('Submitted message', '', {duration: 2000});
    }
  }
}
