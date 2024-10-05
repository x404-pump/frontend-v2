"use client"
import clsx from 'clsx';

import { CollectionMetadataProvider } from './context';
import CreateCollectionForm from './CreateCollectionForm';
import FormHeader from './FormHeader';



export default function FormSection() {
    return (
        <CollectionMetadataProvider>
            <section className={clsx(
                'flex flex-col lg:flex-row gap-8 items-center justify-center min-w-fit w-full h-full lg:px-16',
                'my-auto mx-auto'
            )}>
                <div className='my-auto h-full w-full lg:h-fit lg:justify-center flex flex-col gap-4 lg:max-w-96'>
                    <FormHeader />
                    <CreateCollectionForm />
                </div>
            </section>
        </CollectionMetadataProvider>
    )
}