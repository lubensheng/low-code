import { Allotment } from "allotment"
import 'allotment/dist/style.css';
import Header from "./components/header/Header";
import Material from "./components/material/Material";
import Setting from "./components/setting/Setting";
import EditArea from "./components/editArea/EditArea";


function App() {

  return (
   <div className="h-[100vh] flex flex-col w-[100%]">
      <div className="h-[60px] w-[100%] flex items-center border-b-[1px] border-[#000]">
        <Header />
      </div>
      <Allotment>
        <Allotment.Pane preferredSize={240} maxSize={300} minSize={200}>
          <Material />
        </Allotment.Pane>
        <Allotment.Pane>
          <EditArea />
        </Allotment.Pane>
        <Allotment.Pane preferredSize={300} maxSize={500} minSize={300}>
          <Setting />
        </Allotment.Pane>
      </Allotment>
   </div>
  )
}

export default App
