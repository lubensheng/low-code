/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { useComponentsStore } from "../../editor/stores/components/components";
import {
  type ComponentSetter,
  useComponentConfigStore,
} from "../../editor/stores/components/component-config";
import { useEffect } from "react";

function SetAttr() {
  const [form] = useForm();
  const { curComponent, curComponentId, updateComponentProps } = useComponentsStore();
  const { componentConfig } = useComponentConfigStore();

  const renderType = (item: ComponentSetter) => {
    const { type, options, label } = item;
    if (type === "select") {
      return <Select options={options} placeholder={`请选择${label}`} />;
    } else if (type === "input") {
      return <Input placeholder={`请输入${label}`} />;
    }
  };

  useEffect(() => {
    if (curComponent) {
      form.setFieldsValue({
        ...curComponent,
        ...curComponent.props,
        desc: componentConfig[curComponent.name].desc,
      });
    }
  }, [curComponent]);

  const handleValueChange = (values: Record<string, any>) => {
    if (curComponentId) {
      updateComponentProps(curComponentId, values);
    }
  }

  return (
    <Form
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 14 }}
      className="pt-[16px]"
      onValuesChange={(changeValues, values) => {
        console.log(changeValues);
        handleValueChange(values);
      }}
    >
      <Form.Item label="组件id" name="id">
        <Input value={curComponent?.id} disabled></Input>
      </Form.Item>
      <Form.Item label="组件名称" name="name">
        <Input value={curComponent?.name} disabled></Input>
      </Form.Item>
      <Form.Item label="组件描述" name="desc">
        <Input
          value={
            curComponent ? componentConfig[curComponent.name].desc : undefined
          }
          disabled
        ></Input>
      </Form.Item>
      {curComponent
        ? (componentConfig[curComponent.name].setter || []).map((item) => {
            return (
              <Form.Item key={item.name} name={item.name} label={item.label}>
                {renderType(item)}
              </Form.Item>
            );
          })
        : null}
    </Form>
  );
}

export default SetAttr;
