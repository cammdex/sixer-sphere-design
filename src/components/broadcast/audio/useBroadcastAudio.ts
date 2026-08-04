import { Howl } from "howler";

import { BROADCAST_SOUNDS } from "./sounds";

const whoosh = new Howl({
  src: [BROADCAST_SOUNDS.whoosh],
  volume: 0.45,
});

const hammer = new Howl({
  src: [BROADCAST_SOUNDS.hammer],
  volume: 0.75,
});

const sting = new Howl({
  src: [BROADCAST_SOUNDS.sting],
  volume: 0.60,
});

const click = new Howl({
  src: [BROADCAST_SOUNDS.click],
  volume: 0.35,
});

const ambience = new Howl({
  src: [BROADCAST_SOUNDS.ambience],
  loop: true,
  volume: 0.18,
});

export function useBroadcastAudio() {
  return {
    playWhoosh: () => whoosh.play(),

    playHammer: () => hammer.play(),

    playSting: () => sting.play(),

    playClick: () => click.play(),

    startAmbience: () => {
      if (!ambience.playing()) {
        ambience.play();
      }
    },

    stopAmbience: () => {
      ambience.stop();
    },
  };
}