import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/tasks`;

  // Specifies our content type pf json for creating/updating tasks
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  /**
   * Grabs list of tasks
   * @returns Observable<Task[]> - Observable array of Task objects
   */
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  /**
   * POSTs a new task
   * @param task The task we want to create
   * @returns Observable<Task[]> - Observable new Task object
   */
  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, this.httpOptions);
  }

  /**
   * PATCH request to update an existing task
   * @param task - The task to update, including its id.
   * @returns Observable<Task> - Observable updated Task object
   */
  updateTask(task: Task): Observable<Task> {
    return this.http.patch<Task>(
      `${this.apiUrl}/${task.id}`,
      task,
      this.httpOptions
    );
  }

  /**
   * Sends a DELETE request to soft delete task by id
   * @param id - the id of task we want to delete
   * @returns - just an observable saying the task was complete
   */
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
