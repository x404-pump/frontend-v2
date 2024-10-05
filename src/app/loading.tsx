"use client";
import { Progress } from "@nextui-org/progress";



export default function Page() {
    return (
        <div className={'m-auto w-full h-full min-h-screen flex flex-col items-center justify-center gap-2'}>
            <h6 className={'text-2xl lg:text-4xl text-foreground font-semibold'}>X404 is loading ...</h6>
            <p className={'text-base text-foreground-500'}>Please wait, it will take a few seconds</p>
            <Progress color="primary" isIndeterminate radius="full" className="w-64"/>
        </div>
    )
}