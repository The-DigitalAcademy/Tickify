import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  newTaskTitle: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(
      (data: Task[]) => this.tasks = data,
      error => console.error('Error loading tasks:', error)
    );
  }

  addTask(): void {
    if (!this.newTaskTitle.trim()) return;

    const newTask: Partial<Task> = {
      title: this.newTaskTitle,
      description: '',
      completed: false,
      priority: 'low',
      dueDate: new Date().toISOString(),
      userId: 1 
    };

    this.taskService.addTask(newTask).subscribe(
      () => {
        this.newTaskTitle = '';
        this.loadTasks();
      },
      error => console.error('Error adding task:', error)
    );
  }

  toggleComplete(task: Task): void {
    const updatedTask: Task = { ...task, completed: !task.completed };
    this.taskService.updateTask(task.id, updatedTask).subscribe(
      () => this.loadTasks(),
      error => console.error('Error updating task:', error)
    );
  }

  editTask(task: Task): void {
    const updatedTitle = prompt('Edit task:', task.title);
    if (updatedTitle !== null && updatedTitle.trim() !== '') {
      const updatedTask: Task = { ...task, title: updatedTitle };
      this.taskService.updateTask(task.id, updatedTask).subscribe(
        () => this.loadTasks(),
        error => console.error('Error updating task:', error)
      );
    }
  }

  deleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe(
        () => this.loadTasks(),
        error => console.error('Error deleting task:', error)
      );
    }
  }
}
