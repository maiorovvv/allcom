import imageCompression from 'browser-image-compression';

interface ResizeAndCompressImageOptions {
	file: File;
	maxWidth: number;
	maxHeight: number;
	maxSizeMB: number;
}
const BYTES_PER_MB = 1024 * 1024;

async function resizeAndCompressImage({
	file,
	maxWidth,
	maxHeight,
	maxSizeMB,
}: ResizeAndCompressImageOptions): Promise<File> {
	try {
		const compressedFile = await imageCompression(file, {
			maxSizeMB,
			maxWidthOrHeight: Math.max(maxWidth, maxHeight),
			useWebWorker: true,
		});

		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		if (!ctx) {
			throw new Error('Unable to get canvas context');
		}
		canvas.width = maxWidth;
		canvas.height = maxHeight;

		const img = new Image();
		img.src = URL.createObjectURL(compressedFile);

		return await new Promise((resolve, reject) => {
			img.onload = () => {
				// Fill the background with white
				ctx.fillStyle = '#fff';
				ctx.fillRect(0, 0, maxWidth, maxHeight);

				// Calculate dimensions to maintain aspect ratio
				const scale = Math.min(maxWidth / img.width, maxHeight / img.height);
				const x = (maxWidth - img.width * scale) / 2;
				const y = (maxHeight - img.height * scale) / 2;
				ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

				canvas.toBlob(
					(blob) => {
						if (blob && blob.size <= maxSizeMB * BYTES_PER_MB) {
							resolve(
								new File([blob], file.name, { type: 'image/jpeg', lastModified: Date.now() })
							);
						} else {
							reject(new Error('The file is too large after processing.'));
						}
					},
					'image/jpeg',
					1
				);
			};

			img.onerror = () => {
				reject(new Error('Error loading the image.'));
			};
		});
	} catch (error) {
		if (error instanceof Error) {
			throw new Error('Error processing the image: ' + error.message);
		} else {
			throw new Error('Error processing the image');
		}
	}
}

export default resizeAndCompressImage;
