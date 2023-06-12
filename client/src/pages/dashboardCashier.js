import { Flex } from "@chakra-ui/react";
import Cashier from "../components/cashier/cashier";
import Formtransaction from "../components/cashier/formtrancsaction";
import { useState } from "react";
import NavbarCashier from "../components/cashier/navbarCashier";
import SidebarCashier from "../components/cashier/sidebarCashier";
import { api } from "../api/api";

export default function DashboardCashier() {
  const [orderList, setOrderList] = useState([]);

  // async function fetchOrder

  return (
    <>
      <NavbarCashier />
      <SidebarCashier />
      <Flex>
        <Cashier orderList={orderList} setOrderList={setOrderList} />

        <Formtransaction orderList={orderList} setOrderList={setOrderList} />
      </Flex>
    </>
  );
}
