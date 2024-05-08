import { Close, Menu } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CardHeader, Dialog, IconButton, Stack, Typography } from "@mui/material";
import 'dayjs/locale/en-gb';
import { useState } from "react";
import { v4 as uuid } from 'uuid';


import AddTaskForm from "./AddTaskForm";
import Sections from "./Sections";
import TaskList from "../components/TaskList";

export type Task = {
    id: string,
    title: string,
    description?: string,
    isComplete: boolean,
    isFavourite: boolean,
    dueDate?: Date,
}

const defaultTasks = [
    {
        id: '1',
        title: "A Test Task",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quasi neque, iste laborum alias illo repellat temporibus excepturi et quidem.",
        isComplete: false,
        isFavourite: false,
    },
    {
        id: '2',
        title: "Another Test Task",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quasi neque, iste laborum alias illo repellat temporibus excepturi et quidem.",
        isComplete: false,
        isFavourite: true,
    },
    {
        id: '3',
        title: "A Test Task",
        isComplete: true,
        isFavourite: false,
        dueDate: new Date(),
    }
] as Task[];

export default function Home() {
    const [tasksList, setTasksList] = useState<Task[]>(defaultTasks);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
   

    const getCompletedCount = () => tasksList.filter(({ isComplete }) => isComplete).length;

    const onAddTask = (inputs: Partial<Task>) => {
        const {
            id=uuid(),
            title= '',
            description='',
            isComplete=false,
            isFavourite=false,
            dueDate=undefined
        } = inputs;

        setTasksList([
            ...tasksList,
            {
                id,
                title,
                description,
                isComplete,
                isFavourite,
                dueDate
            } as Task
        ]);
    }
    const onToggleComplete = (updateIndex: number) => {
        const updatedObject = { ...tasksList[updateIndex] };
        updatedObject.isComplete = !updatedObject.isComplete;
        tasksList[updateIndex] = updatedObject;
        setTasksList([...tasksList]);
    }

    const onToggleFavourite = (updateIndex: number) => {
        const updatedObject = { ...tasksList[updateIndex] };
        updatedObject.isFavourite = !updatedObject.isFavourite;
        tasksList[updateIndex] = updatedObject;
        setTasksList([...tasksList]);
    }

    return (
        <>
            <main>
                <Stack direction={'row'} spacing={[0,4]}>
                    <Card
                        sx={{
                            marginTop: '2rem',
                            height: '80vh',
                            borderRadius: '1rem',
                            display: ['none', 'flex'],
                            flexDirection: 'column',
                            padding: '1rem',
                        }}
                        raised
                    >
                        <Sections />
                    </Card>
                    <Card
                        sx={{
                            flex: '1',
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
                            <TaskList 
                                tasksList={tasksList}
                                onUpdateList={(updatedTaskList) => {
                                    setTasksList([...updatedTaskList]);
                                }}
                                onToggleComplete={onToggleComplete}
                                onToggleFavourite={onToggleFavourite}
                            />
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
                </Stack>
                <AddTaskForm
                    onSave={onAddTask}
                    isFormVisible={isAddModalOpen}
                    onCloseForm={() => {
                        setIsAddModalOpen(false);
                    }}
                />
            </main>
            <IconButton
                size="large"
                sx={{
                    position: 'fixed',
                    zIndex: 'modal',
                    top: '1.8rem',
                    right: '3rem',
                    color: 'primary.main',
                    display: ["auto", "none"],
                }}
                onClick={() => {
                    setIsFilterModalOpen(true);
                }}
            ><Menu /></IconButton>
            <Dialog
                open={isFilterModalOpen}
                onClose={() => {
                    setIsFilterModalOpen(false);
                }}
                PaperComponent={Card}
                PaperProps={{
                    sx: {
                        borderRadius: '1rem !important',
                        height: 'fit-content',
                        padding: '1rem',
                        marginTop: '1rem',
                    }
                }}
                slotProps={{
                    backdrop: {
                        sx: {
                            backdropFilter: 'blur(0.4rem)'
                        }
                    }
                }}
            >
                <IconButton
                    size="large"
                    sx={{
                        position: 'fixed',
                        zIndex: 'modal',
                        top: '1.8rem',
                        right: '3rem',
                        color: 'primary.main',
                    }}
                    onClick={() => {
                        setIsFilterModalOpen(false);
                    }}
                ><Close /></IconButton>
                <Sections />
            </Dialog>
        </>
    )
}