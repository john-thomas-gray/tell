import TellText from "@/components/TellText";
import NavButton from "@/components/navButton";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const Settings = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <TellText style={styles.title} numberOfLines={1}>
          Settings
        </TellText>
      </View>
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.subheading}>
            <View style={styles.subheadingTextWrapper}>
              <TellText style={styles.subheadingText}>Font Style</TellText>
            </View>
          </View>
          <View style={styles.setting}>
            <View style={styles.settingTextWrapper}>
              <TellText style={styles.settingText}>Arial</TellText>
            </View>
            <View style={styles.settingTextWrapper}>
              <TellText style={styles.settingText}>Georgia</TellText>
            </View>
            <View style={styles.settingTextWrapper}>
              <TellText style={styles.settingText}>Gordita</TellText>
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 1
          }}
        />
        <TellText>Type of AD {"\n"} Font Size (slider)</TellText>
      </ScrollView>
      <NavButton currentScreen="settings" />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  title: {
    color: "white",
    fontSize: 74,
    fontWeight: "bold",
    letterSpacing: 3,
    marginHorizontal: 4,
    paddingBottom: 4
  },
  titleWrapper: {
    paddingBottom: 4
  },
  subheading: {
    backgroundColor: "#2B2B2B",
    height: 100,
    width: "100%",

    alignItems: "flex-start"
  },
  subheadingTextWrapper: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 4
  },
  subheadingText: {
    fontWeight: "bold",
    fontSize: 50,
    textAlignVertical: "center"
  },
  setting: {
    height: 300,
    width: "100%",

    alignItems: "flex-start"
  },
  settingTextWrapper: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 4
  },
  settingText: {
    fontWeight: "bold",
    fontSize: 50,
    textAlignVertical: "center"
  }
});
