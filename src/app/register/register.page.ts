/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { DataService } from '../service/data.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public registerForm: FormGroup;

  public errorMessages = {
    fullname : [
      { type: 'minlength', message: 'Fullname must be at least 5 characters long.' },
    ],

    email : [
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],

    birthdate: [
      { type: 'required', message: 'Birthdate is required.' },
    ],

    password : [
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
    ],

    confirmPassword : [
      { type: 'MatchPassword', message: 'Password not match.' },
    ],
  };

  constructor(
    private router: Router,
    public alertController: AlertController,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    public toastController: ToastController) { }

    async successToast() {
      const toast = await this.toastController.create({
        message: 'Account registered successfully.',
        duration: 2000
      });
      toast.present();
    }

    async errorToast() {
      const toast = await this.toastController.create({
        message: 'Registration failed, please try again.',
        duration: 2000
      });
      toast.present();
    }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      fullname: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      birthdate: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required]],
    }, {
      validator: this.MatchPassword('password', 'confirmPassword')
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  submitted = false;
  get f()
  {
    return this.registerForm.controls;
  }
  MatchPassword(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
  const control = formGroup.controls[controlName];
  const matchingControl = formGroup.controls[matchingControlName];
  if (matchingControl.errors && !matchingControl.errors.MatchPassword) {
  return;
  }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ MatchPassword: true });
    }
    else {
      matchingControl.setErrors(null);
      }
    };
  }

  showPassword(){
    const attribPassword = document.getElementById('password') as HTMLInputElement;
    const getEyeIcon = document.getElementById('icon-eye');

    if(attribPassword.getAttribute('type') === 'password'){
      attribPassword.setAttribute('type', 'text');
      getEyeIcon.setAttribute('name', 'eye');
    }else{
      attribPassword.setAttribute('type', 'password');
      getEyeIcon.setAttribute('name', 'eye-off');
    }
  }

  showConfirmPassword(){
    const attribConfirmPassword = document.getElementById('confirm-password') as HTMLInputElement;
    const getConfirmEyeIcon = document.getElementById('confirm-icon-eye');

    if(attribConfirmPassword.getAttribute('type') === 'password'){
      attribConfirmPassword.setAttribute('type', 'text');
      getConfirmEyeIcon.setAttribute('name', 'eye');
    }else{
      attribConfirmPassword.setAttribute('type', 'password');
      getConfirmEyeIcon.setAttribute('name', 'eye-off');
    }
  }

  onSubmitForm($event) {
    if(this.registerForm.valid){
      this.dataService.request('register', this.registerForm.value).subscribe((response: any) => {
        if(response.data){
          this.successToast();
          this.registerForm.reset();
          this.router.navigate(['/login']);
        }
        else if (response.error){
          this.errorToast();
          this.registerForm.reset();
        }
      });
    }
  }
}


