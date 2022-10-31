/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { DataService } from '../service/data.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-edit-do-modal',
  templateUrl: './edit-do-modal.page.html',
  styleUrls: ['./edit-do-modal.page.scss'],
})
export class EditDoModalPage implements OnInit {
  @Input() todoObject: any;

  todo_title: string;
  todo_description: string;
  todo_date: string;
  todo_time: string;
  priority: string;
  userId: string;
  userObject: any;

  constructor(
    public modalController: ModalController,
    public toastController: ToastController,
    private dataService: DataService,
    private userService: UserService
  ) { }

  ionViewDidEnter(){
    this.userObject = this.userService.getUser();
    this.userId = this.userObject.userId;
  }

  ngOnInit() {
    this.userId = this.todoObject.user_id;
    this.todo_title = this.todoObject.todo_title;
    this.todo_description = this.todoObject.todo_description;
    this.todo_date = this.todoObject.todo_date;
    this.todo_time = this.todoObject.todo_time;
    this.priority = this.todoObject.priority;
  }

  async noChangesToast(){
    const toast = await this.toastController.create({
      message: 'No changes made.',
      duration: 2000
    });
    toast.present();
  }

  async changesSavedToast(){
    const toast = await this.toastController.create({
      message: 'Changes saved.',
      duration: 2000
    });
    toast.present();
  }

  dismissModal(){
    this.modalController.dismiss();
  }

  doRefresh(event){
    setTimeout(() => {
      this.ionViewDidEnter();
      event.target.complete();
    }, 2000);
  }


  saveChanges(){
    if(this.todo_title && this.todo_description && this.todo_date && this.todo_time && this.priority){
      this.todoObject.todo_title = this.todo_title;
      this.todoObject.todo_description = this.todo_description;
      this.todoObject.todo_date = this.todo_date;
      this.todoObject.todo_time = this.todo_time;
      this.todoObject.priority = this.priority;
      this.modalController.dismiss(this.todoObject);
      this.changesSavedToast();
    }
    else{
      this.noChangesToast();
    }
  }
}
