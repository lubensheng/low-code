import { useComponentsStore } from "../../editor/stores/components/components";

function Setting() {
  const { components } = useComponentsStore();
  return (
    <div>
      <pre>{JSON.stringify(components, null, 2)}</pre>
    </div>
  );
}

export default Setting;
