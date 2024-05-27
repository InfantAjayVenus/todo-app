import { Task } from "./TaskTypes";


export enum FilterType {
    ALL,
    TODAY,
    FAV,
    WEEK,
    NO_DUE
}

export interface Filter {
    type: FilterType;
    label: string;
    icon: JSX.Element;
    operation: (task: Task) => boolean;
}
