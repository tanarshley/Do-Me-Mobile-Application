import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { DataService } from '../service/data.service';
import { UserService } from '../service/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
  fullname: string;

  public errorMessages = {
    email : [
      { type: 'pattern', message: 'Please enter your email.' }
    ],
    password : [
      { type: 'minlength', message: 'Please enter your password.' },
    ],
  };

  constructor(
    private router: Router,
    public alertController: AlertController,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    public toastController: ToastController,
    private userService: UserService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  async successToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  async errorToast(){
    const toast = await this.toastController.create({
      message: 'Incorrect email or password. Please try again.',
      duration: 2000
    });
    toast.present();
  }

  ionViewDidEnter(){
    if(this.userService.isLoggedIn()){
      this.router.navigate(['/home']);
    }
  }

  showLoginPassword(){
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

  onSubmitForm($event){
    this.dataService.request('login', this.loginForm.value).subscribe((response: any) => {
      if(response.data){
        this.loginForm.reset();
        this.router.navigate(['/home']);
        this.userService.setUser(response.data);
        this.userService.setLoggedIn();
        this.successToast('Welcome back ' + response.data.fullname + '!');
        console.log(response.data);
      }
      else if(response.error){
        this.errorToast();
      }
    });
  }

}
