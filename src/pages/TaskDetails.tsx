import { ArrowBackIos, Edit, Folder, StarOutlineRounded, StarRounded } from "@mui/icons-material";
import { Card, CardActions, CardContent, CardHeader, Dialog, IconButton, Slide, SlideProps, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import AddTaskForm from "./AddTaskForm";
import { Task } from "./Home";

interface TaskDetailsProps {
    activeTask: Task,
    isDetailsViewActive: boolean,
    onClose: () => void,
}

export default function TaskDetails({ activeTask, isDetailsViewActive, onClose }: TaskDetailsProps) {
    const [isEditActive, setIsEditActive] = useState(false);
    const dueDate = dayjs(activeTask.dueDate).format('DD/MM/YY');
    return (
        <>
        <Dialog
            open={isDetailsViewActive && !isEditActive}
            onClose={() => {
                onClose();
            }}
            TransitionComponent={Slide}
            TransitionProps={{
                direction: 'right',
            } as SlideProps}
            PaperComponent={Card}
            PaperProps={{
                sx: {
                    marginTop: '2rem',
                    height: '80vh',
                    borderRadius: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '1rem',
                    minWidth: '25rem',
                },
            }}
            slotProps={{
                backdrop: {
                    sx: {
                        backdropFilter: 'blur(0.4rem)',
                    }
                }
            }}
            keepMounted
        >
            <CardHeader
                title={
                    <Typography variant='subtitle1' fontSize={'1.7rem'} alignItems={'center'} color={'text.secondary'}><Folder /> Default</Typography>
                }
                subheader={
                    <Typography variant="body1" color={'primary.main'} fontWeight={'600'}>{activeTask.dueDate ? dueDate : 'No Due Set'}</Typography>
                }
            />
            <CardContent
            sx={{
                height: '80vh'
            }}
            >
                <Stack
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    sx={{
                        borderBottom: '0.25rem solid',
                        borderColor: 'primary.main',
                        marginBottom: '1rem',
                    }}
                >
                    <Typography variant="h4">{activeTask.title}</Typography>
                    <Typography color="primary.main">
                    {activeTask.isFavourite ? <StarRounded /> : <StarOutlineRounded />}
                    </Typography>
                </Stack>
                <Typography variant="body1">
                    {activeTask.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Stack direction="row" width={'100%'} justifyContent={'space-between'} alignItems={'center'}>
                    <IconButton
                        onClick={() => {
                            onClose();
                        }}
                    >
                        <ArrowBackIos />
                    </IconButton>
                    <IconButton onClick={() => {setIsEditActive(true);}} >
                        <Edit />
                    </IconButton>
                </Stack>
            </CardActions>
        </Dialog>
        <AddTaskForm 
            isFormVisible={isEditActive}
            onCloseForm={() => {setIsEditActive(false);}}
        />
        </>
    )
}