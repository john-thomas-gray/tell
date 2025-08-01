import { images } from "@/constants";
import { useRouter } from "expo-router";
import React from "react";
import {
  Button,
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View
} from "react-native";

type MainProps = {
  posterBackground?: string;
  movieTitle?: string;
};

const backupBackground: ImageSourcePropType = images.backgroundBackup;
const backupMovieTitle = "The Sum of All Fears";

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
        <View style={styles.content}>
          <Text style={styles.title}>{movieTitle ?? backupMovieTitle}</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Pink Yoni Club</Text>
          <Button title="Settings" onPress={() => router.push("./settings")} />
        </View>
      </ImageBackground>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black" // fallback color if image doesn't load
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold"
  },
  footer: {
    height: "12.5%", // footer takes 12.5% height of the screen
    backgroundColor: "rgba(252, 0, 0, 0.6)", // semi-transparent dark background
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16
  },
  footerText: {
    color: "white",
    fontSize: 18
  }
});
