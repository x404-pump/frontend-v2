'use client';

import { Button } from '@nextui-org/button';
import { InputProps } from '@nextui-org/input';
import { Tooltip } from '@nextui-org/tooltip';
import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { TiUpload } from "react-icons/ti";
import { loadFile } from './utils';

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
        <div className='bg-foreground-200 rounded-lg flex flex-row items-center justify-between px-4 py w-full h-fit gap-2'>
            <Tooltip content={file.name} placement='top'>
                <h4 className='text-xs font-medium text-foreground-900 cursor-pointer w-full overflow-hidden'>
                    {truncateName(file.name, 20)}
                </h4>
            </Tooltip>
            <p className='text-xs text-default-500'>{file.size} bytes</p>
            <Button
                radius='full'
                color='danger'
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

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.currentTarget.files;

        if (fileList) {
            try {
                await loadFile(fileList); // Validate files
                setFiles(fileList); // Set files if valid
                setError(null); // Clear any previous errors
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
        }
    };

    return (
        <div
            className={clsx(
                'flex flex-col gap-4 items-center justify-center w-full min-w-fit max-w-sm',
                'p-4 rounded-3xl bg-foreground-100 border border-default/25'
            )}
        >
            <TiUpload size={48} className='text-secondary' />
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
            <h3 className='text-base font-normal text-foreground-900'>
                Upload your metadata file
            </h3>
            {error && <p className='text-red-500'>{error}</p>}
            {files && (
                <div className='w-full flex flex-col gap-2 items-start h-fit overflow-scroll'>
                    {Array.from(files).map((file) => (
                        <FileCard key={file.name} file={file} onDelete={handleDeleteFile} />
                    ))}
                </div>
            )}
            <Button
                onClick={handleClick}
                disabled={isUploading || !account}
                fullWidth
                radius='md'
                color='secondary'
                className='bg-yellow-500'
            >
                Upload Files
            </Button>
        </div>
    );
};

export default UploadFileInput;