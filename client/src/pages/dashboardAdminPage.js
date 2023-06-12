import { useEffect } from "react";

import ReportPage from "../components/admin/report/ReportList";
import NavbarAdmin from "../components/admin/navbarAdmin";
import SidebarAdmin from "../components/admin/sidebarAdmin";

export default function DashboardAdmin() {
  //
  return (
    <>
      <NavbarAdmin />
      <SidebarAdmin />
      <ReportPage />
    </>
  );
}
