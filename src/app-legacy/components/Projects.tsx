import { Add, Folder } from "@mui/icons-material";
import { Grow, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Project } from "../types/ProjectTypes";

export interface ProjectsProps {
    projectsList: Project[],
    currentProject?: Project,
    setProject: (project: Project) => void,
    addProject: (projectData: Partial<Project>) => void,
}

export default function Projects({projectsList, currentProject, setProject, addProject}: ProjectsProps) {
    const [isAddProjectActive, setIsAddProjectActive] = useState(false);
    const [newProjectName, setNewProjectName] = useState('');

    const onAddProject = () => {
        setIsAddProjectActive(false);
        if(newProjectName.length > 0) {
            addProject({label: newProjectName});
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
            <List sx={{
                maxHeight: '22vh',
                overflow: 'auto'
            }}>
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
                {projectsList.map((projectItem, index) => {
                    const isActive = projectItem.id === currentProject?.id;
                    return (
                    <ListItem key={projectItem.id}>
                        <ListItemButton
                            key={index}
                            sx={{
                                alignItems: 'center',
                                borderRadius: '0.5rem',
                                backgroundColor: isActive ? 'text.primary' : 'secondary',
                                '&:hover': {
                                    backgroundColor: isActive ? 'text.primary' : 'text.disabled',
                                }
                            }}
                            onClick={() => {
                                setProject(projectItem)
                            }}
                        >
                            <ListItemIcon color="text.secondary"><Folder /></ListItemIcon>
                            <ListItemText
                                primary={projectItem.label}
                                primaryTypographyProps={{
                                    fontWeight: '600',
                                    color: 'text.secondary',
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                )
                })}
            </List>

        </>
    )
}