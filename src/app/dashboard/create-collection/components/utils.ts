export const loadFile = async (fileList: FileList) => {
    const VALID_MEDIA_EXTENSIONS = ["png", "jpg", "jpeg", "gltf"];
    const files: File[] = [];

    for (let i = 0; i < fileList.length; i++) {
        files.push(fileList[i]);
    }

    const collectionFiles = files.filter((file) => file.name.includes("collection"));

    if (collectionFiles.length !== 2) {
        throw new Error("Please make sure you include both collection.json and collection image file");
    }

    // Check collection.json file exists
    const collectionMetadata = collectionFiles.find((file) => file.name === "collection.json");

    if (!collectionMetadata) {
        throw new Error("Collection metadata not found, please make sure you include collection.json file");
    }

    const collectionCover = collectionFiles.find((file) =>
        VALID_MEDIA_EXTENSIONS.some((ext) => file.name.endsWith(`.${ext}`)),
    );

    if (!collectionCover) {
        throw new Error("Collection cover not found, please make sure you include the collection image file");
    }

    const mediaExt = collectionCover?.name.split(".").pop();

    if (!collectionCover) {
        throw new Error("Collection cover not found, please make sure you include the collection image file");
    }

    // Check nft metadata json files exist
    const nftImageMetadatas = files.filter((file) => file.name.endsWith("json") && file.name !== "collection.json");

    if (nftImageMetadatas.length === 0) {
        throw new Error("Image metadata not found, please make sure you include the NFT json files");
    }

    // Check NFT image files exist
    const imageFiles = files.filter((file) => file.name.endsWith(`.${mediaExt}`) && file.name !== collectionCover.name);

    if (imageFiles.length === 0) {
        throw new Error("Image files not found, please make sure you include the NFT image files");
    }

    // Check nft metadata json files amount is the same as the nft image files
    if (nftImageMetadatas.length !== imageFiles.length) {
        throw new Error("Mismatch between NFT metadata json files and images files");
    }

    // Calculate total files cost to upload to Irys
    const totalFileSize =
        collectionCover.size +
        collectionMetadata.size +
        imageFiles.reduce((acc, file) => acc + file.size, 0) +
        nftImageMetadatas.reduce((acc, file) => acc + file.size, 0);

    // Check total file size doesn't exceed 2GB due to a Browse constraints
    const GIGABYTE = Math.pow(1024, 3);
    const MAX_SIZE = 2 * GIGABYTE;

    if (totalFileSize > MAX_SIZE) {
        throw new Error("Files size should not exceed 2GB");
    }

    for (const file of files) {
        if (file.name === 'collection.json') {
            const reader = new FileReader();

            reader.onload = (event) => {
                if(!event.target) return;
                try {
                    if (typeof event.target.result === "string") {
                        const jsonData = JSON.parse(event.target.result);

                        console.log(jsonData);
                    }
                } catch (error: Error | any) {
                    alert('Error reading collection.json: ' + error.message);
                }
            };
            reader.readAsText(file);
        }
    }

    return files;
};