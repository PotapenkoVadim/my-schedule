import { StaticImageData } from "next/image";

export type ImageData = {
  image: StaticImageData;
  thumbnail: StaticImageData;
  alt: string;
};
