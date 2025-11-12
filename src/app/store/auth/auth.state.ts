import { User } from "../../models/user.model";

export interface AuthState {
    isLoading: boolean;
    user: User | null;
    error: string | null;
}