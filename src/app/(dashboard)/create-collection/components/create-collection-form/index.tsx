'use client'
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { CollectionMetadataProvider } from './context';


const CreateCollectionForm = dynamic(() => import('./CreateCollectionForm'), {
    ssr: false,
});
const FormHeader = dynamic(() => import('./FormHeader'))
const CollectionDetailArea = dynamic(() => import('./CollectionDetailArea'))

function FormSection() {
    return (
        <CollectionMetadataProvider>
            <section className={clsx(
                'flex flex-col lg:flex-row gap-8 items-start lg:justify-center min-w-fit w-full h-full lg:px-16',
                'my-auto'
            )}>
                <div className='my-auto h-full w-full lg:min-w-fit lg:h-fit lg:justify-center flex flex-col gap-4 lg:max-w-fit box-border'>
                    <FormHeader />
                    <CreateCollectionForm />
                </div>
                <div className="h-full w-full" >
                    <CollectionDetailArea className='hidden lg:flex'/>
                </div>
            </section>
        </CollectionMetadataProvider>
    )
}
export default dynamic(() => Promise.resolve(FormSection), { ssr: false });