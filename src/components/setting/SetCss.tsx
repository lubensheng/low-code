/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, InputNumber, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { useComponentsStore } from "../../editor/stores/components/components";
import { type CSSProperties, useEffect, useState } from "react";
import CssEditor from "./CssEditor";
import {
  ComponentCssSetter,
  useComponentConfigStore,
} from "../../editor/stores/components/component-config";
import parse from "style-to-object";

function SetCss() {
  const [form] = useForm();
  const { updateComponentStyles, curComponentId, curComponent } =
    useComponentsStore();
  const { componentConfig } = useComponentConfigStore();
  const [code, setCode] = useState<string>(`.comp {\n\n}`);
  useEffect(() => {
    form.resetFields();
    form.setFieldsValue({ ...(curComponent?.styles || {}) });
    if (curComponent?.styles) {
      setCode(toCSSStr(curComponent.styles));
    } else {
      setCode(`.comp {\n\n}`);
    }
  }, [curComponent]);

  function toCSSStr(css: Record<string, any>) {
    let str = `.comp {\n`;
    for (const key in css) {
      let value = css[key];
      if (!value) {
        continue;
      }
      if (
        ["width", "height"].includes(key) &&
        !value.toString().endsWith("px")
      ) {
        value += "px";
      }
      str += `\t${key
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .toLowerCase()}: ${value};\n`;
    }
    str += `}`;
    return str;
  }

  const handleValueChange = (changeValues: CSSProperties) => {
    if (curComponentId) {
      updateComponentStyles(curComponentId, changeValues);
    }
  };

  const renderType = (item: ComponentCssSetter) => {
    const { type, options, label } = item;
    if (type === "select") {
      return <Select options={options} placeholder={`请选择${label}`} />;
    } else if (type === "input") {
      return <Input placeholder={`请输入${label}`} />;
    } else if (type === "inputNumber") {
      return (
        <InputNumber style={{ minWidth: 175 }} placeholder={`请输入${label}`} />
      );
    }
  };

  const handleCssCodeChange = (code: string) => {
    setCode(code);
    const cssStr = code
      .replace(/\/\*.*\*\//, "") // 去掉注释 /** */
      .replace(/(\.?[^{]+{)/, "") // 去掉 .comp {
      .replace("}", ""); // 去掉 }
    const cssObject: Record<string, any> = {};
    try {
      parse(cssStr, (name, value) => {
        const key = name.replace(/-\w/, (item) =>
          item.toUpperCase().replace("-", "")
        );
        cssObject[key] = value;
      });
      if (curComponentId && cssObject) {
        updateComponentStyles(
          curComponentId,
          { ...form.getFieldsValue(), ...cssObject },
          true
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 14 }}
      className="pt-[16px]"
      onValuesChange={(changeValues) => {
        handleValueChange(changeValues);
      }}
    >
      {curComponent
        ? (componentConfig[curComponent.name].cssSetter || []).map((item) => {
            return (
              <Form.Item key={item.name} name={item.name} label={item.label}>
                {renderType(item)}
              </Form.Item>
            );
          })
        : null}
      <div className="h-[200px] border-[1px] border-[#ccc]">
        <CssEditor
          value={code}
          onChange={(value) => {
            handleCssCodeChange(value || "");
          }}
        />
      </div>
    </Form>
  );
}

export default SetCss;
