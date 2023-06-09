import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Divider,
  Flex,
  IconButton,
  TabIndicator,
  useDisclosure,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import NavbarAdmin from "../components/admin/navbarAdmin";
import SidebarAdmin from "../components/admin/sidebarAdmin";
import { AiOutlinePlus } from "react-icons/ai";
import PaymentMethods from "../components/admin/report/paymentMethods";
import ItemSales from "../components/admin/report/itemSales";
import CategorySales from "../components/admin/report/categorySales";

export default function ReportPage() {
  return (
    <>
      <NavbarAdmin />
      <SidebarAdmin />
      <Box
        id="/products"
        // w={"100vw"}
        bg={"#EEF2F6"}
        h={"100vh"}
        pt={"88px"}
        pl={"200px"}
      >
        <Box w={"100%"} p={5}>
          <Box mb={5} fontWeight={"bold"}>
            REPORT
          </Box>

          <Box bg={"white"} w={"100%"} borderRadius={5} p={2}>
            <Tabs
              position="relative"
              maxW={"100%"}
              //   minH={"425px"}
              isFitted
              variant="enclosed"
            >
              <TabList>
                <Tab color={"#B42318"}>Sales Summary </Tab>
                <Tab color={"#B42318"}>Gross Profit</Tab>
                <Tab color={"#B42318"}>Payment Methods </Tab>
                <Tab color={"#B42318"}>Item Sales</Tab>
                <Tab color={"#B42318"}>Category Sales</Tab>
              </TabList>
              <TabIndicator
                mt="-1.5px"
                height="2px"
                bg="#B42318"
                borderRadius="1px"
              />
              <TabPanels>
                <TabPanel id="Sales Summary">
                  <Box
                    bg={"#B42318"}
                    w={"100%"}
                    borderRadius={5}
                    p={5}
                    color={"white"}
                  >
                    <Flex flexDir={"column"} gap={2}>
                      <Flex justifyContent={"space-between"}>
                        <Box>Gross Sales</Box>
                        <Box>Rp. 8.999.900</Box>
                      </Flex>

                      <Divider />

                      <Flex justifyContent={"space-between"}>
                        <Box>Discount</Box>
                        <Box>(Rp.89.900)</Box>
                      </Flex>

                      <Flex gap={2}>
                        <Box w={"99%"} h={"2px"} bg={"white"} />
                        <Box w={"1%"} h={"2px"} bg={"white"} />
                      </Flex>

                      <Flex
                        justifyContent={"space-between"}
                        fontWeight={"bold"}
                      >
                        <Box>Net Sales</Box>
                        <Box>Rp. 8.910.000</Box>
                      </Flex>

                      <Divider />

                      <Flex justifyContent={"space-between"}>
                        <Box>Tax</Box>
                        <Box>(Rp. 891.000)</Box>
                      </Flex>

                      <Divider />

                      <Flex justifyContent={"space-between"}>
                        <Box>Rounding</Box>
                        <Box>-</Box>
                      </Flex>

                      <Flex gap={2}>
                        <Box w={"99%"} h={"2px"} bg={"white"} />
                        <Box w={"1%"} h={"2px"} bg={"white"} />
                      </Flex>

                      <Flex
                        justifyContent={"space-between"}
                        mt={5}
                        bg={"white"}
                        color={"#B42318"}
                        p={1}
                        borderRadius={5}
                        fontWeight={"bold"}
                      >
                        <Box>Total Collected</Box>
                        <Box>Rp. 8.019.000</Box>
                      </Flex>
                    </Flex>
                  </Box>
                </TabPanel>
                <TabPanel id="Gross Profit">
                  <Box
                    bg={"#B42318"}
                    w={"100%"}
                    borderRadius={5}
                    p={5}
                    color={"white"}
                  >
                    <Flex flexDir={"column"} gap={2}>
                      <Flex justifyContent={"space-between"}>
                        <Box>Gross Sales</Box>
                        <Box>Rp. 8.999.900</Box>
                      </Flex>
                      <Divider />
                      <Flex justifyContent={"space-between"}>
                        <Box>Discount</Box>
                        <Box>(R.89.900)</Box>
                      </Flex>
                      <Divider />
                      <Flex justifyContent={"space-between"}>
                        <Box>Refund</Box>
                        <Box>Rp. 0</Box>
                      </Flex>
                      <Flex gap={2}>
                        <Box w={"99%"} h={"2px"} bg={"white"} />
                        <Box w={"1%"} h={"2px"} bg={"white"} />
                      </Flex>

                      <Flex
                        justifyContent={"space-between"}
                        fontWeight={"bold"}
                      >
                        <Box>Net Sales</Box>
                        <Box>Rp. 8.910.000</Box>
                      </Flex>
                      <Divider />
                      <Flex justifyContent={"space-between"}>
                        <Box>Cost of Goods Sold (COGS)</Box>
                        <Box>(Rp. 10.000)</Box>
                      </Flex>
                      <Flex gap={2}>
                        <Box w={"99%"} h={"2px"} bg={"white"} />
                        <Box w={"1%"} h={"2px"} bg={"white"} />
                      </Flex>

                      <Flex
                        justifyContent={"space-between"}
                        mt={5}
                        bg={"white"}
                        color={"#B42318"}
                        p={1}
                        borderRadius={5}
                        fontWeight={"bold"}
                      >
                        <Box>Total Profit</Box>
                        <Box>Rp. 8.900.000</Box>
                      </Flex>
                    </Flex>
                  </Box>
                </TabPanel>
                <TabPanel id="Payment Methods">
                  <PaymentMethods />
                </TabPanel>
                <TabPanel id="Item Sales">
                  <ItemSales />
                </TabPanel>
                <TabPanel id="Category Sales">
                  <CategorySales />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      </Box>
    </>
  );
}
