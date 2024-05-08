import { DateRange, Inbox, StarRounded, Today } from "@mui/icons-material";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";

const FiltersData = [
    {
        label: "All",
        icon: <Inbox />,
    },
    {
        label: "Today",
        icon: <Today />,
    },
    {
        label: "Favorites",
        icon: <StarRounded />,
    },
    {
        label: "This Week",
        icon: <DateRange />,
    },
]

export default function Filters() {
    return (
        <>
            <Typography variant="subtitle1" color={'primary'} fontWeight={'600'} padding={'1rem'}>Filters</Typography>
            <List>
                {FiltersData.map((filterItem) => (
                    <ListItem key={filterItem.label}>
                        <ListItemButton
                            sx={{
                                alignItems: 'center',
                                borderRadius: '0.5rem',
                                backgroundColor: 'secondary',
                                '&:hover': {
                                    background: 'transparent',
                                }
                            }}
                        >
                            <ListItemIcon color="text.secondary">{filterItem.icon}</ListItemIcon>
                            <ListItemText
                                primary={filterItem.label}
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