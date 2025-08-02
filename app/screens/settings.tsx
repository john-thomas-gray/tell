import GorditaText from "@/components/GorditaText";
import NavButton from "@/components/navButton";
import React from "react";
import { View } from "react-native";

const Settings = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black"
      }}
    >
      <View
        style={{
          flex: 1
        }}
      />
      <GorditaText>
        Font Style{"\n"}Type of AD {"\n"} Font Size
      </GorditaText>
      <NavButton currentScreen="settings" />
    </View>
  );
};

export default Settings;
