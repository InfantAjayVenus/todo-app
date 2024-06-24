import { CheckCircleOutline, RadioButtonUnchecked, StarOutlineRounded, StarRounded } from "@mui/icons-material";
import { Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Project } from "../types/ProjectTypes";
import { Task } from "../types/TaskTypes";
import { useState } from "react";
import TaskDetails from "../pages/TaskDetails";
import AddTaskForm from "../pages/AddTaskForm";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";

interface TaskListProps {
    tasksList: Task[],
    projectsList: Project[],
    onUpdateList: (updatedTaskId: string, updatedTaskData: Partial<Task>) => void,
    onToggleComplete: (updateIndex: string) => void,
    onToggleFavourite: (updateIndex: string) => void,
    onDeleteTask: (deleteTaskId: string) => void,
}

export default function TaskList({ tasksList, projectsList, onUpdateList, onToggleComplete, onToggleFavourite, onDeleteTask }: TaskListProps) {
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
        onUpdateList(updatedTaskId, updatedTaskData);
    }

    return (
        <>
            <SimpleTreeView defaultExpandedItems={tasksGroupedByProjects.map((projectGroup) => projectGroup!.id)}>
                {tasksGroupedByProjects.map((projectGroup) => (
                    <TreeItem
                        key={projectGroup!.id}
                        itemId={projectGroup!.id}
                        label={<Typography fontWeight={'bold'}>{projectGroup!.label}</Typography>}
                    >
                        <List
                            sx={{
                                padding: '0.5rem 1rem',
                                maxHeight: '26rem',
                                overflow: 'auto',
                                scrollbarWidth: 'thin',
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
                                                onToggleFavourite(taskItem.id);
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
                                                onToggleComplete(taskItem.id);
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
                        onDeleteTask(activeTask);
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