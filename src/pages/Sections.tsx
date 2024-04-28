import Filters from "../components/Filters";
import Projects from "../components/Projects";

export default function Sections() {
    
    return (
        <aside
            style={{
                height: '80vh',
                width: '17rem'
            }}
        >
            <section>
                <Filters />
            </section>
            <section>
                <Projects />
            </section>
        </aside>
    )
}