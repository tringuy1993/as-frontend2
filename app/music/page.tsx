"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GenreImages } from "./GenreImages";
import { ScrollArea } from "@/components/ui/scroll-area";
import GenreSongs, { ClientSongData, genreType } from "./[genre]/GenreSongs";
import MusicQueue from "./MusicQueue";
import GenreButtons from "./GenreButtons";

import Image from "next/image";
import { buttonUrlsImages } from "./api/MusicData";

const INITIAL = {
  genre: "/1950",
  song_number: 1,
  title: "Come Fly With Me",
  artist: "Frank Sinatra",
};

export default function PageMusic() {
  const [genre, setGenre] = useState<genreType>({ genre: "1950" });

  const [selectedSong, setSelectedSong] = useState<ClientSongData>(INITIAL);

  const handleUpdateGenre = (newGenre: genreType) => {
    setGenre(newGenre);

    //Remove Song from MusicQueue playlist
    setSelectedSong({});
  };

  const filteredImages = genre.genre
    ? buttonUrlsImages.filter((item) => item.url.includes(genre.genre))
    : null; // Fall back to default images if no genre is selected

  const img = filteredImages[0].image;
  console.log(img);
  return (
    <div
      style={{
        transition: "margin 0.3s ease-in-out",
      }}
      className="mx-2 lg:mx-10 xl:mx-40 2xl:mx-80"
    >
      <img
        src={img}
        alt={"music background"}
        className="absolute inset-0 h-full w-full object-cover z-[0] opacity-25"
        style={{
          transition: "margin 0.5s ease-in-out",
        }}
      />
      <div className="absolute inset-0 z-[1] backdrop-blur-md"></div>
      <div className="flex gap-2 m-2 bg-transparent">
        <section className="grow-0 flex flex-col justify-center z-[1] text-center">
          Genre
          <GenreButtons handleUpdateGenre={handleUpdateGenre} />
        </section>
        <section className="grow-0 z-[1]">
          <Card className="flex flex-col border-transparent bg-transparent">
            <CardTitle className="text-center">Songs</CardTitle>
            <CardContent className="flex-1 overflow-hidden p-0">
              {" "}
              <ScrollArea
                className="h-full"
                style={{ height: "calc(100vh - 7rem)" }}
              >
                <div className="p-4 space-y-1">
                  <GenreSongs
                    params={genre}
                    setSelectedSong={setSelectedSong}
                  />
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </section>
        <section className="grow flex flex-col justify-center">
          <div className="flex flex-col items-center z-[1]">
            {genre && <h2>{genre.genre} queued up!</h2>}
            <div className="w-[450px] overflow-hidden rounded-full shadow-[0_2px_10px]">
              <GenreImages selectedGenre={genre.genre} />
            </div>
          </div>
          <div className="z-[1]">
            {" "}
            {Object.keys(selectedSong).length > 0 && (
              <MusicQueue selectedSong={selectedSong} />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
