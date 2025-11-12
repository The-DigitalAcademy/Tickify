import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TaskService } from 'src/app/services/task.service';
import * as TaskActions from './tasks.action';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TasksEffects {
  constructor(
    private actions$: Actions,
    private taskService: TaskService
  ) {}

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      mergeMap(() =>
        this.taskService.getTasks().pipe(
          map((tasks) => TaskActions.loadTasksSuccess({ tasks })),
          catchError((error) =>
            of(TaskActions.loadTasksFailure({ error }))
          )
        )
      )
    )
  );

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.addTask),
      switchMap(({ task }) =>
        this.taskService.addTask(task).pipe(
          map((task) => TaskActions.addTask({ task: task })),
          catchError((error) =>
            of(TaskActions.loadTasksFailure({ error }))
          )
        )
      )
    ),
    {dispatch: false}
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.updateTask),
      switchMap(({ id, title }) =>
        this.taskService.getTaskById(id).pipe(
          switchMap((task) => {
            const updatedTask = { ...task, title };
            return this.taskService.updateTask(id, updatedTask).pipe(
              map(() => TaskActions.updateTask({ id, title })),
              catchError((error) =>
                of(TaskActions.loadTasksFailure({ error }))
              )
            );
          })
        )
      )
    ),
    {dispatch: false}
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.deleteTask),
      switchMap(({ id }) =>
        this.taskService.deleteTask(id).pipe(
          map(() => TaskActions.deleteTask({ id })),
          catchError((error) =>
            of(TaskActions.loadTasksFailure({ error }))
          )
        )
      )
    ),
    {dispatch: false}
  );    
}
