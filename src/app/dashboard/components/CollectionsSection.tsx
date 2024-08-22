import { Tabs, Tab } from "@nextui-org/tabs";


import { CollectionsTable } from "./CollectionsTable";

export function CollectionsSection() {
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
