import { useRouter } from "expo-router";
import React, { JSX } from "react";
import {
  AccessibilityActionEvent,
  Pressable,
  StyleSheet,
  View
} from "react-native";
import TellText from "./TellText";

type NavButtonProps = {
  currentScreen: string;
};

const NavButton = ({ currentScreen }: NavButtonProps): JSX.Element => {
  const router = useRouter();

  const isMain = currentScreen === "main";
  const targetScreen = isMain ? "./settings" : "./main";
  const label = isMain ? "Settings" : "Playback";
  const textStyle = isMain ? styles.buttonTextSettings : styles.buttonTextMain;
  const accessibilityHint = isMain ? "Go to settings" : "Go to playback screen";

  const handleAccessibilityAction = (event: AccessibilityActionEvent) => {
    if (event.nativeEvent.actionName === "activate") {
      console.log(`${label} button activated`);
      router.push(targetScreen);
    }
  };

  return (
    <Pressable
      style={styles.pressable}
      accessible={true}
      accessibilityHint={accessibilityHint}
      accessibilityLabel="Navigation Button"
      accessibilityRole="button"
      accessibilityActions={[{ name: "activate", label: "Activate" }]}
      onAccessibilityAction={handleAccessibilityAction}
      onPress={() => {
        router.push(targetScreen);
      }}
    >
      <View style={styles.textView}>
        <TellText style={textStyle}>{label}</TellText>
      </View>
    </Pressable>
  );
};

export default NavButton;

const styles = StyleSheet.create({
  pressable: {
    backgroundColor: "#000",
    height: 140,
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "#2B2B2B"
  },
  buttonTextMain: {
    fontSize: 85,
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    letterSpacing: 3
  },
  buttonTextSettings: {
    fontSize: 95,
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    letterSpacing: 3
  },
  textView: {
    flex: 1,
    justifyContent: "center"
  }
});
