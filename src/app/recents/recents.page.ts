/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { UserService } from '../service/user.service';
import { ModalController } from '@ionic/angular';
import { ViewRecentPage } from '../view-recent/view-recent.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recents',
  templateUrl: './recents.page.html',
  styleUrls: ['./recents.page.scss'],
})
export class RecentsPage implements OnInit {

  userObject: any;
  userId: string;
  recents: any;

  constructor(
    private dataService: DataService,
    private userService: UserService,
    public modalController: ModalController,
    private router: Router,
  ) { }

  ionViewDidEnter(){
    this.userObject = this.userService.getUser();
    this.userId = this.userObject.userId;

    let userObject = this.userService.getUser();
    let user_id = userObject.userId;

    this.dataService.request('getArchives', {user_id}).subscribe((response: any)=> {
      if(response.data){
        this.recents = response.data;
        if(this.recents?.length === 0){
          console.log('No recent todos');
        }
        else{
          console.log('Todos: ', this.recents);
        }
      }
    });
  }

  async viewRecent(recentObject, index){
    this.recents[index] = recentObject;
    console.log('Recent: ', recentObject);
    const modal = await this.modalController.create({
      component: ViewRecentPage,
      componentProps: {
        recentObject,
      }
    });
    return await modal.present();
  }

  ngOnInit() {
  }

}
