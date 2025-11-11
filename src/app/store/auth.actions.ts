import { createAction, props } from "@ngrx/store";
import { User } from "../models/user.model";

// Register Actions
export const registerAction = createAction(
    "[Auth] Regitster",
    props<{ user: Omit<User,"id"> }>()      
)

export const registerSuccess = createAction(
    "[Auth] Register Success",
    props<{ user: User;successMessage: string }>()
)
export const registerFailure = createAction(
    "[Auth] Register Failure",
    props<{ errorMessage: string }>()
);

