import { Component, Input, model, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent implements OnInit {
  @Input() task!: Task;
  isEditMode = false;

  completedAt = new FormControl();

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    if (this.task.completedAt)
      this.completedAt.patchValue(this.task.completedAt);
  }

  editTask() {
    this.isEditMode = !this.isEditMode;
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe();
  }

  toggleCompleteTask(task: Task) {
    task = { ...task, completedAt: this.completedAt.value ? new Date() : null };

    this.taskService.updateTask(task).subscribe();
  }
}
