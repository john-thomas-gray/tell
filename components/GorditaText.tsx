import React, { ReactNode } from "react";
import { StyleSheet, Text, TextProps, TextStyle } from "react-native";

type GorditaTextProps = {
  children: ReactNode;
  style?: TextStyle | TextStyle[];
} & TextProps;

const GorditaText = ({ children, style, ...props }: GorditaTextProps) => {
  return (
    <Text style={[styles.default, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  default: {
    fontFamily: "Gordita-bold",
    color: "#ffffff"
  }
});

export default GorditaText;
