import { Button } from "@/components/ui/button";
import { buttonUrls } from "./api/MusicData";

export default function GenreButtons({ handleUpdateGenre }) {
  const handleGenreClick = (genreText: string): void => {
    const musicPath = `${genreText.replace("/MusicGame/", "")}`;
    handleUpdateGenre({ genre: musicPath });
  };
  const urlGenreButtons = buttonUrls.map((buttonText, index) => {
    const isDisabled = buttonText === "/MusicGame/TV";
    // || buttonText === "/MusicGame/Films";
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

  return <>{urlGenreButtons}</>;
}
