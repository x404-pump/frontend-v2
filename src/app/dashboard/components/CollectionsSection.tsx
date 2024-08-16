import { Tabs, Tab } from "@nextui-org/tabs";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from "@nextui-org/table";
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
                >
                </Tab>
            </Tabs>
        </section>
    )
}
