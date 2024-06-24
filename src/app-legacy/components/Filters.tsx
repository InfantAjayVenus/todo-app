import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Filter } from "../types/FilterTypes";

export interface FiltersProps {
    filtersList: Filter[],
    activeFilter: Filter,
    setFilter: (filter: Filter) => void,
}

export default function Filters({filtersList, activeFilter, setFilter}: FiltersProps) {
    return (
        <>
            <Typography variant="subtitle1" color={'primary'} fontWeight={'600'} padding={'1rem'}>Filters</Typography>
            <List>
                {filtersList.map((filterItem) => {
                    const isActive = filterItem.type === activeFilter.type;
                    return (
                    <ListItem key={filterItem.label}>
                        <ListItemButton
                            sx={{
                                alignItems: 'center',
                                borderRadius: '0.5rem',
                                backgroundColor: isActive ? 'text.primary' : 'secondary',
                                '&:hover': {
                                    backgroundColor: isActive ? 'text.primary' : 'text.disabled',
                                }
                            }}
                            onClick={() => {
                                setFilter(filterItem);
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
                )
                })}
            </List>

        </>
    )
}