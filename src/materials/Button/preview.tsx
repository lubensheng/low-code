import { Button as AntdButton } from 'antd';
import type { ButtonType } from 'antd/es/button';
import { CSSProperties } from 'react';

export interface ButtonProps {
  type: ButtonType,
  text: string;
  id: number;
  styles: CSSProperties
}

function ButtonPreview({ type, text, styles }: ButtonProps) {
  return (
    <AntdButton style={styles} type={type}>{text}</AntdButton>
  );
}

export default ButtonPreview;