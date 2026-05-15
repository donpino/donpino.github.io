import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ClinicAudit from "./pages/ClinicAudit";

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clinic-audit" element={<ClinicAudit />} />
        <Route path="/clinic-audit/" element={<ClinicAudit />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
