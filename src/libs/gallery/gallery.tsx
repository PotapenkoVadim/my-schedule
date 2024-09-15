import { Galleria } from "@/components";
import { ImageData, ThemeVariant } from "@/types";
import { GALLERY_RESPONSIVE_OPTIONS } from "./constants";
import { Image } from "./components";

export function Gallery({
  images,
  className,
  theme,
}: {
  images: Array<ImageData>;
  theme: ThemeVariant;
  className?: string;
}) {
  const getImage = (image: ImageData) => <Image image={image} type="main" />;
  const getThumbnail = (image: ImageData) => (
    <Image image={image} type="thumbnail" />
  );

  return (
    <Galleria
      data-theme={theme}
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
