import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TaskService } from '../../services/task.service';
import * as TaskActions from './task.actions';
import { catchError, exhaustMap, map, mergeMap, of, switchMap } from 'rxjs';

@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions, private taskService: TaskService) {}

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      exhaustMap(() =>
        this.taskService.getTasks().pipe(
          map(tasks => TaskActions.loadTasksSuccess({ tasks })),
          catchError(() => of({ type: '[Task API] Load Failed' }))
        )
      )
    )
  );

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.addTask),
      switchMap(({ task }) =>
        this.taskService.addTask(task).pipe(
          map(task => TaskActions.addTaskSuccess({ task })),
          catchError((error) => of(TaskActions.addTaskFailure({ error })))
        )
      )
    )
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.updateTask),
      switchMap(({ task }) =>
        this.taskService.updateTask(task.id, task).pipe(
          map(updated => TaskActions.updateTaskSuccess({ task: updated })),
          catchError((error) => of(TaskActions.updateTaskFailure({ error })))
        )
      )
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.deleteTask),
      switchMap(({ id }) =>
        this.taskService.deleteTask(id).pipe(
          map(() => TaskActions.deleteTaskSuccess({ id })),
          catchError((error) => of(TaskActions.deleteTaskFailure({ error })))
        )
      )
    )
  );
}
