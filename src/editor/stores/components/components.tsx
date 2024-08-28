import { create } from "zustand";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Component {
  id: number;
  name: string;
  children?: Component[];
  props: any;
  parentId?: number;
  desc?: string;
}

interface State {
  components: Component[];
}

interface Action {
  addComponent: (component: Component, parentId?: number) => void;
  deleteComponent: (componentId: number) => void;
  updateComponentProps: (componentId: number, props: any) => void;
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
        }
      } else {
        const index = components.findIndex((c) => c.id === componentId);
        components.splice(index, 1);
      }
      return { components: { ...components } };
    });
  },
  updateComponentProps(componentId, props) {
    console.log(componentId);
    console.log(props);
    set((state) => {
      const component = getComponentById(componentId, state.components);
      if (component) {
        component.props = { ...component.props, ...props };

        return { components: [...state.components] };
      }

      return { components: [...state.components] };
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
