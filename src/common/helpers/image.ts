import Resizer from "react-image-file-resizer";

interface ResizeImageProps {
  imageToResize: any;
  onImageResized: (image: any) => void;
  width: number;
  height: number;
  type?: string;
}

export async function ResizeImage(props: ResizeImageProps) {
  const { imageToResize, type = "JPEG", onImageResized, width, height } = props;

  await Resizer.imageFileResizer(
    imageToResize,
    width,
    height,
    type,
    100,
    0,
    async (uri) => {
      await onImageResized(uri);
    },
    "file"
  );
}
