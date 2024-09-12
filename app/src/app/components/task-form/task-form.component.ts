import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { tap } from 'rxjs';
import { Store } from '@ngxs/store';
import { AddTask, UpdateTask } from '../../store/todo-list.actions';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent implements OnInit {
  @Input() task!: Task;
  @Output() cancel = new EventEmitter<Task>();
  taskForm!: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      id: [null],
      title: ['', [Validators.required]],
      completedAt: [null],
      deleteddAt: [null],
    });

    if (this.task) {
      this.taskForm.patchValue(this.task);
    }
  }

  saveTask() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    let upsertStoreAction;

    if (this.task?.id) {
      upsertStoreAction = this.store.dispatch(
        new UpdateTask(this.taskForm.value)
      );
    } else {
      upsertStoreAction = this.store.dispatch(new AddTask(this.taskForm.value));
    }

    upsertStoreAction.pipe(tap(() => this.cancel.emit())).subscribe();
  }

  get title() {
    return this.taskForm.get('title') as UntypedFormControl;
  }
}
