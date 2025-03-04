declare module "*.png" {
    const value: string;
    export default value;
}
  
  declare module "*.jpg" {
    const value: string;
    export default value;
}
  
  declare module "*.jpeg" {
    const value: string;
    export default value;
}
  
  declare module "*.gif" {
    const value: string;
    export default value;
}
  
  declare module "*.otf" {
    const value: string;
    export default value;
}
  
  declare module "*.ttf" {
    const value: string;
    export default value;
}
  
  declare module "*.svg" {
    import React from "react";
    import { SvgProps } from "react-native-svg";
    const content: React.FC<SvgProps>;
    export default content;
}