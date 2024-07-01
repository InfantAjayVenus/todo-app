import { Helmet } from "react-helmet";
import { Navbar } from "./MainSection/Navbar";
import {Header as MainSectionHeader} from './MainSection/Header';

export interface HeaderProps {
    children: React.ReactNode,
};
export interface LayoutProps {
    children: React.ReactNode,
};

export interface MainSectionProps extends LayoutProps { };


export function Header({ children }: HeaderProps) {
    return (
        <Helmet>
            {children}
        </Helmet>
    )
}


export function MainSection({ children }: MainSectionProps) {
    return (
        <main className='h-screen w-screen px-4 py-6'>{children}</main>
    )
}



MainSection.Header = MainSectionHeader;
MainSection.Navbar = Navbar;