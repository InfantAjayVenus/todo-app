import { ArrowBackIos, ComputerOutlined, DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { Card, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Slide, SlideProps, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { ThemeValue } from "../types/Themes";
import { useContext } from "react";
import { ThemeValueContext } from "@/App";

interface SettingsPanelProps {
    isFormVisible: boolean,
    onCloseForm: () => void,
}

export default function SettingsPanel({ isFormVisible, onCloseForm }: SettingsPanelProps) {
    const {themeValue: activeTheme, setThemeValue: onChangeTheme} = useContext(ThemeValueContext)
    return (
        <Dialog
            TransitionComponent={Slide}
            TransitionProps={{
                direction: 'right',
            } as SlideProps}
            keepMounted
            open={isFormVisible}
            onClose={() => onCloseForm()}
            PaperComponent={Card}
            PaperProps={{
                sx: {
                    marginTop: '2rem',
                    height: '80vh',
                    minWidth: ['20rem', '30rem', '40rem'],
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
        >
            <DialogTitle fontWeight={600}>Settings</DialogTitle>
            <DialogContent
                sx={{
                    marginTop: '1rem',
                    padding: '1rem',
                    height: '80vh',
                    overflow: 'auto',
                }}
            >
                <ToggleButtonGroup
                    value={activeTheme}
                    exclusive
                    fullWidth
                    onChange={(_, updatedTheme) => {
                        if(updatedTheme === null) return;

                        onChangeTheme(updatedTheme);
                    }}
                >
                    <ToggleButton value={ThemeValue.SYSTEM}><ComputerOutlined /></ToggleButton>
                    <ToggleButton value={ThemeValue.LIGHT}><LightModeOutlined /></ToggleButton>
                    <ToggleButton value={ThemeValue.DARK}><DarkModeOutlined /></ToggleButton>
                </ToggleButtonGroup>
            </DialogContent>
            <DialogActions>
                <Stack direction={'row'} justifyContent={'space-between'} width={'100%'} padding={'1rem'}>
                    <IconButton
                        onClick={() => {
                            onCloseForm();
                        }}
                    >
                        <ArrowBackIos />
                    </IconButton>
                </Stack>
            </DialogActions>
        </Dialog>
    )
}