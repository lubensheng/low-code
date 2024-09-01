import type { CSSProperties } from "react";
import { create } from "zustand";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Component {
  id: number;
  name: string;
  children?: Component[];
  props: any;
  styles?: CSSProperties;
  parentId?: number;
  desc?: string;
}

export interface State {
  components: Component[];
  curComponentId?: number;
  curComponent?: Component;
  mode: "edit" | "preview";
}

interface Action {
  addComponent: (component: Component, parentId?: number) => void;
  deleteComponent: (componentId: number) => void;
  updateComponentProps: (componentId: number, props: any) => void;
  setCurComponentId: (componentId?: number) => void;
  updateComponentStyles: (
    componentId: number,
    styles: CSSProperties,
    replace?: boolean
  ) => void;
  setMode: (mode: State["mode"]) => void;
}

export const useComponentsStore = create<State & Action>((set) => ({
  components: [
    {
      id: 1,
      name: "Page",
      props: {},
      desc: "页面",
    },
  ],
  mode: "edit",
  addComponent(component, parentId) {
    set((state) => {
      if (parentId) {
        const parent = getComponentById(parentId, state.components);
        if (parent) {
          component.parentId = parentId;
          if (parent.children) {
            parent.children.push({ ...component });
          } else {
            parent.children = [{ ...component }];
          }

          return { components: [...state.components] };
        }
      }

      return { components: [...state.components, component] };
    });
  },
  deleteComponent(componentId) {
    console.log(componentId);
    // 找到当前的组件
    set((state) => {
      const currentComponent = getComponentById(componentId, state.components);
      const components = state.components;
      if (currentComponent?.parentId) {
        const parentComponent = getComponentById(
          currentComponent.parentId,
          components
        );
        if (parentComponent) {
          const index = parentComponent.children!.findIndex(
            (c) => c.id === componentId
          );
          parentComponent.children!.splice(index, 1);

          if (!parentComponent.children!.length) {
            parentComponent.children = undefined;
          }
        }
      } else {
        const index = components.findIndex((c) => c.id === componentId);
        components.splice(index, 1);
      }
      return { components: [...components] };
    });
  },
  updateComponentProps(componentId, props) {
    set((state) => {
      const component = getComponentById(componentId, state.components);
      if (component) {
        component.props = { ...component.props, ...props };
        return { components: [...state.components] };
      }
      return { components: [...state.components] };
    });
  },
  setCurComponentId(componentId) {
    set((state) => {
      return {
        curComponentId: componentId,
        curComponent: componentId
          ? getComponentById(componentId, state.components) || undefined
          : undefined,
      };
    });
  },
  updateComponentStyles(componentId, styles, replace) {
    set((state) => {
      const component = getComponentById(componentId, state.components);
      if (component) {
        component.styles = replace
          ? { ...styles }
          : component.styles
          ? { ...component.styles, ...styles }
          : { ...styles };
        return { components: [...state.components] };
      }
      return { components: [...state.components] };
    });
  },
  setMode(mode) {
    set(() => {
      return { mode };
    });
  },
}));

export const getComponentById = (
  componentId: number,
  components: Component[]
): Component | null => {
  const item = components.find((c) => c.id === componentId);
  if (item) {
    return item;
  }
  const len = components.length;
  let i = 0;
  while (i < len) {
    let result;
    if (components[i].children) {
      result = getComponentById(componentId, components[i].children!);
    }
    if (result) {
      return result;
    }
    i++;
  }
  return null;
};
