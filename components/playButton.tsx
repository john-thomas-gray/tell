import { images } from "@/constants";
import { useAudioPlayer } from "expo-audio";
import React, { useEffect, useState } from "react";
import { Image, Pressable } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";

type PlayButtonProps = {
  audioSource: string;
};

const PlayButton = ({ audioSource }: PlayButtonProps) => {
  const audioPlayer = useAudioPlayer(audioSource);
  const [isMuted, setIsMuted] = useState(true);
  const progress = useSharedValue(0);

  useEffect(() => {
    if (audioSource && audioPlayer) {
      audioPlayer.play();
      audioPlayer.muted = true;
    }
  }, [audioSource, audioPlayer]);

  useEffect(() => {
    progress.value = withTiming(isMuted ? 0 : 1, { duration: 1000 });
  }, [isMuted]);

  const handlePlayButtonPress = () => {
    if (isMuted) {
      audioPlayer.muted = false;
      setIsMuted(false);
    } else {
      setIsMuted(true);
      audioPlayer.muted = true;
    }
  };

  const animatedBackgroundStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        ["#000000", "#00A8E1"]
      )
    };
  });

  return (
    <Pressable onPress={() => handlePlayButtonPress()}>
      <Animated.View
        style={[
          {
            height: 126,
            width: 126,
            borderRadius: 63,
            overflow: "hidden",
            position: "absolute",
            top: (144 - 126) / 2,
            left: (144 - 126) / 2
          },
          animatedBackgroundStyle
        ]}
      />
      <Image
        source={isMuted ? images.audioNotPlaying : images.audioPlaying}
        style={{
          height: 144,
          width: 144
        }}
        resizeMode="contain"
      />
    </Pressable>
  );
};

export default PlayButton;
