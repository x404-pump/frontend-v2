export function getPrimaryColor(src: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.crossOrigin = "Anonymous"; // This is necessary if the image is from a different origin
        img.src = src;

        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            if (!ctx) {
                reject("Failed to get canvas context");

                return;
            }

            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);

            const imageData = ctx.getImageData(0, 0, img.width, img.height);
            const data = imageData.data;

            const colorCount: { [key: string]: number } = {};
            let maxCount = 0;
            let primaryColor = "";

            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                const a = data[i + 3];

                // Ignore fully transparent pixels
                if (a === 0) continue;

                const color = `${r},${g},${b}`;

                if (colorCount[color]) {
                    colorCount[color]++;
                } else {
                    colorCount[color] = 1;
                }

                if (colorCount[color] > maxCount) {
                    maxCount = colorCount[color];
                    primaryColor = color;
                }
            }

            resolve(`rgb(${primaryColor})`);
        };

        img.onerror = () => {
            reject("Failed to load image");
        };
    });
}