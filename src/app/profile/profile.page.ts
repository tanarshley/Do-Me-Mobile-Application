import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EditInformationPage } from '../edit-information/edit-information.page';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userId: string;
  fullname: string;
  email: string;
  birthdate: string;
  password: string;
  userObject: any;

  constructor(public modalController: ModalController, private userService: UserService, private router: Router) {}

  async presentEditInformationModal(){
    const modal = await this.modalController.create({
      component: EditInformationPage,
    });
    return await modal.present();
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

  doRefresh($event){
    setTimeout(() => {
      this.ionViewDidEnter();
      $event.target.complete();
    }, 2000);
  }

  logout(){
    this.userService.setLoggedOut();
    this.userService.clearLoggedData();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

}
