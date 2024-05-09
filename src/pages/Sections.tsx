import { Button, Stack } from "@mui/material";
import Filters, { FiltersProps } from "../components/Filters";
import Projects, { ProjectsProps } from "../components/Projects";
import { Settings } from "@mui/icons-material";

interface SectionsProps {
    filterProps: FiltersProps,
    projectProps: ProjectsProps,
}

export default function Sections({ filterProps, projectProps }: SectionsProps) {

    return (
        <Stack
            sx={{
                height: '80vh',
                width: '17rem'
            }}
            justifyContent={'space-between'}
        >
            <div>
                <section>
                    <Filters {...filterProps}/>
                </section>
                <section>
                    <Projects {...projectProps}/>
                </section>
            </div>
            <Button><Settings /> Settings</Button>
        </Stack>
    )
}