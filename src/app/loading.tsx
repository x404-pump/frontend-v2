'use client';

import Spline from '@splinetool/react-spline';


function LoadingSpinner() {
    return (
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"/>
    );
}

export default function Page() {
    return (
        <div className={'w-full flex flex-col items-center gap-2'}>
            <Spline scene="https://prod.spline.design/a21iDct4L7q6CYM7/scene.splinecode" style={{
                width: '512px',
                height: '512px',
            }}
            />
            <LoadingSpinner/>
            <h6 className={'text-2xl text-default-foreground font-semibold'}>X404 is loading</h6>
            <p className={'text-base font-normal text-secondary-foreground break-words text-center'}>X04 is loading, if you stay on this page too long please report back to us</p>
        </div>
    )
}