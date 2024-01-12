import { Button } from "@/components/ui/button";
import { buttonUrls } from "./api/MusicData";
import { Card, CardTitle } from "@/components/ui/card";

export default function GenreButtons({ handleUpdateGenreClick, ...props }) {
  const urlGenreButtons = buttonUrls.map((buttonText, index) => {
    const isDisabled = buttonText === "/MusicGame/TV";
    if (buttonText === "/MusicGame/Gay Icons") {
      buttonText = "/MusicGame/GayIcons";
    } else if (buttonText === "/MusicGame/Hip Hop") {
      buttonText = "/MusicGame/HipHop";
    }

    const cardClassName = `w-[120px] hover:bg-secondary bg-transparent cursor-pointer ${
      props.className || ""
    }`;
    return (
      <Card key={index} className={cardClassName}>
        <CardTitle onClick={() => handleUpdateGenreClick(buttonText)}>
          {buttonText.replace("/MusicGame/", "")}
        </CardTitle>
      </Card>
    );
  });

  return <>{urlGenreButtons}</>;
}
