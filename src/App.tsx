import { Allotment } from "allotment";
import "allotment/dist/style.css";
import Header from "./components/header/Header";
import Setting from "./components/setting/Setting";
import EditArea from "./components/editArea/EditArea";
import MaterialWrapper from "./components/material/MaterialWrapper";
import { useComponentsStore } from "./editor/stores/components/components";
import Preview from "./components/preview";

function App() {
  const { mode } = useComponentsStore();
  return (
    <div className="h-[100vh] flex flex-col w-[100%]">
      <div className="h-[60px] w-[100%] flex items-center border-b-[1px] border-[#e5e7eb]">
        <Header />
      </div>
      {mode === "edit" ? (
        <Allotment>
          <Allotment.Pane preferredSize={240} maxSize={300} minSize={200}>
            <MaterialWrapper />
          </Allotment.Pane>
          <Allotment.Pane>
            <EditArea />
          </Allotment.Pane>
          <Allotment.Pane preferredSize={300} maxSize={500} minSize={300}>
            <Setting />
          </Allotment.Pane>
        </Allotment>
      ) : (
        <Preview />
      )}
    </div>
  );
}

export default App;
