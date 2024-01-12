import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ANSWER_URL } from "@/lib/fetchdata/apiURLs";
import useCustomSWR from "@/lib/fetchdata/fetch-custom";
import { useEffect, useState } from "react";

export type genreType = {
  genre: string;
};

type RawSongData = {
  index: number;
  artist: string;
  song: string;
};

export type ClientSongData = {
  song_number: number;
  artist: string;
  title: string;
  genre: string;
};

type SongData = {
  index: number;
  artist: string;
  song: string;
};

interface GenreSongsProps {
  params: genreType; // Adjust based on actual structure
  setSelectedSong: (selection: ClientSongData) => void;
}

interface SongContentsProps {
  song: RawSongData;
  handleOnClick: (song: RawSongData) => void;
  isSelected: boolean;
}
//https://medium.com/@adityakrshnn/adding-audio-visualizers-to-your-website-in-5-minutes-23985d2b1245
//https://codepen.io/adityakrshnn/pen/abQvNBp
const GenreSongs = ({ params, setSelectedSong }: GenreSongsProps) => {
  const { data } = useCustomSWR(ANSWER_URL, params);

  //Hilight selected song
  const [selectedSongIndex, setSelectedSongIndex] = useState<number | null>(
    null,
  );

  useEffect(() => {
    setSelectedSongIndex(null);
  }, [params]);

  const handleSongClick = (songObj: SongData) => {
    const { song, index, artist } = songObj;
    setSelectedSongIndex(index);
    setSelectedSong({
      title: song,
      song_number: index,
      artist: artist,
      genre: params.genre,
    });
  };
  const songButtons = data
    ? data.map((song: SongData) => {
        return (
          <SongContents
            key={song.index}
            song={song}
            isSelected={selectedSongIndex === song.index}
            handleOnClick={handleSongClick}
          />
        );
      })
    : null;
  return <>{songButtons}</>;
};

const SongContents = ({
  song,
  handleOnClick,
  isSelected,
}: SongContentsProps) => {
  const cardClass = isSelected ? "bg-primary" : ""; // Add a class if selected
  return (
    <>
      <Card
        onClick={() => handleOnClick(song)}
        className={`hover:bg-secondary bg-transparent cursor-pointer ${cardClass}`}
      >
        <CardHeader>
          <CardTitle>{song.song}</CardTitle>
          <CardDescription>By: {song.artist}</CardDescription>
        </CardHeader>
      </Card>
      <br></br>
    </>
  );
};

export default GenreSongs;
