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
                'flex flex-col md:flex-row gap-8 items-start md:justify-center w-full h-full px-16',
                'my-auto'
            )}>
                <div className='my-auto h-full w-full  md:w-fit md:h-fit justify-center flex flex-col gap-4 md:max-w-fit box-border'>
                    <FormHeader />
                    <CreateCollectionForm />
                </div>
                <div className="h-full w-full" >
                    <CollectionDetailArea />
                </div>
            </section>
        </CollectionMetadataProvider>
    )
}
export default dynamic(() => Promise.resolve(FormSection), { ssr: false });