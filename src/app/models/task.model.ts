export interface Task {
    title: string;
    id: number;
    task: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
    dueDate: string;
    userId: number;
}