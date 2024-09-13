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

export default function Page() {
    return (
        <>
            <CreateCollectionForm />
        </>
    )
}