/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable object-shorthand */
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from '../service/user.service';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-information',
  templateUrl: './edit-information.page.html',
  styleUrls: ['./edit-information.page.scss'],
})
export class EditInformationPage implements OnInit {
  public changepassword: FormGroup;

  selectTabs = 'profile';

  userId: string;
  fullname: string;
  email: string;
  birthdate: string;
  password: string;
  userObject: any;

  public errorMessages = {
    old_password : [
      { type: 'required', message: 'Incorrect old password.' },
    ],

    new_password : [
      { type: 'required', message: 'New password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ],

    confirm_password: [
      { type: 'MatchPassword', message: 'Password not match.' },
    ],
  };

  constructor(public modalController: ModalController, private userService: UserService, public toastController: ToastController,
    private dataService: DataService, public formBuilder: FormBuilder, private router: Router) {}

  dismissEditInformationModal(){
    this.modalController.dismiss({
      dismissed: true
    });
  }

  ionViewDidEnter(){
    this.userObject = this.userService.getUser();
    this.userId = this.userObject.userId;
    this.fullname = this.userObject.fullname;
    this.email = this.userObject.email;
    this.birthdate = this.userObject.birthdate;
    this.password = this.userObject.password;
    console.log('Logged in user: ', this.userObject);
  }

  async saveSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Your information has been updated.',
      duration: 2000
    });
    toast.present();
  }

  async saveFailedToast(){
    const toast = await this.toastController.create({
      message: 'Failed to update your information. Please try again.',
      duration: 2000
    });
    toast.present();
  }

  doRefresh($event){
    setTimeout(() => {
      this.ionViewDidEnter();
      $event.target.complete();
    }, 2000);
  }

  saveInfo(user_id, fullname, email, birthdate){
    this.userObject = this.userService.getUser();
    this.userId = this.userObject.userId;

    this.dataService.request('updateInfo', {user_id: this.userId, fullname: fullname, email: email, birthdate: birthdate}).
    subscribe((response: any)=>{
      if(response.data){
        this.saveSuccessToast();
      }
      else{
        this.saveFailedToast();
      }
    });
  }

  async changePasswordSuccessToast(){
    const toast = await this.toastController.create({
      message: 'Password changed successfully.',
      duration: 2000
    });
    toast.present();
  }

  async changePasswordFailedToast(){
    const toast = await this.toastController.create({
      message: 'Failed to change password. Please try again.',
      duration: 2000
    });
    toast.present();
  }

  changePassword(userId, password){
    password = this.changepassword.get('new_password').value;
    this.userObject = this.userService.getUser();
    this.userId = this.userObject.userId;

    if(this.changepassword.valid) {
      this.dataService.request('updatePassword', {user_id: this.userId, password: password}).
      subscribe((response: any)=> {
        if(response.data){
          this.changePasswordSuccessToast();
          this.dismissEditInformationModal();
          this.userService.setLoggedOut();
          this.userService.clearLoggedData();
          this.router.navigate(['/login']);
        }
        else{
          this.changePasswordFailedToast();
        }
      });
    }
  }

  showOldPassword(){
    const attribPassword = document.getElementById('old-password') as HTMLInputElement;
    const getOldEyeIcon = document.getElementById('old-icon-eye');

    if(attribPassword.getAttribute('type') === 'password'){
      attribPassword.setAttribute('type', 'text');
      getOldEyeIcon.setAttribute('name', 'eye');
    }else{
      attribPassword.setAttribute('type', 'password');
      getOldEyeIcon.setAttribute('name', 'eye-off');
    }
  }

  showNewPassword(){
    const attribPassword = document.getElementById('new-password') as HTMLInputElement;
    const getNewEyeIcon = document.getElementById('new-icon-eye');

    if(attribPassword.getAttribute('type') === 'password'){
      attribPassword.setAttribute('type', 'text');
      getNewEyeIcon.setAttribute('name', 'eye');
    }else{
      attribPassword.setAttribute('type', 'password');
      getNewEyeIcon.setAttribute('name', 'eye-off');
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


  ngOnInit(): void {
    this.changepassword = this.formBuilder.group({
      old_password: ['', [Validators.required]],
      new_password: ['', [Validators.minLength(5), Validators.required]],
      confirm_password: ['', [Validators.required]],
    }, {
      validator: this.MatchPassword('new_password', 'confirm_password')
    });
  }

    // eslint-disable-next-line @typescript-eslint/member-ordering
    submitted = false;
    get f()
    {
      return this.changepassword.controls;
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
}
