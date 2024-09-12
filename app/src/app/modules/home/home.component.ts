import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { LoadTasks } from '../../store/todo-list.actions';
import { TodoListSelectors } from '../../store/todo-list.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  tasks$: Observable<Task[]> = this.store.select(TodoListSelectors.getTasks);

  constructor(private store: Store) {}

  // We could do the dispatching from a resolver
  ngOnInit(): void {
    this.store.dispatch(new LoadTasks());
  }
}
