import { DateRange, Inbox, Star, Today } from "@mui/icons-material";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";

export default function Filters() {
    return (
        <>
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

        </>
    )
}