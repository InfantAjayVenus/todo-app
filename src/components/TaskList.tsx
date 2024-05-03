import { CheckCircleOutline, RadioButtonUnchecked, StarOutlineRounded, StarRounded } from "@mui/icons-material";
import { Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Task } from "../pages/Home";
import { useState } from "react";
import TaskDetails from "../pages/TaskDetails";

interface TaskListProps {
    tasksList: Task[],
    onToggleComplete: (updateIndex: number) => void,
    onToggleFavourite: (updateIndex: number) => void,
}

export default function TaskList({ tasksList, onToggleComplete, onToggleFavourite }: TaskListProps) {
    const [isDetailsViewActive, setIsDetailsViewActive] = useState(false);
    const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
    const activeTask = tasksList.find(({ id }) => id === activeTaskId);

    return (
        <>
            <List
                sx={{
                    padding: '0 1rem'
                }}
            >
                {tasksList.map((taskItem, index) => (
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
            {activeTask && <TaskDetails
                activeTask={activeTask}
                isDetailsViewActive={isDetailsViewActive}
                onEdit={() => {
                    // setIsAddModalOpen(true);
                }}
                onClose={() => {
                    setIsDetailsViewActive(false);
                }}
            />}
        </>
    )
}