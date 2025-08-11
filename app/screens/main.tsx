import AD_Sample from "@/assets/audio/AD_Sample_Half_Hour.mp3";
import TellText from "@/components/TellText";
import NavButton from "@/components/navButton";
import PlayButton from "@/components/playButton";
import { images } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  ColorValue,
  ImageBackground,
  ImageSourcePropType,
  NativeSyntheticEvent,
  StyleSheet,
  TextLayoutEventData,
  View
} from "react-native";

const backupBackground: ImageSourcePropType = images.defaultPoster;
const backupMovieTitle = "Everything Everywhere All At Once";

const devMovieId: string = "tt9619824";
const devPlaceId: string = "ChIJ22DWFkF-hYARcdrN1YSJF4w";
const devAuditoriumNumber: number = 1;

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

const Main = () => {
  const [fetchedTitle, setFetchedTitle] = useState<string | null>(null);
  const [posterPath, setPosterPath] = useState<string | null>(null);
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `http://10.0.0.32:3000/screening/details?movieId=${devMovieId}&placeId=${devPlaceId}&auditoriumNumber=${devAuditoriumNumber}`
        );
        if (!response.ok) throw new Error("Failed to fetch screening data");

        const data = await response.json();
        setFetchedTitle(data.title);
        setPosterPath(data.poster_path);
      } catch (error) {
        console.error("Error fetching screening details:", error);
      }
    };

    fetchMovieDetails();
  }, []);
  const [lineVarient, setLineVarient] = useState(1);

  const backgroundSource: ImageSourcePropType = posterPath
    ? {
        uri: `https://image.tmdb.org/t/p/w500/${posterPath}`
      }
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
            {fetchedTitle ?? backupMovieTitle}
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
          <PlayButton audioSource={AD_Sample} />
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
