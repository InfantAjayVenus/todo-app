import { Add, DateRange, Folder, Inbox, Star, Today } from "@mui/icons-material";
import { Grow, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function Filters() {
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
        <aside
            style={{
                height: '80vh',
                width: '17rem'
            }}
        >
            <section>
                <Typography variant="subtitle1" color={'primary'} fontWeight={'600'} padding={'1rem'}>Filters</Typography>
                <List>
                    <ListItem>
                        <ListItemButton
                            sx={{
                                alignItems: 'center',
                                borderRadius: '0.5rem',
                                '&:hover': {
                                    background: 'transparent',
                                }
                            }}
                        >
                            <ListItemIcon color="text.secondary"><Inbox /></ListItemIcon>
                            <ListItemText
                                primary={"All"}
                                primaryTypographyProps={{
                                    fontWeight: '600',
                                    color: 'text.secondary',
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton
                            sx={{
                                alignItems: 'center',
                                borderRadius: '0.5rem',
                                '&:hover': {
                                    background: 'transparent',
                                }
                            }}
                        >
                            <ListItemIcon color="text.secondary"><Today /></ListItemIcon>
                            <ListItemText
                                primary={"Today"}
                                primaryTypographyProps={{
                                    fontWeight: '600',
                                    color: 'text.secondary',
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton
                            sx={{
                                alignItems: 'center',
                                borderRadius: '0.5rem',
                                '&:hover': {
                                    background: 'transparent',
                                }
                            }}
                        >
                            <ListItemIcon color="text.secondary"><Star /></ListItemIcon>
                            <ListItemText
                                primary={"Starred"}
                                primaryTypographyProps={{
                                    fontWeight: '600',
                                    color: 'text.secondary',
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton
                            sx={{
                                alignItems: 'center',
                                borderRadius: '0.5rem',
                                '&:hover': {
                                    background: 'transparent',
                                }
                            }}
                        >
                            <ListItemIcon color="text.secondary"><DateRange /></ListItemIcon>
                            <ListItemText
                                primary={"This Week"}
                                primaryTypographyProps={{
                                    fontWeight: '600',
                                    color: 'text.secondary',
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
            </section>
            <section>
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
            </section>
        </aside>
    )
}