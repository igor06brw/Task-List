import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable()
export class TasksService {

  tasksList: Array<Task> = [];
  tasksDone: Array<Task> = [];

  tasksListObs = new BehaviorSubject<Array<Task>>([]);
  tasksDoneObs = new BehaviorSubject<Array<Task>>([]);

  constructor () {
    this.tasksList = [
     {name: 'Sprzątanie kuwety', created: new Date()},
     {name: 'Odkurzanie', created: new Date()},
     {name: 'Nauka Angular', created: new Date()},
     {name: 'Zakupy', created: new Date()}
      ];
    this.tasksListObs.next(this.tasksList);
  }

  add(task: Task) {
    this.tasksList.push(task);
    this.tasksListObs.next(this.tasksList);
  }

  remove(task: Task) {
    this.tasksList = this.tasksList.filter( e => e !==  task);
    this.tasksListObs.next(this.tasksList);

  }

  done(task: Task) {
    this.tasksDone.push(task);
    this.remove(task);
    this.tasksDoneObs.next(this.tasksDone);
  }

  getTasksListObs(): Observable<Array<Task>> {
    return this.tasksListObs.asObservable();
  }

  getTasksDoneObs(): Observable<Array<Task>> {
    return this.tasksDoneObs.asObservable();
  }
}
