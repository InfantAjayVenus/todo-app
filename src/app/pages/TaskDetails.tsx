import { ArrowBackIos, DeleteRounded, Edit, Folder, StarOutlineRounded, StarRounded } from "@mui/icons-material";
import { Card, CardActions, CardContent, CardHeader, Dialog, IconButton, Slide, SlideProps, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { Task } from "../types/TaskTypes";

interface TaskDetailsProps {
    activeTask: Task,
    isDetailsViewActive: boolean,
    onDelete: () => void,
    onEdit: () => void,
    onClose: () => void,
}

export default function TaskDetails({ activeTask, isDetailsViewActive, onEdit, onDelete, onClose }: TaskDetailsProps) {
    const dueDate = dayjs(activeTask.dueDate).format('DD/MM/YY');
    return (
        <>
            <Dialog
                open={isDetailsViewActive}
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
                        <Stack direction="row" alignItems={'center'}>
                            <IconButton
                                onClick={() => {
                                    onClose();
                                }}
                            >
                                <ArrowBackIos />
                            </IconButton>
                            <IconButton
                                onClick={() => {
                                    onDelete();
                                    onClose();
                                }}
                            >
                                <DeleteRounded />
                            </IconButton>
                        </Stack>
                        <IconButton onClick={() => { onEdit(); }} >
                            <Edit />
                        </IconButton>
                    </Stack>
                </CardActions>
            </Dialog>
        </>
    )
}