import { Route } from "react-router-dom";
import ProtectedPage from "./protectedPage";
import LoginPage from "../pages/loginPage";
import ProductPage from "../pages/ProductPage";
import DashboardAdminPage from "../pages/dashboardAdminPage";
import CategoryPage from "../pages/categoryPage";
import AdminSettings from "../pages/adminSettings";
import DashboardCashier from "../pages/dashboardCashier";
import ReportPage from "../pages/reportPage";
import Test from "../pages/categoryPage";

const routes = [
  <Route
    path="/login"
    key={"loginPage"}
    element={
      <ProtectedPage guestOnly={true}>
        <LoginPage />
      </ProtectedPage>
    }
  />,

  <Route
    path="dashboardCashier"
    element={
      <ProtectedPage cashierOnly={true}>
        <DashboardCashier />
      </ProtectedPage>
    }
  />,

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
        {/* <Test /> */}
      </ProtectedPage>
    }
  />,

  <Route
    path="/adminSettings"
    element={
      <ProtectedPage adminOnly={true}>
        <AdminSettings />
      </ProtectedPage>
    }
  />,
  <Route
    path="/report"
    element={
      <ProtectedPage adminOnly={true}>
        <ReportPage />
      </ProtectedPage>
    }
  />,

  <Route
    path="/*"
    element={
      <ProtectedPage guestOnly={true} adminOnly={true} cashierOnly={true} />
    }
  />,
];

export default routes;
