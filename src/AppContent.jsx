import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../src/pages/Login";
import AdminLayout from "../src/layouts/AdminLayout";
import Dashboard from "../src/pages/Dashboard";
import Products from "../src/pages/Products";
import Enquiries from "../src/pages/Enquiries";
import NotFound from "../src/pages/NotFound";
import AddProduct from "./pages/products/AddProduct";
// import Settings from "../src/pages/Settings";

function AppContent() {
  return (
    <Routes>
      {/* Login Page */}
      <Route path="/login" element={<Login />} />

      {/* Admin Layout and nested routes */}
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/add" element={<AddProduct />} />
        {/* <Route path="/products/edit/:id" element={<EditProducts/>}/> */}
        <Route path="/enquiries" element={<Enquiries />} />
        {/* <Route path="/settings" element={<Settings />} /> */}
      </Route>

      {/* Unknown routes */}
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/not-found" replace />} />
    </Routes>
  );
}

export default AppContent;
