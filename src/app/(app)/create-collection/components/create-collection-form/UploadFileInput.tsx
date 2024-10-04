'use client';

import { Button } from '@nextui-org/button';
import { InputProps } from '@nextui-org/input';
import { Tooltip } from '@nextui-org/tooltip';
import clsx from 'clsx';
import numeral from 'numeral';
import React, { useRef, useState } from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { Files02Icon } from 'hugeicons-react';

import { loadFile } from '../utils';
import { useCollectionMetadata } from './context';
import { getCollectionFromFiles } from '@/utils/assetUploader';
import CollectionDetailArea from './CollectionDetailArea';

interface UploadFileInputProps extends InputProps {
    isUploading: boolean;
    account: string | null;
    files: FileList | null;
    setFiles: React.Dispatch<React.SetStateAction<FileList | null>>;
}

const truncateName = (name: string, length: number) => {
    if (name.length > length) {
        return `${name.slice(0, length)}...`;
    }

    return name;
}

const FileCard: React.FC<{ file: File, onDelete: (file: File) => void }> = ({ file, onDelete }) => {
    return (
        <div className='bg-foreground-100 rounded-lg flex flex-row items-center justify-between px-4 py w-full h-fit gap-2'>
            <Tooltip content={file.name} placement='top'>
                <h4 className='text-xs font-medium text-foreground-900 cursor-pointer w-full overflow-hidden'>
                    {truncateName(file.name, 20)}
                </h4>
            </Tooltip>
            <p className='text-xs text-default-500 w-fit'>{numeral(file.size).format('0.0b')}</p>
            <Button
                radius='full'
                color='default'
                variant='light'
                isIconOnly
                onClick={() => onDelete(file)}
                startContent={
                    <MdDeleteOutline size={24} />
                }
            />
        </div>
    );
};

const UploadFileInput: React.FC<UploadFileInputProps> = ({ isUploading, account, files, setFiles, ...inputProps }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);
    const { setCollectionMetadata } = useCollectionMetadata();

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.currentTarget.files;

        if (fileList) {
            try {
                await loadFile(fileList); // Validate files
                setFiles(fileList); // Set files if valid
                setError(null); // Clear any previous errors

                const fileData = await getCollectionFromFiles(fileList);

                setCollectionMetadata({
                    name: fileData.collectionMetadata.name,
                    image: fileData.collectionCover,
                    description: fileData.collectionMetadata.description,
                    symbol: fileData.collectionMetadata.fa_symbol,
                    supply: fileData.collectionMetadata.supply.toString(),
                });

            } catch (err: any) {
                setError(err.message); // Set error message
            }
        }
    };

    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleDeleteFile = (fileToDelete: File) => {
        if (files) {
            const updatedFiles = Array.from(files).filter(file => file !== fileToDelete);
            const dataTransfer = new DataTransfer();

            updatedFiles.forEach(file => dataTransfer.items.add(file));
            setFiles(dataTransfer.files);
            setCollectionMetadata(null);
        }
    };

    return (
        <div
            className={clsx(
                'flex flex-col gap-4 items-center justify-center w-full h-fit py-4',
            )}
        >
            <div className='flex flex-col items-center justify-center w-full h-fit'>
                <h6 className='text-lg font-semibold text-foreground-900'>Upload metadata</h6>
                <p className='text-sm font-normal text-foreground-500 text-center'>
                    Drag & drop or click to choose files
                </p>
            </div>
            <div
                className='w-full h-fit flex flex-row items-center justify-center gap-4 rounded-medium p-2'
            >
                <input
                    ref={inputRef}
                    id="upload"
                    disabled={isUploading || !account}
                    multiple
                    type="file"
                    /* @ts-expect-error */
                    webkitdirectory="true"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                    {...inputProps}
                />
                <Button
                    className='border-foreground-200 justify-between px-2 py-1 h-fit '
                    variant='bordered'
                    radius='sm'
                    size='sm'
                    fullWidth
                    endContent={<Files02Icon size={20} />}
                    disabled
                >
                    Upload to see draft
                </Button>
                <Button
                    className='bg-foreground-900 text-foreground-100 w-full'
                    radius='sm'
                    size='sm'
                    isIconOnly
                    fullWidth
                    onClick={handleClick}
                >
                    Upload
                </Button>
            </div>
            <CollectionDetailArea />
            {error && <p className='text-red-500'>{error}</p>}
        </div>
    );
};

export default UploadFileInput;