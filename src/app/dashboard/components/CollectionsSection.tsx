import { Tabs, Tab } from "@nextui-org/tabs";
import dynamic from "next/dynamic";

const CollectionsTable = dynamic(() => import("./CollectionsTable"));

export default function CollectionsSection() {
    return (
        <section className="w-full mt-8">
            <Tabs
                variant="light"
                radius="full"
            >
                <Tab
                    key={'collections'}
                    title={'Collections'}
                >
                    <CollectionsTable />
                </Tab>
                <Tab
                    key={'nfts'}
                    title={'Nfts'}
                 />
            </Tabs>
        </section>
    )
}
