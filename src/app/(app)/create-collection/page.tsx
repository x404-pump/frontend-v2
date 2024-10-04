import { Metadata } from "next";
import CreateCollectionForm from "./components/create-collection-form";


export const metadata: Metadata = {
    title: "Create collection",
    description: 'Create a collection with X404',
    keywords: 'create collection, X404, NFT',
    icons: {
        icon: "/favicon.ico",
    },
};

export default async function Page() {
    return (
        <div className="w-full h-full overflow-auto hidden-scrollbar">
            <CreateCollectionForm />
        </div>
    )
}