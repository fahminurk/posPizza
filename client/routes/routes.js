import { Route } from "react-router-dom";
import ProtectedPage from "./protectedPage";
import LoginPage from "../pages/loginPage";
import TestPage from "../pages/testPage";
import ProductPage from "../pages/ProductPage";
import DashboardAdminPage from "../pages/dashboardAdminPage";
import CategoryPage from "../pages/categoryPage";

const routes = [
  <Route
    path="/login"
    key={"loginPage"}
    element={
      <ProtectedPage>
        <LoginPage />
      </ProtectedPage>
    }
  />,

  <Route path="cashier" />,
  <Route
    path="/dashboardAdmin"
    element={
      <ProtectedPage adminOnly={true}>
        <DashboardAdminPage />
      </ProtectedPage>
    }
  />,
  <Route
    path="/products"
    element={
      <ProtectedPage adminOnly={true}>
        <ProductPage />
      </ProtectedPage>
    }
  />,
  <Route
    path="/categories"
    element={
      <ProtectedPage adminOnly={true}>
        <CategoryPage />
      </ProtectedPage>
    }
  />,

  <Route path="/test" element={<TestPage />} />,
];

export default routes;
