import GenreSongs, { ClientSongData } from "./[genre]/GenreSongs";

import AudioPlayer from "@/components/Music/audioplayer";
import { useFetchSong } from "./hooks";
import MainLoading from "../loading";

type MusicQueueProps = {
  selectedSong: ClientSongData;
};
const MusicQueue = ({ selectedSong }: MusicQueueProps) => {
  const { playlist, isLoading, error } = useFetchSong(selectedSong);
  console.log("RENDER MUSIQC");
  if (error) {
    console.error("ERROR HERE", error);
    return <div>Error loading song!</div>;
  }

  if (playlist.length == 0 || isLoading) {
    return <MainLoading />;
  }

  return (
    <>
      <AudioPlayer playlist={playlist} />
    </>
  );
};

export default MusicQueue;
