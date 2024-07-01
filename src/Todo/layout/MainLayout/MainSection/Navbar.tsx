import { ReactElement } from "react"
import { LayoutProps } from ".."
import { IconType } from "react-icons"
import { Button } from "@/components/ui/button"

export interface MainSectionNavbarProps extends LayoutProps { };
export interface MainSectionNavbarItemProps {
    icon: ReactElement<IconType>,
    label: string,
};

export function Navbar({ children }: MainSectionNavbarProps) {
    return (
        <nav className="fixed bottom-0 left-0 p-2 py-2 w-full border-t lg:w-auto lg:h-full lg:border-t-0 lg:border-r">
            <ul className='flex flex-row items-center justify-evenly lg:flex-col'>
                {children}
            </ul>
        </nav>
    )
}

Navbar.NavbarItem = function ({ icon, label }: MainSectionNavbarItemProps) {
    return (
        <li>
            <Button variant={'ghost'} className='group flex flex-col justify-center space-y-1 text-xs font-semibold h-20 w-20 rounded-[50%] transition-all hover:-translate-y-2'>
                {icon}
                <p className='text-primary-foreground group-hover:text-current'>{label}</p>
            </Button>
        </li>
    )
}