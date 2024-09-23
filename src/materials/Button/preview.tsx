/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button as AntdButton } from "antd";
import type { ButtonType } from "antd/es/button";
import { CSSProperties } from "react";

export interface ButtonProps {
  type: ButtonType;
  text: string;
  id: number;
  styles: CSSProperties;
  [key: string]: any;
}

function ButtonPreview({ type, text, styles, ...props }: ButtonProps) {
  return (
    <AntdButton {...(props as any)} style={styles} type={type}>
      {text}
    </AntdButton>
  );
}

export default ButtonPreview;
