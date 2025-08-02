import React, { ReactNode } from "react";
import { StyleSheet, Text, TextProps, TextStyle } from "react-native";

type TellTextProps = {
  children: ReactNode;
  style?: TextStyle | TextStyle[];
} & TextProps;

const TellText = ({ children, style, ...props }: TellTextProps) => {
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

export default TellText;
