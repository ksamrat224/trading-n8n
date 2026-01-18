import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CreateWorkflow } from "./components/CreateWorkflow";
import "@xyflow/react/dist/style.css";


export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<CreateWorkflow />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
