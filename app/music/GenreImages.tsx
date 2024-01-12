import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { buttonUrlsImages } from "./api/MusicData";

// IntroImages component
type IntroImagesProps = {
  selectedGenre?: string;
};

export function GenreImages({ selectedGenre }: IntroImagesProps) {
  const filteredImages = buttonUrlsImages?.filter((item) =>
    item.url.includes(selectedGenre),
  );

  // Access the first image directly as we expect only one image
  const image = filteredImages[0].image;
  return (
    <>
      {/* {filteredImages.map((image, index) => ( */}
      <AspectRatio ratio={10 / 10} className="z-[1]">
        <Image
          src={image}
          alt={image}
          fill={true}
          sizes="100vw, 100vw, 100vw"
          className="h-full w-full object-cover"
          // priority={true}
          blurDataURL="/static/cover-arts/1950s.jpg"
        />
      </AspectRatio>
    </>
  );
}
