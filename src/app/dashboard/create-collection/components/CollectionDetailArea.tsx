import { Image } from "@nextui-org/image";

interface CollectionDetailAreaProps {
    collectionName?: string;
    description?: string;
    imageSrc?: string;
}

const FieldArea = ({ label, value }: { label: string; value: string }) => {
    return (
        <div className="flex flex-row justify-between gap-4 items-center w-full">
            <span className="text-sm text-default-500">{label}</span>
            <span className="text-base font-semibold text-foreground-900">{value}</span>
        </div>
    );
}

export default function CollectionDetailArea({ collectionName, description, imageSrc }: CollectionDetailAreaProps) {
    const items = [
        {
            label: 'Collection Name',
            value: collectionName,
        },
        {
            label: 'Collection Description',
            value: description,
        }
        
    ];

    return (
        <div
            className="flex flex-col gap-4 items-start w-full"
        >
            <h4 className="text-2xl font-semibold text-foreground-900">Collection Detail</h4>
            {items.map((item, index) => (
                <FieldArea key={index} label={item.label} value={item.value || 'N/A'} />
            ))}
            <Image
                src={imageSrc}
                alt="Collection Image"
                width={"100%"}
                height={'auto'}
                isLoading={!imageSrc}
                className="aspect-video"
                classNames={{
                    wrapper: "w-full rounded-3xl overflow-hidden",
                }}
            />
        </div>
    )
}