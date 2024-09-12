import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { FormControl } from '@angular/forms';
import { Store, UpdateState } from '@ngxs/store';
import { DeleteTask, UpdateTask } from '../../store/todo-list.actions';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent implements OnInit {
  @Input() task!: Task;
  isEditMode = false;

  completedAt = new FormControl();

  constructor(private store: Store) {}

  ngOnInit(): void {
    if (this.task.completedAt)
      this.completedAt.patchValue(this.task.completedAt);
  }

  editTask() {
    this.isEditMode = !this.isEditMode;
  }

  deleteTask(taskId: number) {
    this.store.dispatch(new DeleteTask(taskId)).subscribe();
  }

  toggleCompleteTask(task: Task) {
    task = { ...task, completedAt: this.completedAt.value ? new Date() : null };

    this.store.dispatch(new UpdateTask(task)).subscribe();
  }
}
