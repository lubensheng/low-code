import { Button as AntdButton } from 'antd';
import type { ButtonType } from 'antd/es/button';

export interface ButtonProps {
  type: ButtonType,
  text: string;
  id: number
}

function Button({ type, text, id }: ButtonProps) {
  return (
    <AntdButton data-component-id={id} type={type}>{text}</AntdButton>
  );
}

export default Button;