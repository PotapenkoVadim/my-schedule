import { ImageData } from "@/types";
import { Image as BaseImage } from "@/components";
import styles from "./image.module.scss";

export function Image({
  type,
  image,
}: {
  type: "thumbnail" | "main";
  image: ImageData;
}) {
  const isThumbnail = type === "thumbnail";
  const classes = isThumbnail ? styles.image__thumbnail : styles.image;
  const source = isThumbnail ? image.thumbnail.src : image.image.src;

  return (
    <BaseImage
      width="100%"
      className={classes}
      src={source}
      alt={image.alt}
      preview={!isThumbnail}
    />
  );
}
