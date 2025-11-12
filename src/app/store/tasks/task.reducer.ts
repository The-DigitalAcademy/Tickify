import { createReducer, on } from '@ngrx/store';
import * as TaskActions from './task.actions';
import { Task } from '../../models/task.model';

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: any;
}

export const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null
};

export const taskReducer = createReducer(
  initialState,

  on(TaskActions.loadTasks, state => ({ ...state, loading: true, error: null })),
  on(TaskActions.loadTasksSuccess, (state, { tasks }) => ({ ...state, loading: false, tasks })),
  on(TaskActions.loadTasksFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(TaskActions.addTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task]
  })),
  on(TaskActions.addTaskFailure, (state, { error }) => ({ ...state, error })),

  on(TaskActions.updateTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map(t => (t.id === task.id ? task : t))
  })),
  on(TaskActions.updateTaskFailure, (state, { error }) => ({ ...state, error })),

  on(TaskActions.deleteTaskSuccess, (state, { id }) => ({
    ...state,
    tasks: state.tasks.filter(t => t.id !== id)
  })),
  on(TaskActions.deleteTaskFailure, (state, { error }) => ({ ...state, error }))
);
