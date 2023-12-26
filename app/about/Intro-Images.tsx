import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

type data = {
  image: string;
  title: string;
  category: string;
  link: string;
  priority: boolean;
};
const ImageData = [
  {
    image: "/static/images/Me.jpg",
    title: "Pattaya, Thailand",
    category: "Nature",
    link: "https://www.pattayaelephantsanctuary.org/",
    priority: true,
  },
  {
    image: "/static/images/Me2.jpg",
    title: "Hawaii, US",
    category: "Nature",
    link: "https://wailuaheritagetrail.org/",
    priority: false,
  },
  {
    image: "/static/images/Me3.jpg",
    title: "Houston, US",
    category: "Nature",
    link: "https://spacecenter.org/",
    priority: false,
  },
  {
    image: "/static/images/Me4.jpg",
    title: "Alaska, US",
    category: "Nature",
    link: "https://goo.gl/maps/a8qpZHfNtGJgpyGo9",
    priority: false,
  },
];

export function IntroImages() {
  return (
    <Carousel className="w-4/5">
      <CarouselContent>
        {ImageData.map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-1 relative">
              <Card>
                <CardContent className=" flex  items-center justify-center p-1">
                  <AspectRatio ratio={650 / 450} className="bg-muted">
                    <Image
                      src={image.image}
                      alt={image.image}
                      fill
                      className="rounded-lg object-cover"
                    />
                  </AspectRatio>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
