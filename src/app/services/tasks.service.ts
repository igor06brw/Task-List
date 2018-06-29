import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class TasksService {

  tasksList: Array<string> = [];
  tasksDone: Array<string> = [];

  tasksListObs = new BehaviorSubject<Array<string>>([]);
  tasksDoneObs = new BehaviorSubject<Array<string>>([]);

  constructor () {
    this.tasksList = ['Sprzątanie kuwety', 'Odkurzanie', 'Nauka Angular', 'Zakupy'];
    this.tasksListObs.next(this.tasksList);
  }

  add(task: string) {
    this.tasksList.push(task);
    this.tasksListObs.next(this.tasksList);
  }

  remove(task: string) {
    this.tasksList = this.tasksList.filter( e => e !==  task);
    this.tasksListObs.next(this.tasksList);

  }

  done(task: string) {
    this.tasksDone.push(task);
    this.remove(task);
    this.tasksDoneObs.next(this.tasksDone);
  }

  getTasksListObs(): Observable<Array<string>> {
    return this.tasksListObs.asObservable();
  }

  getTasksDoneObs(): Observable<Array<string>> {
    return this.tasksDoneObs.asObservable();
  }
}
