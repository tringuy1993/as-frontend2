"use client";

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
  const slides = ImageData.map((img) => (
    <CarouselItem key={img.image}>
      <div className="">
        <Card>
          <CardContent className="flex aspect-square items-center justify-center p-6">
            <span className="text-4xl font-semifold">
              <Image
                fill={true}
                src={img.image}
                alt={img.title}
                priority={img.priority}
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </span>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  ));
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {ImageData.map((image, index) => (
          <CarouselItem key={index}>
            <div>{image.image}</div>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span></span>
                  <Image
                    src={image.image}
                    alt={image.image}
                    layout="fill" // Adjust layout as needed
                    objectFit="cover" // Adjust object fit as needed
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
        {/* {ImageData.map((data, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <Image
                    fill={true}
                    src={data.image}
                    alt={data.title}
                    priority={data.priority}
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))} */}
        {/* <CarouselItem key={1}>
          <div className="p-1">
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <Image
                  fill={true}
                  src={ImageData[0].image}
                  alt={ImageData[0].title}
                  priority={ImageData[0].priority}
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
        <CarouselItem key={2}>
          <div className="p-1">
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <Image
                  fill={true}
                  src={ImageData[1].image}
                  alt={ImageData[1].title}
                  priority={ImageData[1].priority}
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </CardContent>
            </Card>
          </div>
        </CarouselItem> */}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
