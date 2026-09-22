export interface CompressedImageResult {
  file: File;
  previewUrl: string;
  width: number;
  height: number;
  aspectRatio: 'portrait' | 'landscape' | 'square';
  originalSizeKb: number;
  compressedSizeKb: number;
}

/**
 * Mengompresi file foto sebelum diunggah ke Cloudflare R2 / Storage
 * - Mengubah format ke WebP berkualitas tinggi
 * - Membatasi dimensi maksimum (default 2400px untuk resolusi retina/4K)
 * - Otomatis mendeteksi orientasi rasio (portrait / landscape / square)
 */
export async function compressImage(
  file: File,
  maxDimension = 2400,
  quality = 0.88
): Promise<CompressedImageResult> {
  return new Promise((resolve, reject) => {
    const originalSizeKb = Math.round(file.size / 1024);
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      let { width, height } = img;

      // Tentukan Aspect Ratio
      let aspectRatio: 'portrait' | 'landscape' | 'square' = 'landscape';
      const ratio = width / height;
      if (ratio > 1.1) {
        aspectRatio = 'landscape';
      } else if (ratio < 0.9) {
        aspectRatio = 'portrait';
      } else {
        aspectRatio = 'square';
      }

      // Hitung dimensi baru jika melebihi batas maksimum
      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Gagal menginisialisasi canvas context'));
        return;
      }

      // Gambar dengan rendering halus
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      // Ekspor ke format WebP
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Gagal mengonversi gambar ke WebP'));
            return;
          }

          const baseName = file.name.replace(/\.[^/.]+$/, '');
          const newFileName = `${baseName}.webp`;
          const compressedFile = new File([blob], newFileName, {
            type: 'image/webp',
            lastModified: Date.now(),
          });

          const compressedSizeKb = Math.round(compressedFile.size / 1024);
          const previewUrl = URL.createObjectURL(compressedFile);

          resolve({
            file: compressedFile,
            previewUrl,
            width,
            height,
            aspectRatio,
            originalSizeKb,
            compressedSizeKb,
          });
        },
        'image/webp',
        quality
      );
    };

    img.onerror = (err) => {
      URL.revokeObjectURL(objectUrl);
      reject(err);
    };

    img.src = objectUrl;
  });
}
