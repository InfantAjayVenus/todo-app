import { Button, Stack } from "@mui/material";
import Filters, { FiltersProps } from "../components/Filters";
import Projects, { ProjectsProps } from "../components/Projects";
import { Settings } from "@mui/icons-material";
import { useState } from "react";
import SettingsPanel from "./SettingsPanel";

interface SectionsProps {
    filterProps: FiltersProps,
    projectProps: ProjectsProps,
}

export default function Sections({ filterProps, projectProps }: SectionsProps) {

    const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);

    return (
        <>
            <Stack
                sx={{
                    height: '80vh',
                    width: '17rem'
                }}
                justifyContent={'space-between'}
            >
                <div>
                    <section>
                        <Filters {...filterProps} />
                    </section>
                    <section>
                        <Projects {...projectProps} />
                    </section>
                </div>
                <Button
                    onClick={() => {
                        setIsSettingsPanelOpen(true);
                    }}
                ><Settings /> Settings</Button>
            </Stack>
            <SettingsPanel 
                isFormVisible={isSettingsPanelOpen}
                onCloseForm={() => {
                    setIsSettingsPanelOpen(false);
                }}
            />
        </>
    )
}