import { Metadata } from "next";

interface LayoutProps extends React.PropsWithChildren<{}> { }

export const metadata: Metadata = {
    title: "Profile Dashboard",
    description: "Explore your profile",
}

export default function Layout({ children }: LayoutProps) {
    return (
        <>
            {children}
        </>
    );
}
