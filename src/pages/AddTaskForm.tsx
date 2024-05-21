import { ArrowBackIos } from "@mui/icons-material";
import { Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Slide, SlideProps, Stack, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import 'dayjs/locale/en-gb';
import { useEffect, useState } from "react";
import { Task } from "../types/TaskTypes";

interface AddTaskFormProps {
    defaultTask?: Task
    isFormVisible: boolean,
    onSave: (inputs: Partial<Task>) => void,
    onCloseForm: () => void
}

export default function AddTaskForm({ defaultTask, isFormVisible, onSave, onCloseForm }: AddTaskFormProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState<Date|undefined>();

    const resetStates = () => {
        setTitle('');
        setDescription('');
        setDueDate(undefined);
    }

    useEffect(() => {
        if(!defaultTask) return;

        setTitle(defaultTask.title);
        setDescription(defaultTask.description || '');
        setDueDate(defaultTask.dueDate);
    }, [defaultTask])

    const isSubmitDisabled = title.length === 0 ;

    return (
        <>
            <Dialog
                TransitionComponent={Slide}
                TransitionProps={{
                    direction: 'right',
                } as SlideProps}
                keepMounted
                open={isFormVisible}
                onClose={() => onCloseForm()}
                PaperComponent={Card}
                PaperProps={{
                    sx: {
                        marginTop: '2rem',
                        height: '80vh',
                        minWidth: ['20rem', '30rem', '40rem'],
                        borderRadius: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '1rem',
                    },
                }}
                slotProps={{
                    backdrop: {
                        sx: {
                            backdropFilter: 'blur(0.4rem)',
                        }
                    }
                }}
            >
                <DialogTitle fontWeight={600}>Add Task</DialogTitle>
                <DialogContent
                    sx={{
                        marginTop: '1rem',
                        padding: '1rem',
                        height: '80vh',
                        overflow: 'auto',
                    }}
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                        <Stack
                            spacing={'1rem'}
                            paddingY={'1rem'}
                        >
                            <TextField
                                label="Title"
                                variant="outlined"
                                value={title}
                                onChange={(event) => {
                                    setTitle(event.target.value);
                                }}
                            />
                            <TextField
                                label="Description"
                                variant="outlined"
                                multiline
                                rows={4}
                                value={description}
                                onChange={(event) => {
                                    setDescription(event.target.value);
                                }}
                            />
                            <DatePicker 
                                label="Due Date" 
                                disablePast
                                displayWeekNumber
                                value={dueDate ? dayjs(dueDate) : null}
                                onChange={(date) => {
                                    setDueDate(date?.toDate());
                                }}
                            />
                        </Stack>
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                    <Stack direction={'row'} justifyContent={'space-between'} width={'100%'} padding={'1rem'}>
                        <IconButton
                            onClick={() => {
                                onCloseForm();
                            }}
                        >
                            <ArrowBackIos />
                        </IconButton>
                        <Button
                            variant="contained"
                            sx={{
                                borderRadius: '2rem',
                            }}
                            disabled={isSubmitDisabled}
                            onClick={() => {
                                onSave({
                                    title,
                                    description,
                                    dueDate
                                });
                                onCloseForm();
                                resetStates();
                            }}
                        >Save</Button>
                    </Stack>
                </DialogActions>
            </Dialog>
        </>
    );
}