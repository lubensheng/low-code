import { Button as AntdButton } from 'antd';
import type { ButtonType } from 'antd/es/button';
import { CSSProperties } from 'react';

export interface ButtonProps {
  type: ButtonType,
  text: string;
  id: number;
  styles: CSSProperties
}

function Button({ type, text, id, styles }: ButtonProps) {
  return (
    <AntdButton data-component-id={id} style={styles} type={type}>{text}</AntdButton>
  );
}

export default Button;