import { ArrowBackIos, Edit, Folder, StarOutlineRounded, StarRounded } from "@mui/icons-material";
import { Card, CardActions, CardContent, CardHeader, Checkbox, Dialog, IconButton, Slide, SlideProps, Stack, Typography } from "@mui/material";
import AddTaskForm from "./AddTaskForm";
import { useState } from "react";

interface TaskDetailsProps {
    isDetailsViewActive: boolean,
    onClose: () => void,
}

export default function TaskDetails({ isDetailsViewActive, onClose }: TaskDetailsProps) {
    const [isEditActive, setIsEditActive] = useState(false);
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
                    <Typography variant="body1" color={'primary.main'} fontWeight={'600'}>30/12/24</Typography>
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
                    sx={{
                        borderBottom: '0.25rem solid',
                        borderColor: 'primary.main',
                        marginBottom: '1rem',
                    }}
                >
                    <Typography variant="h4">This is a sample title of a task</Typography>
                    <Checkbox
                        size="large"
                        checked
                        icon={<StarOutlineRounded />}
                        checkedIcon={<StarRounded />}
                    />
                </Stack>
                <Typography variant="body1">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt sunt ipsa eos, tenetur nulla minima error sit quas a neque voluptate, alias atque? Vel inventore delectus, magni expedita voluptate dolor!
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