import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { StatusService } from '../service/status.service';
import { ContactRequest } from '../service/types';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  title = 'node-express-angular';
  status = 'DOWN';
  success = false;
  faSpinner = faSpinner;
  process = false;
  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    subject: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', Validators.required),
  });

  //matcher = new MyErrorStateMatcher();
  constructor(private statusService: StatusService) {}

  ngOnInit(): void {
    this.statusService.getStatus().then((result: any) => {
      this.status = result;
      console.log(result);
    });
  }

  send() {
    const values = this.contactForm.value;

    let req: ContactRequest = {
      name: values.name,
      email: values.email,
      subject: values.subject,
      message: values.message,
    };

    return this.statusService.sendEmail(req).subscribe(
      (data) => {
        this.success = true;
        this.process = false;
      },
      (err) => {
        console.log(err);
        this.success = false;
        this.process = false;}
    );
  }

  onSubmit() {
    this.process = true;
    this.send();
  }
}
