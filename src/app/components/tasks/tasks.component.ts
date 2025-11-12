import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.model';
import { addTask, deleteTask, toggleTask, updateTask } from 'src/app/store/tasks/tasks.action';
import { selectAllTasks } from 'src/app/store/tasks/tasks.selector';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  faEdit = faEdit;
  faTrash = faTrash;

  tasks$: Observable<Task[]>;
  newTaskTitle = '';
  editingTaskId: number | null = null;
  editTitle = '';

  constructor(private store: Store) {
    this.tasks$ = this.store.select(selectAllTasks);
  }

  addTask() {
  if (this.newTaskTitle.trim()) {
    const newTask: Task = {
      id: Date.now(),
      title: this.newTaskTitle,
      task: this.newTaskTitle,
      completed: false,
      priority: 'low',
      dueDate: '',
      userId: 0
    };
    this.store.dispatch(addTask({ task: newTask }));
    this.newTaskTitle = '';
  }
}

  deleteTask(id: number) {
    this.store.dispatch(deleteTask({ id }));
  }

  toggleComplete(task: Task) {
    this.store.dispatch(toggleTask({ id: task.id }));
  }

  updateTask(task: Task) {
    this.editingTaskId = task.id;
    this.editTitle = task.title;
  }

  saveUpdate(task: Task) {
    if (this.editTitle.trim()) {
      this.store.dispatch(updateTask({ id: task.id, title: this.editTitle.trim() }));
      this.editingTaskId = null;
      this.editTitle = '';
    }
  }
}
