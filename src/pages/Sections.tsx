import { Button, Stack } from "@mui/material";
import Filters from "../components/Filters";
import Projects from "../components/Projects";
import { Settings } from "@mui/icons-material";

export default function Sections() {

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
                    <Filters />
                </section>
                <section>
                    <Projects />
                </section>
            </div>
            <Button><Settings /> Settings</Button>
        </Stack>
    )
}