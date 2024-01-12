import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ANSWER_URL } from "@/lib/fetchdata/apiURLs";
import useCustomSWR from "@/lib/fetchdata/fetch-custom";

export type genreType = {
  genre: string;
};

export type SongData = {
  index?: number;
  song_number?: number;
  song?: string;
  title?: string;
  artist: string;
  genre: string;
};

interface GenreSongsProps extends React.HTMLAttributes<HTMLDivElement> {
  genre: genreType; // Adjust based on actual structure
  handleSelectedSongClick: (selection: SongData) => void;
}

//https://medium.com/@adityakrshnn/adding-audio-visualizers-to-your-website-in-5-minutes-23985d2b1245
//https://codepen.io/adityakrshnn/pen/abQvNBp
const GenreSongs = ({
  genre,
  handleSelectedSongClick,
  ...props
}: GenreSongsProps) => {
  const { data } = useCustomSWR(ANSWER_URL, genre);
  const songButtons = data?.map((song: SongData) => {
    // const cardClass = isSelected ? "bg-primary" : ""; // Add a class if selected
    const cardClassName = `hover:bg-secondary bg-transparent cursor-pointer ${
      props.className || ""
    }`;
    return (
      <div key={song.index}>
        <Card
          onClick={() =>
            handleSelectedSongClick({ ...song, genre: genre.genre })
          }
          className={cardClassName}
        >
          <CardHeader>
            <CardTitle>{song.song}</CardTitle>
            <CardDescription>By: {song.artist}</CardDescription>
          </CardHeader>
        </Card>
        <br></br>
      </div>
    );
  });

  return <>{songButtons}</>;
};

export default GenreSongs;
