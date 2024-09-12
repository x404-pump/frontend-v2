import { Metadata } from "next";
import dynamic from "next/dynamic";

const DynamicCreateCollectionForm = dynamic(() => import('./components/CreateCollectionForm'), { 
    ssr: false,
        
});
const DynamicHeroSection = dynamic(() => import('./components/HeroSection'), { ssr: false });

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
            <DynamicHeroSection />
            <DynamicCreateCollectionForm />
        </>
    )
}