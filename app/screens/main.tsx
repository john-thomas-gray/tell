import TellText from "@/components/TellText";
import NavButton from "@/components/navButton";
import { images } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  ColorValue,
  Image,
  ImageBackground,
  ImageSourcePropType,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  TextLayoutEventData,
  View
} from "react-native";

type MainProps = {
  posterBackground?: string;
  movieTitle?: string;
};

const backupBackground: ImageSourcePropType = images.defaultPoster;
const backupMovieTitle = "Everything Everywhere All At Once";

const linearGradientVariants: Record<
  string,
  {
    colors: [ColorValue, ColorValue, ...ColorValue[]];
    locations: [number, number, ...number[]];
    height: number;
  }
> = {
  1: {
    colors: [
      "transparent",
      "rgba(0,0,0,0.4)",
      "rgba(0,0,0,1)",
      "rgba(0,0,0,1)",
      "rgba(0,0,0,1)"
    ],
    locations: [1, 0.85, 0.65, 0.45, 0.15],
    height: 160
  },
  2: {
    colors: [
      "transparent",
      "rgba(0,0,0,0.4)",
      "rgba(0,0,0,1)",
      "rgba(0,0,0,1)",
      "rgba(0,0,0,1)"
    ],
    locations: [1, 0.85, 0.65, 0.45, 0.15],
    height: 250
  },
  3: {
    colors: [
      "transparent",
      "rgba(0,0,0,0.4)",
      "rgba(0,0,0,1)",
      "rgba(0,0,0,1)",
      "rgba(0,0,0,1)"
    ],
    locations: [1, 0.95, 0.75, 0.45, 0.15],
    height: 300
  }
};

const Main = ({ posterBackground, movieTitle }: MainProps) => {
  const [lineVarient, setLineVarient] = useState(1);

  const backgroundSource: ImageSourcePropType = posterBackground
    ? { uri: posterBackground }
    : backupBackground;

  const handleTextLayout = (e: NativeSyntheticEvent<TextLayoutEventData>) => {
    setLineVarient(e.nativeEvent.lines.length);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundSource}
        resizeMode="cover"
        style={styles.background}
      >
        <LinearGradient
          colors={linearGradientVariants[lineVarient].colors}
          locations={linearGradientVariants[lineVarient].locations}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: linearGradientVariants[lineVarient].height
          }}
        />
        <View style={styles.content}>
          <TellText
            style={styles.title}
            numberOfLines={3}
            onTextLayout={handleTextLayout}
          >
            {movieTitle ?? backupMovieTitle}
          </TellText>
          <TellText style={styles.auditorium} numberOfLines={1}>
            Auditorium 16
          </TellText>
        </View>
        <View
          style={{
            position: "absolute",
            top: 315,
            bottom: 315,
            left: 128,
            right: 128,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10
          }}
        >
          <Pressable>
            <Image
              source={images.playButtonOverlayColor}
              style={{
                height: 144,
                width: 144
              }}
              resizeMode="contain"
            />
          </Pressable>
        </View>

        <NavButton currentScreen="main" />
      </ImageBackground>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: 4,
    marginRight: 4
  },
  title: {
    color: "white",
    fontSize: 57,
    fontWeight: "bold",
    letterSpacing: 3
  },
  auditorium: {
    color: "#B3B3B3",
    fontSize: 40,
    fontWeight: "bold",
    letterSpacing: 3
  }
});
