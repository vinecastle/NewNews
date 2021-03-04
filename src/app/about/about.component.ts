import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  messageFC = new FormControl('', [Validators.required, Validators.maxLength(30)]); 
  name = new FormControl('', [Validators.required]);

  constructor() { }

  ngOnInit(): void {
  }

  //also figure out how custom validators work, no error message now if there's no name
  getEmptyMessageError() {
    if(this.messageFC.hasError('required')) {
      return "Please write a message."; 
    }
  }

  getNoNameError() {
    if(this.name.hasError('required')) {
      return "Please write your name."; 
    }
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter an email.';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  // handle other error messages, if input in email does not have the correct structure?

}
