import { useEffect, useState } from "react";

export default function useSystemTheme() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const mediaChangeHandler = ({ matches }: MediaQueryListEvent) => {
        setIsDarkMode(matches);
    }
    useEffect(() => {
        const query = window.matchMedia('(prefers-color-scheme: dark)');
        query.addEventListener('change', mediaChangeHandler)

        return () => {
            query.removeEventListener("change", mediaChangeHandler);
        }
    }, [])

    return !isDarkMode;
}