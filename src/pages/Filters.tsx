import { Add, DateRange, Folder, Inbox, Star, Today } from "@mui/icons-material";
import { IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";

export default function Filters() {
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
                    <IconButton><Add /></IconButton>
                </Stack>
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
                            <ListItemIcon color="text.secondary"><Folder /></ListItemIcon>
                            <ListItemText
                                primary={"Default"}
                                primaryTypographyProps={{
                                    fontWeight: '600',
                                    color: 'text.secondary',
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
            </section>
        </aside>
    )
}