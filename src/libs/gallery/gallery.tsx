import { Galleria } from "@/components";
import { ImageData } from "@/types";
import { GALLERY_RESPONSIVE_OPTIONS } from "./constants";
import { Image } from "./components";

export function Gallery({
  images,
  className,
}: {
  images: Array<ImageData>;
  className?: string;
}) {
  const getImage = (image: ImageData) => <Image image={image} type="main" />;
  const getThumbnail = (image: ImageData) => (
    <Image image={image} type="thumbnail" />
  );

  return (
    <Galleria
      value={images}
      responsiveOptions={GALLERY_RESPONSIVE_OPTIONS}
      numVisible={5}
      item={getImage}
      thumbnail={getThumbnail}
      circular
      className={className}
    />
  );
}
