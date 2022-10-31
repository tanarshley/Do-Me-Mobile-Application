/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-const */
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateDoModalPage } from '../create-do-modal/create-do-modal.page';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { ToastController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { EditDoModalPage } from '../edit-do-modal/edit-do-modal.page';
import { ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  selectTabs = 'all-dos';
  todos: any;
  lowTodos: any;
  highTodos: any;
  mediumTodos: any;
  userId: string;
  fullname: string;
  email: string;
  birthdate: string;
  password: string;
  userObject: any;

  public dateTime;

  constructor(
    public modalController: ModalController,
    private dataService: DataService,
    private router: Router,
    private userService: UserService,
    public toastController: ToastController,
    public actionSheetController: ActionSheetController,
    public popoverController: PopoverController
  ) {}

  ionViewDidEnter(){
    this.userObject = this.userService.getUser();
    this.userId = this.userObject.userId;
    this.fullname = this.userObject.userFullname;
    this.email = this.userObject.userEmail;
    this.birthdate = this.userObject.userBirthdate;
    this.password = this.userObject.userPassword;
    console.log('Logged in user: ', this.userObject);
    console.log('todos in home page: ', this.todos);

    let userObject = this.userService.getUser();
    let user_id = userObject.userId;

    this.dataService.request('getTodos', {user_id}).subscribe((response: any)=> {
      if(response.data){
        this.todos = response.data;
        if(this.todos?.length === 0){
          this.emptyTodosToast();
        }
        else{
          console.log('Todos: ', this.todos);
        }
      }
    });

    //low priority todos
    this.dataService.request('getLowPriority', {user_id: this.userId}).subscribe((response: any)=> {
      if(response.data){
        this.lowTodos = response.data;
        if(this.lowTodos?.length === 0){
          this.emptyTodosToast();
        }
        else{
          console.log('Low Priority Todos: ', this.lowTodos);
        }
      }
    });

    //medium priority todos
    this.dataService.request('getMediumPriority', {user_id: this.userId}).subscribe((response: any)=> {
      if(response.data){
        this.mediumTodos = response.data;
        if(this.mediumTodos?.length === 0){
          this.emptyTodosToast();
          console.log('No medium priority todos');
        }
        else{
          console.log('Medium Priority Todos: ', this.mediumTodos);
        }
      }
    });

    //high priority todos
    this.dataService.request('getHighPriority', {user_id: this.userId}).subscribe((response: any)=> {
      if(response.data){
        this.highTodos = response.data;
        if(this.highTodos?.length === 0){
          this.emptyTodosToast();
        }
        else{
          console.log('High Priority Todos: ', this.highTodos);
        }
      }
    });
  }

  async deleteActionSheet(todo_id, index) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Delete Todo',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.deleteDo(todo_id, index);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  deleteDo(todo_id, index){
    this.userObject = this.userService.getUser();
    this.userId = this.userObject.userId;

    let userObject = this.userService.getUser();
    let user_id = userObject.userId;
    let priority = this.todos[index].priority;

    this.dataService.request('deleteTodo', {todo_id: todo_id, user_id: user_id}).subscribe((response: any)=> {
      if(response.data){
        this.todos.splice(index, 1);
        this.presentDeleteToast();
        if(priority === 'Low'){
          this.lowTodos.splice(index, 1);
        }
        if(priority === 'Medium'){
          this.mediumTodos.splice(index, 1);
        }
        if(priority === 'High'){
          this.highTodos.splice(index, 1);
        }
      }
      else{
        this.presentFailedDeleteToast();
      }
    });
  }

  async presentFailedDeleteToast(){
    const toast = await this.toastController.create({
      message: 'Failed to delete todo. Please try again',
      duration: 2000,
    });
    toast.present();
  }

  async presentDeleteToast(){
    const toast = await this.toastController.create({
      message: 'Todo deleted successfully',
      duration: 2000
    });
    toast.present();
  }

  //refresh do list
  doRefresh(event){
    setTimeout(() => {
      this.ionViewDidEnter();
      event.target.complete();
    }, 2000);
  }

  ionViewWillEnter(){
    this.ionViewDidEnter();
  }


  async presentCreateDoModal(){
    const modal = await this.modalController.create({
      component: CreateDoModalPage,
    });
    return await modal.present();
  }

  async emptyTodosToast(){
    const toast = await this.toastController.create({
      message: 'No tasks found. Create a new do.',
      duration: 2000
    });
    toast.present();
  }

  async saveChangesToast(){
    const toast = await this.toastController.create({
      message: 'Changes saved.',
      duration: 2000
    });
    toast.present();
  }

  async noChangesToast(){
    const toast = await this.toastController.create({
      message: 'No changes made.',
      duration: 2000
    });
    toast.present();
  }

  async editDo(todoObject, index) {
    const modal = await this.modalController.create({
      component: EditDoModalPage,
      componentProps: {
        todoObject,
      },
      cssClass: 'my-custom-class',
    });

    modal.onDidDismiss().then((data) => {
      const updateObject = data['data'];
      if (updateObject) {
        this.saveChanges(updateObject, index);
      } else {
        this.noChangesToast();
      }
    });
    return await modal.present();
  }

  saveChanges(updateObject, index) {
    this.dataService.request('updateTodo', updateObject).subscribe((response: any) => {
      if (response.data) {
        this.todos[index] = updateObject;
        this.saveChangesToast();
      }
      else{
        this.noChangesToast();
      }
    });
  }

  async doneDoToast(){
    const toast = await this.toastController.create({
      message: 'Good job! You completed a task.',
      duration: 2000
    });
    toast.present();
  }

  async failedDoToast(){
    const toast = await this.toastController.create({
      message: 'Failed to mark task as done. Please try again.',
      duration: 2000
    });
    toast.present();
  }

  completeDo(todo_id, index){
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let today = year + '-' + month + '-' + day;
    let todo_title = this.todos[index].todo_title;
    let todo_description = this.todos[index].todo_description;
    let todo_priority = this.todos[index].priority;
    let todo_date = this.todos[index].todo_date;
    let todo_time = this.todos[index].todo_time;
    let todo_dateCompleted = today;

    console.log(todo_title, todo_description, todo_priority, todo_date, todo_time, todo_dateCompleted);

    this.userObject = this.userService.getUser();
    this.userId = this.userObject.userId;

    this.dataService.request('completeTodo', {todo_id: todo_id, user_id: this.userId, todo_title: todo_title,
      todo_description: todo_description, priority: todo_priority, todo_date: todo_date, todo_time: todo_time, todo_dateCompleted
    }).subscribe((response: any)=> {
      if(response.data){
        this.todos.splice(index, 1);
        this.doneDoToast();

        if(todo_priority === 'Low'){
          this.lowTodos.splice(index, 1);
        }
        if(todo_priority === 'Medium'){
          this.mediumTodos.splice(index, 1);
        }
        if(todo_priority === 'High'){
          this.highTodos.splice(index, 1);
        }
      }
      else{
        this.failedDoToast();
      }
    });
  }
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit() {
    setTimeout(() => {
      this.dateTime = new Date().toISOString();
    });
  }
}
