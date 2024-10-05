"use client"

import clsx from 'clsx';

import CreateCollectionForm from './create-collection-form';
import FormHeader from './create-collection-form/FormHeader';

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
        </section>
    )
}