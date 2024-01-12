import { useState, useRef, useEffect } from "react";
import { Controls, InitialPlayerState, PlayerState, Playlist } from "./types";
import { createAudioplayer } from "./audioplayer";

interface AudioPlayer extends Controls {
  playerState: PlayerState;
}

function useAudioPlayer(playlist: Playlist): AudioPlayer {
  const [playerState, setPlayerState] =
    useState<PlayerState>(InitialPlayerState);

  const playerRef = useRef<Controls | null>(null);
  useEffect(() => {
    if (playlist) {
      const newPlayer = createAudioplayer(playlist, setPlayerState);
      playerRef.current = newPlayer;
      return () => {
        newPlayer.cleanup();
      };
    }
  }, [playlist]);

  function setPlaybackPosition(position: number) {
    playerRef.current?.setPlaybackPosition(position);
  }

  function toggleShuffle() {
    playerRef.current?.toggleShuffle();
  }

  function toggleRepeat() {
    playerRef.current?.toggleRepeat();
  }

  function togglePlayPause() {
    playerRef.current?.togglePlayPause();
  }

  function playNextTrack() {
    playerRef.current?.playNextTrack();
  }

  function playPreviousTrack() {
    playerRef.current?.playPreviousTrack();
  }

  function cleanup() {
    playerRef.current?.cleanup();
  }

  return {
    setPlaybackPosition,
    playerState,
    toggleShuffle,
    toggleRepeat,
    togglePlayPause,
    playNextTrack,
    playPreviousTrack,
    cleanup,
  };
}

export default useAudioPlayer;
