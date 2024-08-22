interface CollectionDetailAreaProps {
    collectionName?: string;
    description?: string;
}

const FieldArea = ({ label, value }: { label: string; value: string }) => {
    return (
        <div className="flex flex-row justify-between gap-4 items-center w-full">
            <span className="text-sm text-default-500">{label}</span>
            <span className="text-base font-semibold text-foreground-900">{value}</span>
        </div>
    );
}

export default function CollectionDetailArea({ collectionName, description }: CollectionDetailAreaProps) {
    return (
        <div
            className="flex flex-col gap-4 items-start w-full"
        >
            <h4 className="text-lg font-bold text-foreground-900">Collection Detail</h4>
            <FieldArea label="Collection Name" value={collectionName || "N/A"} />
            <FieldArea label="Description" value={description || "N/A"} />
        </div>
    )
}