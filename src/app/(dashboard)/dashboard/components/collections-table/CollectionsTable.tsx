import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Pagination } from "@nextui-org/pagination";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, SortDescriptor, Selection } from "@nextui-org/table";
import React from "react";
import { truncateAddress } from "@aptos-labs/wallet-adapter-react";
import { Link } from "@nextui-org/link";
import { useQuery } from "@tanstack/react-query";
import { Avatar } from "@nextui-org/avatar";
import numeral from "numeral";

import { IX404Collection, getCurrentCollectionsV2 } from "@/fetch-functions/collection";
import { USING_MOCK } from "@/config/contants";
import { mockCollections } from "./mock";

const columns = [
    { name: "Collection", uid: "collection", sortable: false },
    { name: "Owner", uid: "owner", sortable: true },
    { name: "Initial Price", uid: "initial-price", sortable: true },
    { name: "Current Price", uid: "current-price", sortable: true },
    { name: "Supply Remaining", uid: "supply-remaining", sortable: true },
];

const INITIAL_VISIBLE_COLUMNS = ["collection", "owner", "initial-price", "current-price", "supply-remaining"];

export default function CollectionsTable() {
    const [filterValue, setFilterValue] = React.useState("");
    const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({ column: "collection_address", direction: "ascending" });
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    let { data: collections = [], isLoading } = useQuery({
        queryKey: ["collections"],
        queryFn: () => getCurrentCollectionsV2(),
    });

    if (USING_MOCK) {
        collections = mockCollections;
    }

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
            const aVal = a[sortDescriptor.column as keyof IX404Collection];
            const bVal = b[sortDescriptor.column as keyof IX404Collection];

            if (!aVal || !bVal) return 0;

            if (aVal < bVal) {
                return sortDescriptor.direction === "ascending" ? -1 : 1;
            }

            if (aVal > bVal) {
                return sortDescriptor.direction === "ascending" ? 1 : -1;
            }

            return 0;
        });
    }, [sortDescriptor, items]);
    const renderCell = React.useCallback((collection: IX404Collection, columnKey: React.Key) => {
        const cellValue = collection[columnKey as keyof IX404Collection];

        switch (columnKey) {
            case "collection":
                return (
                    <div className="flex items-center flex-row gap-2 min-w-fit min-h-fit">
                        <div className="w-8 h-8">
                            <Avatar
                                src={collection.collection_image}
                                alt={collection.collection_name}
                                radius="full"
                                size="sm"
                                color="primary"
                                showFallback
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <p className="max-w-full break-words text-sm font-semibold capitalize">{collection.collection_name}</p>
                            <p className="text-xs">{truncateAddress(collection.collection_address?.toString())}</p>
                        </div>
                    </div>
                )
            case "owner":
                return <span>{truncateAddress(collection.collection_creator)}</span>;
            case "initial-price":
                return <span>
                    {collection.initial_price ? numeral(collection.initial_price).format("0.0a") : '-'}
                </span>;
            case "current-price":
                return <span>
                    {collection.current_price ? numeral(collection.current_price).format("0.0a") : '-'}
                </span>;
            case "supply-remaining":
                return <span>
                    {collection.supply ? numeral(collection.supply).format("0.0a") : '-'}
                </span>;
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
                    <TableRow as={Link} key={item.collection_address.toString()} href={`../collection/${item.collection_address.toString()}`} className="hover:bg-foreground-200 cursor-pointer">
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}