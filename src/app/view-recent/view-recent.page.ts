/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-view-recent',
  templateUrl: './view-recent.page.html',
  styleUrls: ['./view-recent.page.scss'],
})
export class ViewRecentPage implements OnInit {
  todo_title: string;
  todo_description: string;
  todo_date: string;
  todo_time: string;
  priority: string;
  todo_dateCompleted: string;
  recentObject: any;

  constructor(
    private modalController: ModalController,
  ) { }

  closeRecent(){
    this.modalController.dismiss();
  }

  ionViewWillEnter(){
    this.todo_title = this.recentObject.todo_title;
    this.todo_description = this.recentObject.todo_description;
    this.todo_date = this.recentObject.todo_date;
    this.todo_time = this.recentObject.todo_time;
    this.priority = this.recentObject.priority;
    this.todo_dateCompleted = this.recentObject.todo_dateCompleted;
  }

  ngOnInit() {
  }

}
