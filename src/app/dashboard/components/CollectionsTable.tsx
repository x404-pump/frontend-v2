import { GetCollectionDataResponse } from "@aptos-labs/ts-sdk";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Pagination } from "@nextui-org/pagination";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, SortDescriptor, Selection } from "@nextui-org/table";
import React from "react";
import { useGetCollections } from "@/hooks/aptos/useGetAllCollections";
import { truncateAddress } from "@aptos-labs/wallet-adapter-react";
import { Link } from "@nextui-org/link";

const columns = [
    { name: "Collection Name", uid: "collection_name", sortable: true },
    { name: "Collection Address", uid: "collection_id", sortable: true },
    { name: "Collection Owner", uid: "creator_address", sortable: true },
    { name: "Current Supply", uid: "current_supply", sortable: true },
];

const INITIAL_VISIBLE_COLUMNS = ["collection_name", "collection_id", "creator_address", "current_supply"];

export function CollectionsTable() {
    const [filterValue, setFilterValue] = React.useState("");
    const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({ column: "collection_id", direction: "ascending" });
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const { data: collections = [], isLoading } = useGetCollections(undefined, null, 100);

    const hasSearchFilter = Boolean(filterValue);
    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredCollections = [...collections];

        if (hasSearchFilter) {
            filteredCollections = filteredCollections.filter((collection) => {
                return Object.values(collection).some((value) => {
                    if (typeof value === "string") {
                        return value.toLowerCase().includes(filterValue.toLowerCase());
                    }

                    return false;
                });
            });
        }

        return filteredCollections;
    }, [collections, filterValue]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);


    const sortedItems = React.useMemo(() => {
        return items.sort((a, b) => {
            const aVal = a[sortDescriptor.column as keyof GetCollectionDataResponse];
            const bVal = b[sortDescriptor.column as keyof GetCollectionDataResponse];

            if (aVal < bVal) {
                return sortDescriptor.direction === "ascending" ? -1 : 1;
            }

            if (aVal > bVal) {
                return sortDescriptor.direction === "ascending" ? 1 : -1;
            }

            return 0;
        });
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback((collection: GetCollectionDataResponse, columnKey: React.Key) => {
        const cellValue = collection[columnKey as keyof GetCollectionDataResponse];
        console.log('cellValue', cellValue);
        switch (columnKey) {
            case "collection_name":
                return <p className="max-w-32 break-words">{cellValue}</p>
            case "collection_id":
                return truncateAddress(cellValue);
            case "creator_address":
                return truncateAddress(cellValue);
            case "current_supply":
                return cellValue;
            default:
                return null;
        }
    }, []);

    const onNextPage = React.useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = React.useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);
    const onClear = React.useCallback(() => {
        setFilterValue("");
    }, []);

    const topContent = React.useMemo(() => {
        return (
            <div className="flex items-center justify-between gap-8 w-full">
                <Input
                    radius="full"
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    placeholder="Search..."
                />
                <Button radius={'full'} onClick={onClear}>Clear</Button>
            </div>
        )
    }, [filterValue, onClear]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="secondary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    <Button isDisabled={pages === 1} size="sm" variant="flat" radius="full" onPress={onPreviousPage}>
                        Previous
                    </Button>
                    <Button isDisabled={pages === 1} size="sm" variant="flat" radius="full" onPress={onNextPage}>
                        Next
                    </Button>
                </div>
            </div>
        );
    }, [page, pages, onNextPage, onPreviousPage]);

    return (
        <Table
            aria-label="Collections Table"
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={{
                wrapper: "max-h-screen",
            }}
            fullWidth
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSortChange={setSortDescriptor}
        >
            <TableHeader columns={headerColumns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.uid === "actions" ? "center" : "start"}
                        allowsSorting={column.sortable}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody
                emptyContent={"No collections found"}
                items={sortedItems}
                isLoading={isLoading}
                loadingContent={'Loading...'}
            >
                {(item) => (
                    <TableRow as={Link} key={item.collection_id} href={`../dashboard/collections/${item.collection_id}`} className="hover:bg-foreground-200 cursor-pointer">
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}