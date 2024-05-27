import { v4 as uuid } from 'uuid';
import { Task } from "../types/TaskTypes";

export enum TaskReducerActions {
    ADD_TASK = "ADD_TASK",
    UPDATE_TASK = "UPDATE_TASK",
    TOGGLE_DONE = "TOGGLE_DONE",
    TOGGLE_FAVORITE = "TOGGLE_FAVORITE"
}

type AddTaskAction = {
    type: TaskReducerActions.ADD_TASK,
    payload: {
        taskData: Partial<Task>,
        activeProjectId: string,
    },
};

type ToggleDoneAction = {
    type: TaskReducerActions.TOGGLE_DONE,
    payload: {
        updateTaskId: string,
    }
};

type ToggleFavoriteAction = {
    type: TaskReducerActions.TOGGLE_FAVORITE,
    payload: {
        updateTaskId: string,
    }
};

type UpdateTaskAction = {
    type: TaskReducerActions.UPDATE_TASK,
    payload: {
        updatedTasksList: Task[],
    }
}

export function taskReducer(state: Task[], action: AddTaskAction | ToggleDoneAction | ToggleFavoriteAction | UpdateTaskAction) {
    switch (action.type) {
        case TaskReducerActions.ADD_TASK: {
            const { taskData, activeProjectId } = action.payload;
            const {
                id = uuid(),
                title = '',
                description = '',
                isComplete = false,
                isFavourite = false,
                dueDate = undefined
            } = taskData;

            return ([
                ...state,
                {
                    id,
                    title,
                    description,
                    isComplete,
                    isFavourite,
                    dueDate,
                    projectId: activeProjectId,
                } as Task
            ])
        }
        case TaskReducerActions.TOGGLE_DONE: {
            const {updateTaskId} = action.payload;
            const updateIndex = state.findIndex(({ id }) => id === updateTaskId);
            if (updateIndex < 0) throw (`Task ${updateTaskId} Not Found`)
            const updatedObject = { ...state[updateIndex] };
            updatedObject.isComplete = !updatedObject.isComplete;
            state[updateIndex] = updatedObject;
            console.log('DEBUG:TOGGLE_DONE:', action, updatedObject);

            return [...state];
        }
        case TaskReducerActions.TOGGLE_FAVORITE: {
            const {updateTaskId} = action.payload;
            const updateIndex = state.findIndex(({ id }) => id === updateTaskId);
            if (updateIndex < 0) throw (`Task ${updateTaskId} Not Found`)
            const updatedObject = { ...state[updateIndex] };
            updatedObject.isFavourite = !updatedObject.isFavourite;
            state[updateIndex] = updatedObject;
            return [...state];
        }
        case TaskReducerActions.UPDATE_TASK: {
            const {updatedTasksList} = action.payload;
            return [...updatedTasksList];
        }
        default:
            return state;
    }
}