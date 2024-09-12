import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NewTaskComponent } from '../../components/new-task/new-task.component';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { TaskComponent } from '../../components/task/task.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';

const MAT_ANGULAR_MODULES = [
  MatToolbarModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
];

@NgModule({
  declarations: [
    HomeComponent,
    TaskComponent,
    TaskFormComponent,
    NewTaskComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ...MAT_ANGULAR_MODULES,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class HomeModule {}
