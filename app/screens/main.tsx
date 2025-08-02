import GorditaText from "@/components/GorditaText";
import NavButton from "@/components/navButton";
import { images } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  View
} from "react-native";

type MainProps = {
  posterBackground?: string;
  movieTitle?: string;
};

type LinearGradientVariant = {
  colors: string[];
  locations?: number[];
  height: number;
};

const backupBackground: ImageSourcePropType = images.defaultPoster;
const backupMovieTitle = "Everything Everywhere All At Once";

const linearGradientVariants: { [key: string]: LinearGradientVariant } = {
  oneLine: {
    colors: ["rgba(0,0,0,1)", "transparent"],
    locations: [0, 1],
    height: 100
  }
};

const Main = ({ posterBackground, movieTitle }: MainProps) => {
  const router = useRouter();

  const backgroundSource: ImageSourcePropType = posterBackground
    ? { uri: posterBackground }
    : backupBackground;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundSource}
        resizeMode="cover"
        style={styles.background}
      >
        <LinearGradient
          colors={[
            "transparent",
            "rgba(0,0,0,0.4)",
            "rgba(0,0,0,1)",
            "rgba(0,0,0,1)",
            "rgba(0,0,0,1)"
          ]}
          locations={[1, 0.95, 0.75, 0.45, 0.15]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: 250
          }}
        />
        <View style={styles.content}>
          <GorditaText style={styles.title} numberOfLines={3}>
            {movieTitle ?? backupMovieTitle}
          </GorditaText>
        </View>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
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
    alignItems: "flex-start"
  },
  title: {
    color: "white",
    fontSize: 57,
    fontWeight: "bold",
    letterSpacing: 3
  }
});
