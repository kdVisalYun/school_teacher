const libheif = require("libheif-js/wasm-bundle");

const convert = async (picture: File): Promise<File | undefined> => {
  const buffer = new Uint8Array(await picture.arrayBuffer());
  const decoder = new libheif.HeifDecoder();
  const data = decoder.decode(buffer);
  const image = data[0];
  const width = image.get_width();
  const height = image.get_height();

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) return undefined;
  const imageData = context.createImageData(width, height);
  await new Promise<void>((resolve, reject) => {
    image.display(imageData, (displayData: ImageData) => {
      if (!displayData) {
        return reject(new Error("HEIF processing error"));
      }
      resolve();
    });
  });
  context.putImageData(imageData, 0, 0);
  const file = await getImageFile(canvas, picture.name);
  return file;
};

const getImageFile = (
  canvas: HTMLCanvasElement,
  fileName: string
): Promise<File> => {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) return;
      const convertedFile = new File([blob], fileName, {
        type: "image/jpeg",
        lastModified: Date.now(),
      });
      resolve(convertedFile);
    });
  });
};

export { convert };
