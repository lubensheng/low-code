import { useMemo } from "react";
import { useComponentConfigStore } from "../../editor/stores/components/component-config";
import MaterialItem from "./MaterialItem";

function Material() {
  const { componentConfig } = useComponentConfigStore();

  const components = useMemo(() => {
    return Object.values(componentConfig);
  }, [componentConfig]);

  return (
    <div>
      {components.map((c) => {
        return <MaterialItem key={c.name} name={c.name} />;
      })}
    </div>
  );
}

export default Material;
