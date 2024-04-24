import { ArrowBackIos } from "@mui/icons-material";
import { Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Slide, SlideProps, Stack, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en-gb';

interface AddTaskFormProps {
    isFormVisible: boolean,
    onCloseForm: () => void
}

export default function AddTaskForm({isFormVisible, onCloseForm}:AddTaskFormProps) {
    return (
        <>
            <Dialog
                slotProps={{
                    backdrop: {
                        sx: {
                            backdropFilter: 'blur(0.4rem)'
                        }
                    }
                }}
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
                        borderRadius: '1rem !important',
                        height: 'fit-content',
                    }
                }}
            >
                <DialogTitle fontWeight={600}>Add Task</DialogTitle>
                <DialogContent
                    sx={{
                        marginTop: '1rem',
                        padding: '1rem',
                        height: '80vh',
                    }}
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                        <Stack
                            spacing={'1rem'}
                            sx={{
                                padding: '1rem auto',
                            }}
                        >
                            <TextField
                                label="Title"
                                variant="outlined"
                                sx={{
                                    borderRadius: '1rem !important',
                                }}
                                inputProps={{
                                    borderRadius: '1rem',
                                    sx: {
                                        borderRadius: '1rem',
                                    }
                                }}
                            />
                            <TextField
                                label="Description"
                                variant="outlined"
                                multiline
                                rows={4}
                                inputProps={{
                                    sx: {
                                        borderRadius: '1rem',
                                    }
                                }}
                            />
                            <DatePicker label="Due Date"/>
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
                            onClick={() => {
                            }}
                        >Save</Button>
                    </Stack>
                </DialogActions>
            </Dialog>
        </>
    );
}