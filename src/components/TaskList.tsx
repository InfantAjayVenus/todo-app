import { CheckCircleOutline, RadioButtonUnchecked, StarOutlineRounded, StarRounded } from "@mui/icons-material";
import { Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Project, Task } from "../pages/Home";
import { useState } from "react";
import TaskDetails from "../pages/TaskDetails";
import AddTaskForm from "../pages/AddTaskForm";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";

interface TaskListProps {
    tasksList: Task[],
    projectsList: Project[],
    onUpdateList: (updatedList: Task[]) => void,
    onToggleComplete: (updateIndex: number) => void,
    onToggleFavourite: (updateIndex: number) => void,
}

export default function TaskList({ tasksList, projectsList, onUpdateList, onToggleComplete, onToggleFavourite }: TaskListProps) {
    const [isDetailsViewActive, setIsDetailsViewActive] = useState(false);
    const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
    const [isEditActive, setIsEditActive] = useState(false);
    const activeTask = tasksList.find(({ id }) => id === activeTaskId);

    const tasksGroupedByProjects = Object.entries(tasksList.reduce((acc, taskItem) => {
        if (!acc[taskItem.projectId]) {
            acc[taskItem.projectId] = [];
        }

        acc[taskItem.projectId].push(taskItem);
        return acc;
    }, {} as Record<string, Task[]>)).map(
        ([projectId, list]) => {
            const project = projectsList.find(({ id }) => projectId === id);
            if (!project) return;

            return {
                ...project,
                tasksList: list,
            }
        }
    ).filter(item => !!item);

    const updateTask = (updatedTaskId: string, updatedTaskData: Partial<Task>) => {
        const updatedTaskIndex = tasksList.findIndex(({ id }) => id === updatedTaskId);
        if (updatedTaskIndex) throw ("Task ID does not exist!");

        const updatedTaskObject: Task = {
            ...tasksList[updatedTaskIndex],
            ...updatedTaskData
        };

        tasksList[updatedTaskIndex] = updatedTaskObject;
        onUpdateList([...tasksList]);
    }

    return (
        <>
            <SimpleTreeView defaultExpandedItems={tasksGroupedByProjects.map((projectGroup) => projectGroup!.id)}>
                {tasksGroupedByProjects.map((projectGroup) => (
                    <TreeItem 
                        itemId={projectGroup!.id} 
                        label={<Typography fontWeight={'bold'}>{projectGroup!.label}</Typography>}
                    >
                        <List
                            sx={{
                                padding: '0.5rem 1rem'
                            }}
                        >
                            {projectGroup!.tasksList.map((taskItem, index) => (
                                <ListItem
                                    key={index}
                                    sx={{
                                        marginBottom: '0.5rem',
                                        borderRadius: '0.5rem',
                                        border: taskItem.isComplete ? 'none' : '1px solid',
                                        borderColor: 'text.secondary',
                                        color: taskItem.isComplete ? 'text.secondary' : 'text.primary',
                                        transition: 'all 0.5s',

                                        '&:hover': {
                                            backgroundColor: taskItem.isComplete ? 'transparent' : 'text.primary',
                                        }
                                    }}
                                    secondaryAction={
                                        <Checkbox
                                            edge="end"
                                            icon={<StarOutlineRounded />}
                                            checkedIcon={<StarRounded />}
                                            checked={taskItem.isFavourite}
                                            onChange={() => {
                                                onToggleFavourite(index);
                                            }}
                                        />
                                    }
                                    disablePadding
                                >
                                    <ListItemIcon sx={{ minWidth: 'fit-content' }}>
                                        <Checkbox
                                            icon={<RadioButtonUnchecked />}
                                            checkedIcon={<CheckCircleOutline />}
                                            checked={taskItem.isComplete}
                                            onClick={() => {
                                                onToggleComplete(index);
                                            }}
                                        />
                                    </ListItemIcon>
                                    <ListItemButton
                                        sx={{
                                            padding: '0 !important',
                                        }}
                                        disableGutters
                                        disableRipple
                                        disableTouchRipple
                                        onClick={() => {
                                            setActiveTaskId(taskItem.id);
                                            setIsDetailsViewActive(true);
                                        }}
                                    >
                                        <ListItemText
                                            sx={{
                                                color: 'text.secondary',
                                                textOverflow: 'ellipsis',
                                                textDecoration: taskItem.isComplete ? 'line-through' : 'none'
                                            }}
                                        >{taskItem.title}</ListItemText>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </TreeItem>
                ))}

            </SimpleTreeView>
            {activeTask && <TaskDetails
                activeTask={activeTask}
                isDetailsViewActive={isDetailsViewActive && !isEditActive}
                onEdit={() => {
                    setIsEditActive(true);
                }}
                onDelete={() => {
                    if (activeTask) {
                        onUpdateList(tasksList.filter(({ id }) => activeTask?.id !== id));
                    }
                    setIsDetailsViewActive(false);
                    setActiveTaskId(null);
                }}
                onClose={() => {
                    setIsDetailsViewActive(false);
                }}
            />}
            <AddTaskForm
                isFormVisible={isEditActive}
                defaultTask={activeTask}
                onCloseForm={() => {
                    setIsEditActive(false);
                }}
                onSave={(updatedTaskData) => {
                    activeTask && updateTask(activeTask?.id, updatedTaskData);
                }}
            />
        </>
    )
}