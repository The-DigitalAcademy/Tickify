import { createReducer, on } from '@ngrx/store';
import * as TaskActions from './tasks.action';
import { Task } from '../../models/task.model';

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: any;
}

export const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

export const tasksReducer = createReducer(
  initialState,

  // --- Load Tasks ---
  on(TaskActions.loadTasks, (state) => ({ ...state, loading: true })),
  on(TaskActions.loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    loading: false,
    tasks,
  })),
  on(TaskActions.loadTasksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // --- CRUD ---
  on(TaskActions.addTask, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task],
  })),

  on(TaskActions.deleteTask, (state, { id }) => ({
    ...state,
    tasks: state.tasks.filter((t) => t.id !== id),
  })),

  on(TaskActions.toggleTask, (state, { id }) => ({
    ...state,
    tasks: state.tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ),
  })),

  on(TaskActions.updateTask, (state, { id, title }) => ({
    ...state,
    tasks: state.tasks.map((t) =>
      t.id === id ? { ...t, title } : t
    ),
  }))
);
