import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';
import { Observable, tap } from 'rxjs';
import {
  LoadTasks,
  AddTask,
  UpdateTask,
  DeleteTask,
} from './todo-list.actions';

export interface TodoListStateModel {
  tasks: Task[];
}

@State<TodoListStateModel>({
  name: 'state',
  defaults: {
    tasks: [],
  },
})
@Injectable()
export class TaskState {
  constructor(private taskService: TaskService) {}

  @Selector()
  static getTasks(state: TodoListStateModel): Task[] {
    return state.tasks;
  }

  @Action(LoadTasks)
  loadTasks(ctx: StateContext<TodoListStateModel>): Observable<Task[]> {
    return this.taskService
      .getTasks()
      .pipe(tap((tasks) => ctx.patchState({ tasks })));
  }

  @Action(AddTask)
  addTask(
    ctx: StateContext<TodoListStateModel>,
    action: AddTask
  ): Observable<Task> {
    return this.taskService.createTask(action.payload).pipe(
      tap((task) => {
        const state = ctx.getState();
        ctx.patchState({ tasks: [...state.tasks, task] });
      })
    );
  }

  @Action(UpdateTask)
  updateTask(
    ctx: StateContext<TodoListStateModel>,
    action: UpdateTask
  ): Observable<Task> {
    return this.taskService.updateTask(action.payload).pipe(
      tap((updatedTask) => {
        const state = ctx.getState();
        const tasks = state.tasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        );
        ctx.patchState({ tasks });
      })
    );
  }

  @Action(DeleteTask)
  deleteTask(
    ctx: StateContext<TodoListStateModel>,
    action: DeleteTask
  ): Observable<void> {
    return this.taskService.deleteTask(action.payload).pipe(
      tap(() => {
        const state = ctx.getState();
        const tasks = state.tasks.filter((task) => task.id !== action.payload);
        ctx.patchState({ tasks });
      })
    );
  }
}
