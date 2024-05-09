import { Button, Stack } from "@mui/material";
import Filters, { FiltersProps } from "../components/Filters";
import Projects from "../components/Projects";
import { Settings } from "@mui/icons-material";

interface SectionsProps {
    filterProps: FiltersProps
}

export default function Sections({ filterProps }: SectionsProps) {

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
                    <Projects />
                </section>
            </div>
            <Button><Settings /> Settings</Button>
        </Stack>
    )
}