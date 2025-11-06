import { Component } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  faEdit = faEdit;
  faTrash = faTrash;

  tasks: Task[] = [];
  newTaskTitle: string = '';
  editingTaskId: number | null = null;
  editTitle: string = '';

  addTask() {
    if (this.newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now(),
        title: this.newTaskTitle.trim(),
        completed: false
      };
      this.tasks.push(newTask);
      this.newTaskTitle = '';
    }
  }


  startEdit(task: Task) {
    this.editingTaskId = task.id;
    this.editTitle = task.title;
  }

  saveEdit(task: Task) {
    if (this.editTitle.trim()) {
      task.title = this.editTitle.trim();
      this.editingTaskId = null;
      this.editTitle = '';
    }
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }

  toggleComplete(task: Task) {
    task.completed = !task.completed;
  }
}
