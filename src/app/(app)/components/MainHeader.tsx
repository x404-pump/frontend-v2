import Toolbar from "./Toolbar";

export default function MainHeader() {
    return (
        <header className="flex flex-col w-full md:flex-row justify-between items-center gap-4">
            <div className="w-full flex flex-col">
                <h6 className="text-2xl md:text-4xl font-bold text-default-foreground">Welcome to X404</h6>
                <p className="text-xs md:text-base text-foreground-500">Relax and make anything you want.</p>
            </div>
            <Toolbar />
        </header>
    )
}