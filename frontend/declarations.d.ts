declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";

  const content: React.FC<SvgProps>;

  export default content;
}

declare module "*.png" {
  import { ImageRequireSource } from "react-native";
  const src: ImageRequireSource;
  export default src;
}

declare module "*.jpg" {
  import { ImageRequireSource } from "react-native";
  const src: ImageRequireSource;
  export default src;
}

// If you use .jpeg too:
declare module "*.jpeg" {
  import { ImageRequireSource } from "react-native";
  const src: ImageRequireSource;
  export default src;
}
