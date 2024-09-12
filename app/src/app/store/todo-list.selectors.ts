import { Selector } from '@ngxs/store';
import { TodoListState, TodoListStateModel } from './todo-list.state';
import { Task } from '../models/task';

export class TodoListSelectors {
  @Selector([TodoListState])
  static getTasks(state: TodoListStateModel): Task[] {
    return state.tasks;
  }
}
