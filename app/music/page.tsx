"use client";
import React, { useState } from "react";
import { buttonUrls } from "./api/MusicData";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
// import { useStyles } from "./styles";

// import { Card, Group, Button, Text } from "@mantine/core";
// import GenreView2 from "./[genre]/GenreView";
type genreType = {
  genre: string;
};

export default function PageMusic() {
  const [genre, setGenre] = useState<genreType>();
  // //https://nextjs.org/docs/pages/api-reference/components/link
  const handleGenreClick = (genreText: string): void => {
    const musicPath = `${genreText.replace("/MusicGame/", "")}`;
    setGenre({ genre: musicPath });
  };
  const urlButtons = buttonUrls.map((buttonText, index) => {
    const isDisabled =
      buttonText === "/MusicGame/TV" || buttonText === "/MusicGame/Films";
    if (buttonText === "/MusicGame/Gay Icons") {
      buttonText = "/MusicGame/GayIcons";
    } else if (buttonText === "/MusicGame/Hip Hop") {
      buttonText = "/MusicGame/HipHop";
    }
    return (
      <Button
        key={index}
        disabled={isDisabled}
        className=""
        onClick={() => handleGenreClick(buttonText)}
      >
        {buttonText.replace("/MusicGame/", "")}
      </Button>
    );
  });
  return (
    <>
      <div className="">
        <h1 className="text-align=center">Select Your Type of Music!</h1>
        {genre && <h2>{genre.genre} queued up!</h2>}
      </div>

      <Card>
        {/* Display All the Type/Genre of music. */}
        <div>{urlButtons}</div>
      </Card>
      <br></br>
      {/* {genre && <GenreView2 params={genre} />} */}
    </>
  );
}
