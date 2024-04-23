import { CheckCircleOutline, RadioButtonUnchecked, Star, StarOutline } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CardHeader, Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import 'dayjs/locale/en-gb';
import { useState } from "react";
import AddTaskForm from "./AddTaskForm";

type Task = {
    title: string,
    description?: string,
    isComplete: boolean,
    isFavourite: boolean,
    dueDate?: Date,
}

const defaultTasks = [
    {
        title: "A Test Task",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quasi neque, iste laborum alias illo repellat temporibus excepturi et quidem.",
        isComplete: false,
        isFavourite: false,
    },
    {
        title: "Another Test Task",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quasi neque, iste laborum alias illo repellat temporibus excepturi et quidem.",
        isComplete: false,
        isFavourite: true,
    },
    {
        title: "A Test Task",
        isComplete: false,
        isFavourite: false,
        dueDate: new Date(),
    }
] as Task[];

export default function Home() {
    const [tasksList, setTasksList] = useState<Task[]>(defaultTasks);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const getCompletedCount = () => tasksList.filter(({ isComplete }) => isComplete).length;

    const onToggleComplete = (updateIndex: number) => {
        const updatedObject = { ...tasksList[updateIndex] };
        updatedObject.isComplete = !updatedObject.isComplete;
        tasksList[updateIndex] = updatedObject;
        setTasksList([...tasksList]);
    }

    return (
        <>
            <main>
                <Card
                    sx={{
                        marginTop: '2rem',
                        height: '80vh',
                        borderRadius: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                    raised
                >
                    <CardHeader
                        title={
                            <Typography variant='subtitle1' fontWeight={600}>
                                Tasks
                            </Typography>
                        }
                        subheader={
                            <Typography>{getCompletedCount()}/{tasksList.length}</Typography>
                        }
                    />
                    <CardContent
                        sx={{
                            padding: 0,
                            flex: 1
                        }}
                    >
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
                                        backgroundColor: 'text.disabled',
                                        color: taskItem.isComplete ? 'text.secondary' : 'text.primary',
                                        transition: 'all 0.5s',
                                    }}
                                    secondaryAction={
                                        <Checkbox
                                            edge="end"
                                            icon={<StarOutline />}
                                            checkedIcon={<Star />}
                                            onChange={() => {
                                            }}
                                        />
                                    }
                                    disablePadding
                                >
                                    <ListItemIcon sx={{ minWidth: 'fit-content' }}>
                                        <Checkbox
                                            icon={<RadioButtonUnchecked />}
                                            checkedIcon={<CheckCircleOutline />}
                                            onClick={() => {
                                                onToggleComplete(index);
                                            }}
                                        />
                                    </ListItemIcon>
                                    <ListItemButton
                                        sx={{
                                            padding: '0 !important',
                                            '&:hover': {
                                                backgroundColor: 'text.disabled'
                                            },
                                        }}
                                        disableGutters
                                    >
                                        <ListItemText
                                            sx={{
                                                textOverflow: 'ellipsis',
                                                textDecoration: taskItem.isComplete ? 'line-through' : 'none'
                                            }}
                                        >{taskItem.title}</ListItemText>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                    <CardActions
                        sx={{
                            padding: '1rem',
                            justifyContent: 'end',
                        }}
                    >
                        <Button
                            variant="contained"
                            sx={{
                                borderRadius: '2rem',
                            }}
                            onClick={() => {
                                setIsAddModalOpen(true);
                            }}
                        >Add Task</Button>
                    </CardActions>
                </Card>
            </main>
            <aside>
                <AddTaskForm 
                    isFormVisible={isAddModalOpen}
                    onCloseForm={() => {
                        setIsAddModalOpen(false);
                    }}
                />
            </aside >
        </>
    )
}