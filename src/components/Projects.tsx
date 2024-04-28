import { Add, Folder } from "@mui/icons-material";
import { Grow, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function Projects() {
    const [projectsList, setProjectsList] = useState(["Default"]);
    const [isAddProjectActive, setIsAddProjectActive] = useState(false);
    const [newProjectName, setNewProjectName] = useState('');
    const onAddProject = () => {
        setIsAddProjectActive(false);
        if(newProjectName.length > 0) {
            setProjectsList([newProjectName, ...projectsList]);
            setNewProjectName('');
        }
    }

    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent={'space-between'}>
                <Typography variant="subtitle1" color={'primary'} fontWeight={'600'} padding={'1rem'}>Projects</Typography>
                <IconButton onClick={() => {
                    setIsAddProjectActive(true);
                }}><Add /></IconButton>
            </Stack>
            <List>
                <Grow
                    in={isAddProjectActive}
                    mountOnEnter
                    unmountOnExit
                >
                    <ListItem>
                        <form
                            onBlur={onAddProject}
                            onSubmit={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                onAddProject();
                            }}
                            style={{
                                width: '100%',
                            }}
                        >
                            <TextField
                                autoFocus
                                variant="outlined"
                                sx={{
                                    borderRadius: '2rem',
                                    width: '100%',
                                }}
                                value={newProjectName}
                                onChange={(event) => {
                                    setNewProjectName(event.target.value);
                                }}
                                onBlur={onAddProject}
                            />
                        </form>
                    </ListItem>
                </Grow>
                {projectsList.map((projectName, index) => (
                    <ListItem>
                        <ListItemButton
                            key={index}
                            sx={{
                                alignItems: 'center',
                                borderRadius: '0.5rem',
                                '&:hover': {
                                    background: 'transparent',
                                }
                            }}
                        >
                            <ListItemIcon color="text.secondary"><Folder /></ListItemIcon>
                            <ListItemText
                                primary={projectName}
                                primaryTypographyProps={{
                                    fontWeight: '600',
                                    color: 'text.secondary',
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

        </>
    )
}