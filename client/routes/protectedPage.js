import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProtectedPage({
  children,
  adminOnly = false,
  cashierOnly = false,
}) {
  const userSelector = useSelector((state) => state.auth);
  const nav = useNavigate();
  const token = JSON.parse(localStorage.getItem("user"));
  // console.log(adminOnly);
  console.log(userSelector);
  console.log(token);
  useEffect(() => {
    if (adminOnly && token && userSelector.role == "ADMIN") {
      //jika admin dan login ke dashboard admin
      return nav("/dashboardAdmin");
    } else if (cashierOnly && userSelector.role == "CASHIER") {
      //jika  cashier dan login maka ke dashboard cashier
      return nav("/dashboardCashier");
    } else {
      return nav("/login");
    }
  }, [userSelector, adminOnly, cashierOnly]);

  return children;
}
