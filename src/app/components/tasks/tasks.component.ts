// src/app/components/tasks/tasks.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Task } from '../../models/task.model';
import * as TaskActions from 'src/app/store/tasks/task.actions';
import { selectAllTasks } from 'src/app/store/tasks/task.selectors';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;

  tasks$: Observable<Task[]> = this.store.select(selectAllTasks);

  newTasktask = '';
  editingTaskId: number | null = null;
  edittask = '';

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(TaskActions.loadTasks());
  }

  addTask() {
    if (this.newTasktask.trim()) {
      const newTask: Partial<Task> = {
        task: this.newTasktask.trim(),
        completed: false
      };
      this.store.dispatch(TaskActions.addTask({ task: newTask }));
      this.newTasktask = '';
    }
  }

  updateTask(task: Task) {
    this.editingTaskId = task.id;
    this.edittask = task.task;
  }

  saveEdit(task: Task) {
    if (this.edittask.trim()) {
      const updatedTask: Task = { ...task, task: this.edittask.trim() };
      this.store.dispatch(TaskActions.updateTask({ task: updatedTask }));
      this.editingTaskId = null;
      this.edittask = '';
    }
  }

  deleteTask(id: number) {
    this.store.dispatch(TaskActions.deleteTask({ id }));
  }

  toggleComplete(task: Task) {
    const updatedTask: Task = { ...task, completed: !task.completed };
    this.store.dispatch(TaskActions.updateTask({ task: updatedTask }));
  }
}
