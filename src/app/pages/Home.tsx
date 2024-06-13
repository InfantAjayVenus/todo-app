import { Close, DateRange, EventBusyRounded, Inbox, Menu, StarRounded, Today } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CardHeader, Dialog, IconButton, Stack, Typography } from "@mui/material";
import 'dayjs/locale/en-gb';
import { useEffect, useReducer, useState } from "react";
import { v4 as uuid } from 'uuid';
import dayjs from "dayjs";


import AddTaskForm from "./AddTaskForm";
import Sections from "./Sections";
import TaskList from "../components/TaskList";
import { FiltersProps } from "../components/Filters";
import { ProjectsProps } from "../components/Projects";
import { Task } from "../types/TaskTypes";
import { Project } from "../types/ProjectTypes";
import { Filter, FilterType } from "../types/FilterTypes";
import { TaskReducerActions, taskReducer } from "../reducers/taskReducer";
import { addTask, getAllTasks } from "../api/tasksApi";

const FilterPresets: Filter[] = [
    {
        type: FilterType.ALL,
        label: "All Tasks",
        icon: <Inbox />,
        operation: (_: Task) => true
    },
    {
        type: FilterType.TODAY,
        label: "Today",
        icon: <Today />,
        operation: (task: Task) => !!task.dueDate && dayjs(task.dueDate).isSame(new Date(), 'D'),
    },
    {
        type: FilterType.FAV,
        label: "Favorites",
        icon: <StarRounded />,
        operation: (task: Task) => task.isFavourite
    },
    {
        type: FilterType.WEEK,
        label: "This Week",
        icon: <DateRange />,
        operation: (task: Task) => !!task.dueDate && dayjs(task.dueDate).isSame(new Date(), 'week'),
    },
    {
        type: FilterType.NO_DUE,
        label: "No Due",
        icon: <EventBusyRounded />,
        operation: (task: Task) => !task.dueDate,
    }
]

const defaultProject: Project[] = [
    {
        id: "DEFAULT_PROJECT",
        label: "Default",
    }
]

const defaultTasks = [
    {
        id: '1',
        title: "A Test Task",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quasi neque, iste laborum alias illo repellat temporibus excepturi et quidem.",
        isComplete: false,
        isFavourite: false,
        projectId: defaultProject[0].id,
    },
    {
        id: '2',
        title: "Another Test Task",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quasi neque, iste laborum alias illo repellat temporibus excepturi et quidem.",
        isComplete: false,
        isFavourite: true,
        projectId: defaultProject[0].id,
    },
    {
        id: '3',
        title: "A Test Task",
        isComplete: true,
        isFavourite: false,
        dueDate: new Date(),
        projectId: defaultProject[0].id,
    }
] as Task[];

export default function Home() {
    const [tasksList, dispatch] = useReducer(taskReducer, defaultTasks);
    const [projectsList, setProjectsList] = useState<Project[]>(defaultProject);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [activeFilterType, setActiveFilterType] = useState(FilterType.ALL);
    const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            const result = await getAllTasks();
            console.log('DEBUG: RESULT:', result);
            dispatch({type: TaskReducerActions.UPDATE_TASK, payload: {
                updatedTasksList: result as Task[],
            }})

        })()
    }, []);

    const projectProps: ProjectsProps = {
        projectsList,
        currentProject: activeProjectId ? projectsList.find(({ id }) => id === activeProjectId) : undefined,
        addProject: (projectData) => {
            if (projectData.label?.length === 0) return;
            const {
                id = uuid(),
                label = '',
            } = projectData;
            setProjectsList([...projectsList, { id, label } as Project]);
        },
        setProject: (project) => {
            if (activeProjectId === project.id) {
                setActiveProjectId(null);
                return;
            }

            setActiveProjectId(project.id);
        },
    }


    const filterProps: FiltersProps = {
        filtersList: FilterPresets,
        activeFilter: FilterPresets.find(({ type }) => type === activeFilterType) || FilterPresets[0],
        setFilter: (filter) => setActiveFilterType(filter.type),
    }

    const filteredTasks = tasksList
        .filter(({ projectId }) => !activeProjectId || (projectId === activeProjectId))
        .filter(filterProps.activeFilter.operation);

    const getCompletedCount = () => filteredTasks.filter(({ isComplete }) => isComplete).length;

    const onAddTask = async (inputs: Partial<Task>) => {
        const task = await addTask(inputs);
        dispatch({
            type: TaskReducerActions.ADD_TASK, 
            payload: {
                activeProjectId: activeProjectId || defaultProject[0].id,
                taskData: task,
            }
        });
    }
    const onToggleComplete = (updateTaskId: string) => {
        dispatch({
            type: TaskReducerActions.TOGGLE_DONE, 
            payload: {
                updateTaskId,
            }
        });
    }

    const onToggleFavourite = (updateTaskId: string) => {
        dispatch({
            type: TaskReducerActions.TOGGLE_FAVORITE,
            payload: {
                updateTaskId,
            }
        })
    }

    const onUpdateTasks = (updateTaskId: string, updatedTaskData: Partial<Task>) => {
        dispatch({
            type: TaskReducerActions.UPDATE_TASK,
            payload: {
                updateTaskId,
                updatedTaskData,
            }
        })
    }

    const onDeleteTask = (deleteTaskId: string) => {
        dispatch({
            type: TaskReducerActions.DELETE_TASK,
            payload: {
                deleteTaskId,
            }
        })
    }

    return (
        <>
            <main>
                <Stack direction={'row'} spacing={[0, 4]}>
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
                        <Sections
                            filterProps={filterProps}
                            projectProps={projectProps}
                        />
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
                                    {filterProps.activeFilter.label}
                                </Typography>
                            }
                            subheader={
                                <Typography>{getCompletedCount()}/{filteredTasks.length}</Typography>
                            }
                        />
                        <CardContent
                            sx={{
                                padding: 0,
                                flex: 1
                            }}
                        >
                            <TaskList
                                tasksList={filteredTasks}
                                projectsList={projectsList}
                                onUpdateList={onUpdateTasks}
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
                <Sections
                    filterProps={filterProps}
                    projectProps={projectProps}
                />
            </Dialog>
        </>
    )
}