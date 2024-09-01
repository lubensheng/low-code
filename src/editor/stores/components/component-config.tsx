import { create } from "zustand";
import Container from "../../../materials/Container";
import Button from "../../../materials/Button";
import Page from "../../../materials/Page";
import ContainerPreview from "../../../materials/Container/preview";
import ButtonPreview from "../../../materials/Button/preview";
import PagePreview from "../../../materials/Page/preView";

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ComponentSetter {
  name: string;
  type: string;
  label: string;
  [key: string]: any;
}


export interface ComponentCssSetter {
  name: string;
  type: string;
  label: string;
  [key: string]: any;
}

export interface ComponentConfig {
  name: string;
  defaultProps: Record<string, any>;
  desc: string;
  setter?: ComponentSetter[];
  cssSetter?: ComponentCssSetter[];
  component: any;
  previewComponent: any;
}

interface State {
  componentConfig: { [key: string]: ComponentConfig };
}

interface Action {
  registerComponent: (name: string, componentConfig: ComponentConfig) => void;
}

export const useComponentConfigStore = create<State & Action>((set) => ({
  componentConfig: {
    Container: {
      name: "Container",
      defaultProps: {},
      desc: "容器",
      component: Container,
      cssSetter: [
        {
          name: "width",
          label: "宽度",
          type: "inputNumber",
        },
        {
          name: "height",
          label: "高度",
          type: "inputNumber",
        },
      ],
      previewComponent: ContainerPreview
    },
    Button: {
      name: "Button",
      desc: "按钮",
      defaultProps: {
        type: "primary",
        text: "按钮",
      },
      component: Button,
      previewComponent: ButtonPreview,
      setter: [
        {
          name: "type",
          label: "按钮类型",
          type: "select",
          options: [
            { label: "主按钮", value: "primary" },
            { label: "次按钮", value: "default" },
          ],
        },
        {
          name: "text",
          label: "文本",
          type: "input",
        },
      ],
      cssSetter: [
        {
          name: "width",
          label: "宽度",
          type: "inputNumber",
        },
        {
          name: "height",
          label: "高度",
          type: "inputNumber",
        },
      ]
    },
    Page: {
      name: "Page",
      desc: "主页",
      defaultProps: {},
      component: Page,
      previewComponent: PagePreview
    },
  },
  registerComponent: (name, componentConfig) => {
    set((state) => {
      return {
        ...state,
        [name]: {
          ...componentConfig,
        },
      };
    });
  },
}));
