'use client'
import clsx from 'clsx';
import dynamic from 'next/dynamic';

const CreateCollectionForm = dynamic(() => import('./create-collection-form/CreateCollectionForm'), {
    ssr: false,

});
const FormHeader = dynamic(() => import('./FormHeader'))
const CollectionDetailArea = dynamic(() => import('./create-collection-form/CollectionDetailArea'))

export default function FormSection() {
    return (
        <section className={clsx(
            'flex flex-row gap-8 items-start justify-center w-full h-full',
            'my-auto'
        )}>
            <div className='my-auto h-fit w-fit flex flex-col gap-4 px-16'>
                <FormHeader />
                <CreateCollectionForm />
            </div>
            <CollectionDetailArea className="h-full w-fit" />
        </section>
    )
}