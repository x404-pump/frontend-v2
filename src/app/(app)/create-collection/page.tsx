import { Metadata } from "next";
import dynamic from "next/dynamic";

const CreateCollectionForm = dynamic(() => import('./components/create-collection-form'));

export const metadata: Metadata = {
    title: {
        default: 'Create Collection',
        template: `%s - X404`,
    },
    description: 'Create a collection with X404',
    icons: {
        icon: "/favicon.ico",
    },
};

function Page() {

    return (
        <>
            <CreateCollectionForm />
        </>
    )
}
export default dynamic(() => Promise.resolve(Page));