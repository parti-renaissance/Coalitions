import React, { FunctionComponent } from 'react';
import YouTube, { Options } from 'react-youtube';
import { getIsMobile } from 'services/mobile/mobile';
import { defaultMarginsAsNumber } from 'stylesheet';

interface VideoProps {
  videoId: string;
}

const PLAYER_DIMENSIONS = {
  height: 390,
  width: 640,
};

const DEFAULT_OPTIONS: Options = {
  height: PLAYER_DIMENSIONS.height.toString(),
  width: PLAYER_DIMENSIONS.width.toString(),
  playerVars: {
    autoplay: 1,
    mute: 1,
  },
};

const Video: FunctionComponent<VideoProps> = ({ videoId }) => {
  let options = DEFAULT_OPTIONS;

  if (getIsMobile()) {
    const newWidth = window.innerWidth - 2 * defaultMarginsAsNumber.horizontal.mobile;
    options = {
      ...DEFAULT_OPTIONS,
      width: newWidth.toString(),
      height: ((newWidth * PLAYER_DIMENSIONS.height) / PLAYER_DIMENSIONS.width).toString(),
    };
  }

  return <YouTube videoId={videoId} opts={options} />;
};

export default Video;
