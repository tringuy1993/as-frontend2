import * as React from "react";

import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { buttonUrlsImages } from "./api/MusicData";

// IntroImages component
type IntroImagesProps = {
  selectedGenre?: string;
};

export function GenreImages({ selectedGenre }: IntroImagesProps) {
  const filteredImages = selectedGenre
    ? buttonUrlsImages.filter((item) => item.url.includes(selectedGenre))
    : null; // Fall back to default images if no genre is selected

  // Check if there are any images in the filteredImages array
  if (!filteredImages || filteredImages.length === 0) {
    // Render some fallback UI or return null
    return <div>No image available for this genre.</div>;
  }

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
      {/* ))} */}
    </>
  );
}
