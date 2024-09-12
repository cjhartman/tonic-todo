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

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent implements OnInit {
  @Input() task!: Task;
  @Output() cancel = new EventEmitter<Task>();
  taskForm!: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) {}

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

    let apiCall;

    console.log(this.taskForm.value);

    if (this.task.id) {
      apiCall = this.taskService.updateTask(this.taskForm.value);
    } else {
      apiCall = this.taskService.createTask(this.taskForm.value);
    }

    apiCall.pipe(tap(() => this.cancel.emit())).subscribe();
  }

  get title() {
    return this.taskForm.get('title') as UntypedFormControl;
  }
}
