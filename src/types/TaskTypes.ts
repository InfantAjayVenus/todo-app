export type Task = {
    projectId: string;
    id: string;
    title: string;
    description?: string;
    isComplete: boolean;
    isFavourite: boolean;
    dueDate?: Date;
};
