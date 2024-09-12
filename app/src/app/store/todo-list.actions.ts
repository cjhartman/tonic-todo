import { Task } from '../models/task';

export class LoadTasks {
  static readonly type = '[Task] Load Tasks';
}

export class AddTask {
  static readonly type = '[Task] Add Task';
  constructor(public payload: Task) {}
}

export class UpdateTask {
  static readonly type = '[Task] Update Task';
  constructor(public payload: Task) {}
}

export class DeleteTask {
  static readonly type = '[Task] Delete Task';
  constructor(public payload: number) {}
}
