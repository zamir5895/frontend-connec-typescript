// src/utils/cropImage.ts
import Cropper from 'react-easy-crop';
import { Area } from 'react-easy-crop';

export const getCroppedImg = (file: File, cropAreaPixels: Area): Promise<string> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        return reject(new Error("No se pudo crear el contexto"));
      }

      canvas.width = cropAreaPixels.width;
      canvas.height = cropAreaPixels.height;

      ctx.drawImage(
        image,
        cropAreaPixels.x,
        cropAreaPixels.y,
        cropAreaPixels.width,
        cropAreaPixels.height,
        0,
        0,
        cropAreaPixels.width,
        cropAreaPixels.height
      );

      canvas.toBlob((blob) => {
        if (!blob) {
          return reject(new Error("Error al recortar la imagen"));
        }
        resolve(URL.createObjectURL(blob));
      }, "image/jpeg");
    };
  });
};
