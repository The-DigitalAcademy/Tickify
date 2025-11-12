import { createAction, props } from '@ngrx/store';
import { Task } from '../../models/task.model';

export const loadTasks = createAction('[Tasks] Load Tasks');

export const loadTasksSuccess = createAction(
  '[Tasks] Load Tasks Success',
  props<{ tasks: Task[] }>()
);

export const loadTasksFailure = createAction(
  '[Tasks] Load Tasks Failure',
  props<{ error: any }>()
);

// --- CRUD Actions ---
export const addTask = createAction(
  '[Tasks] Add Task',
  props<{ task: Task }>()
);

export const deleteTask = createAction(
  '[Tasks] Delete Task',
  props<{ id: number }>()
);

export const toggleTask = createAction(
  '[Tasks] Toggle Task',
  props<{ id: number }>()
);

export const updateTask = createAction(
  '[Tasks] Edit Task',
  props<{ id: number; title: string }>()
);