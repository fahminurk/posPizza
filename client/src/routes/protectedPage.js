import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProtectedPage({
  children,
  adminOnly = false,
  cashierOnly = false,
  guestOnly = false,
}) {
  const userSelector = useSelector((state) => state.auth);
  const nav = useNavigate();
  const token = JSON.parse(localStorage.getItem("user"));
  // console.log(adminOnly);
  console.log(userSelector);
  console.log(token);
  useEffect(() => {
    console.log(userSelector.role);

    if (guestOnly && userSelector.role) {
      if (userSelector.role == "ADMIN") {
        return nav("/dashboardAdmin");
      } else {
        return nav("/dashboardCashier");
      }
    } else if (adminOnly && userSelector.role != "ADMIN") {
      return nav("/login");
    } else if (cashierOnly && userSelector.role != "CASHIER") {
      return nav("/login");
    }
  }, [userSelector, adminOnly, cashierOnly]);

  return children;
}

//admin product, category, adminsetting , dashboardadmin,
//cashier dashboardcashier
//guest login
