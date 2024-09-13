'use client'
import clsx from 'clsx';
import dynamic from 'next/dynamic';

const CreateCollectionForm = dynamic(() => import('./CreateCollectionForm'), {
    ssr: false,
});
const FormHeader = dynamic(() => import('./FormHeader'))
const CollectionDetailArea = dynamic(() => import('./CollectionDetailArea'))

export default function FormSection() {
    return (
        <section className={clsx(
            'flex flex-col md:flex-row gap-8 items-start justify-center w-full h-full',
            'my-auto'
        )}>
            <div className='my-auto h-fit w-full md:w-fit flex flex-col gap-4 md:max-w-sm box-border'>
                <FormHeader />
                <CreateCollectionForm />
            </div>
            <div className="h-full w-full" >
                <CollectionDetailArea />
            </div>
        </section>
    )
}