/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { DataService } from '../service/data.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-create-do-modal',
  templateUrl: './create-do-modal.page.html',
  styleUrls: ['./create-do-modal.page.scss'],
})
export class CreateDoModalPage implements OnInit {
  userObject: any;
  todo_title: string;
  todo_description: string;
  todo_date: string;
  todo_time: string;
  priority: string;

  constructor(public modalController: ModalController,
    private dataService: DataService,
    public toastController: ToastController,
    private userService: UserService) {

      this.userObject = this.userService.getUser();
    }


   dismissModal(){
      this.modalController.dismiss({
      dismissed: true
    });
  }

  async addedTaskToast(){
    const toast = await this.toastController.create({
      message: 'New task added. Refresh to see the changes.',
      duration: 2000
    });
    toast.present();
  }

  async errorToast(){
    const toast = await this.toastController.create({
      message: 'Task not added, please try again.',
      duration: 2000
    });
    toast.present();
  }

  async incompleteFormToast(){
    const toast = await this.toastController.create({
      message: 'Please fill in all the fields.',
      duration: 2000
    });
    toast.present();
  }

  createDo(){
    let user_id = this.userObject.userId;
    let todo_title = this.todo_title;
    let todo_description = this.todo_description;
    let todo_date = this.todo_date;
    let todo_time = this.todo_time;
    let priority = this.priority;

    console.log(user_id, todo_title, todo_description, todo_date, todo_time, priority);

    if(user_id !== '' && todo_title !== '' && todo_description !== '' && todo_date !== '' && todo_time !== '' && priority !== ''){
      this.dataService.request('addTodos', {
        user_id,
        todo_title,
        todo_description,
        todo_date,
        todo_time,
        priority
      }).subscribe((response: any) => {
        if(response.data){
          this.addedTaskToast();
          this.dismissModal();
        }
        else if(response.error){
          this.errorToast();
        }
        else{
          this.incompleteFormToast();
        }
      });
    }
  }

  ngOnInit() {
  }
}
