import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CreateWorkflow } from "./components/CreateWorkflow";

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
