"use client";
import { useRef } from "react";
import AudioPlayer from "@/components/audio-player";

const tracks = [
  { title: "Nocturne in Blue", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { title: "Midnight Standards", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { title: "After Hours", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
];

export default function AudioPlayerDemo() {
  const audioRef = useRef<HTMLAudioElement>(null);
  return (
    <div className="w-full max-w-sm">
      <AudioPlayer
        tracks={tracks}
        audioRef={audioRef}
        album="Live at the Blue Room"
        artist="Matt Chapin Trio"
      />
    </div>
  );
}
