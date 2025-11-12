import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TaskActions from './task.actions';
import { TaskService } from '../../services/task.service';
import { catchError, map, mergeMap, of, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { userSelector } from '../auth/auth.selectors';

@Injectable()
export class TaskEffects {
  constructor(
    private actions$: Actions,
    private taskService: TaskService,
    private store: Store
  ) {}

  // Show tasks for the logged-in user
  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      withLatestFrom(this.store.select(userSelector)),
      mergeMap(([_, user]) => {
        if (!user) {
          return of(TaskActions.loadTasksSuccess({ tasks: [] }));
        }

        return this.taskService.getTasks(user.id).pipe(
          map((tasks) => TaskActions.loadTasksSuccess({ tasks })),
          catchError((error) =>
            of(TaskActions.loadTasksFailure({ error: error.message }))
          )
        );
      })
    )
  );

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.addTask),
      withLatestFrom(this.store.select(userSelector)),
      mergeMap(([{ task }, user]) => {
        if (!user)
          return of(TaskActions.addTaskFailure({ error: 'No user logged in' }));

        const taskWithUser = { ...task, userId: user.id };
        return this.taskService.addTask(taskWithUser).pipe(
          map((task) => TaskActions.addTaskSuccess({ task })),
          catchError((error) =>
            of(TaskActions.addTaskFailure({ error: error.message }))
          )
        );
      })
    )
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.updateTask),
      mergeMap(({ task }) =>
        this.taskService.updateTask(task.id, task).pipe(
          map((updated) =>
            TaskActions.updateTaskSuccess({ task: updated })
          ),
          catchError((error) =>
            of(TaskActions.updateTaskFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.deleteTask),
      mergeMap(({ id }) =>
        this.taskService.deleteTask(id).pipe(
          map(() => TaskActions.deleteTaskSuccess({ id })),
          catchError((error) =>
            of(TaskActions.deleteTaskFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
