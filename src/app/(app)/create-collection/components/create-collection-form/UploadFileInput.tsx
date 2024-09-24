'use client';

import { Button } from '@nextui-org/button';
import { InputProps } from '@nextui-org/input';
import { Tooltip } from '@nextui-org/tooltip';
import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { loadFile } from '../utils';
import { Upload04Icon } from 'hugeicons-react';
import { useCollectionMetadata } from './context';
import { getCollectionFromFiles } from '@/utils/assetUploader';
import BlurIcon from '@/components/blur-icon';
import numeral from 'numeral';

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
                variant='light'z
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
                console.log('fileData', fileData);
                setCollectionMetadata({
                    name: fileData.collectionMetadata.name,
                    image: fileData.collectionCover,
                    description: fileData.collectionMetadata.description,
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
                'flex flex-col gap-4 items-start justify-center w-full h-fit',
                'p-4 rounded-3xl bg-foreground-50 border border-default/25'
            )}
        >   <h6 className='text-lg font-semibold text-foreground-900'>Upload metadata</h6>
            <div
                className='w-full h-fit flex flex-col items-center justify-center gap-4 rounded-3xl p-4 cursor-pointer'
                role="button"
                tabIndex={0}
                onClick={handleClick}
            >
                <BlurIcon
                    icon={<Upload04Icon size={16} />}
                    classNames={{
                        blur: 'bg-primary',
                    }}
                />
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
                <h3 className='text-sm font-normal text-foreground-500 text-center'>
                    Drag & drop or click to choose files
                </h3>
            </div>
            {error && <p className='text-red-500'>{error}</p>}
            {files && (
                <div className='w-full flex flex-col gap-2 items-start h-fit overflow-scroll max-h-[64px]'>
                    {Array.from(files).map((file) => (
                        <FileCard key={file.name} file={file} onDelete={handleDeleteFile} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default UploadFileInput;