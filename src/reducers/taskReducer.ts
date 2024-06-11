import { v4 as uuid } from 'uuid';
import { Task } from "../types/TaskTypes";

export enum TaskReducerActions {
    ADD_TASK = "ADD_TASK",
    UPDATE_TASK = "UPDATE_TASK",
    TOGGLE_DONE = "TOGGLE_DONE",
    TOGGLE_FAVORITE = "TOGGLE_FAVORITE",
    DELETE_TASK = "DELETE_TASK",
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
        updateTaskId: string,
        updatedTaskData: Partial<Task>,
    }
}

type DeleteTaskAction = {
    type: TaskReducerActions.DELETE_TASK,
    payload: {
        deleteTaskId: string,
    }
}

export function taskReducer(state: Task[], action: AddTaskAction | ToggleDoneAction | ToggleFavoriteAction | UpdateTaskAction | DeleteTaskAction) {
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
            const updateIndex = state.findIndex(({id}) => id === action.payload.updateTaskId);
            if(updateIndex < 0) return state; 
            const updatedTask: Task = {
                ...state[updateIndex],

            }
            state[updateIndex] = updatedTask;
            return [...state];
        }
        case TaskReducerActions.DELETE_TASK: {
            return state.filter(({id}) => id !== action.payload.deleteTaskId);
        }
        default:
            return state;
    }
}