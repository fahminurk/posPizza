import React from "react";
import {
  Box,
  Text,
  VStack,
  SimpleGrid,
  ListItem,
  UnorderedList,
  Flex,
  Stack,
  Avatar,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Link,
  Image,
  Button,
} from "@chakra-ui/react";
import { CalendarIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  LineChart,
  Line,
  Dot,
  Sector,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { BiDotsVertical } from "react-icons/bi";
import calculateSalesMetrics from "../salesMetrics";
// import IconCalendar from "../assets/IconCalendar.png";
import CalculatePerssentage from "./CalculatePerssentage";
import CalculateRatio from "./CalculatePerssentage";

export default function ReportPage() {
  const COLORS = ["red", "green", "blue", "yellow"];

  const hourlyData = [
    { hour: "00:00", amount: 12 },
    { hour: "01:00", amount: 8 },
    { hour: "02:00", amount: 15 },
    { hour: "03:00", amount: 20 },
    { hour: "04:00", amount: 10 },
    { hour: "05:00", amount: 18 },
    { hour: "06:00", amount: 24 },
    { hour: "07:00", amount: 30 },
    { hour: "08:00", amount: 28 },
    { hour: "09:00", amount: 22 },
    { hour: "10:00", amount: 18 },
    { hour: "11:00", amount: 21 },
    { hour: "12:00", amount: 25 },
    { hour: "13:00", amount: 29 },
    { hour: "14:00", amount: 27 },
    { hour: "15:00", amount: 22 },
    { hour: "16:00", amount: 19 },
    { hour: "17:00", amount: 23 },
    { hour: "18:00", amount: 28 },
    { hour: "19:00", amount: 32 },
    { hour: "20:00", amount: 28 },
    { hour: "21:00", amount: 24 },
    { hour: "22:00", amount: 20 },
    { hour: "23:00", amount: 16 },
  ];

  const totalAmount = hourlyData.reduce(
    (total, data) => total + data.amount,
    0
  );
  //===================================

  const salesData = [
    { date: "2023-06-01", sales: 200 },
    { date: "2023-06-02", sales: 350 },
    { date: "2023-06-03", sales: 480 },
    { date: "2023-06-04", sales: 300 },
    { date: "2023-06-05", sales: 420 },
    { date: "2023-06-01", sales: 200 },
    { date: "2023-06-02", sales: 350 },
    { date: "2023-06-03", sales: 480 },
    { date: "2023-06-04", sales: 300 },
    { date: "2023-06-05", sales: totalAmount },
  ];

  const totalSales = salesData.reduce(
    (total, transaction) => total + transaction.sales,
    0
  );

  //===================================

  const item = [
    { name: "Pizza", value: 10 },
    { name: "Donut", value: 20 },
    { name: "Burger", value: 15 },
    { name: "Softdrink", value: 30 },
  ];

  const ratio = CalculateRatio(item);

  const ratiocolors = [];
  //===================================

  const totalRevenueFromSales = 10000000;
  const returns = 500000;
  const discounts = 200000;
  const otherDeductions = 100000;
  const costOfGoodsSold = 6000000;
  const totalNumberOfTransactions = totalSales;

  // Menghitung metrik penjualan menggunakan fungsi calculateSalesMetrics
  const salesMetrics = calculateSalesMetrics(
    totalRevenueFromSales,
    returns,
    discounts,
    otherDeductions,
    costOfGoodsSold,
    totalNumberOfTransactions
  );

  // Menggunakan nilai-nilai metrik penjualan untuk menampilkan data pada halaman laporan
  const salesReport = [
    {
      title: "Gross Sales",
      value: `Rp. ${salesMetrics.grossSales}`,
      percentage: `${salesMetrics.grossSalesPercentage}%`,
    },
    {
      title: "Net Sales",
      value: `Rp. ${salesMetrics.netSales}`,
      percentage: `${salesMetrics.netSalesPercentage}%`,
    },
    {
      title: "Gross Profit",
      value: `Rp. ${salesMetrics.grossProfit}`,
      percentage: `${salesMetrics.grossProfitPercentage}%`,
    },
    {
      title: "Total Transaction",
      value: salesMetrics.totalTransaction,
      percentage: `${salesMetrics.totalTransactionPercentage}%`,
    },
  ];

  //===================================

  const menu = [
    { name: "Pizza", items: 19 },
    { name: "Rice and Pasta", items: 9 },
    { name: "Appetizer", items: 10 },
    { name: "Drinks", items: 10 },
  ];

  //===================================

  const recentActivities = [
    { user: "Abdur", position: "Admin", details: "Wed Apr 5, 12:00 PM" },
    { user: "Sumanto", position: "Cashier", details: "Wed Apr 5, 12:00 PM" },
    { user: "Rama", position: "Cashier", details: "Tue Apr 4, 12:00 PM" },
    {
      user: "Max Thomson",
      position: "Admin",
      details: "Tue Apr 4, 12:00 PM",
    },
  ];
  //===================================

  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
      props;

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };

  //===================================

  return (
    <>
      <Box
        id="/products"
        bg={"#EEF2F6"}
        h={"100%"}
        minH={"1150px"}
        pt={"88px"}
        pl={"200px"}
      >
        <Box bg={"white"} m={5}>
          <VStack spacing={4} align="start" p={"24px"}>
            justifyContent={"center"}
            <Flex
              w={"100%"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Stack
                direction={"row"}
                w={"144px"}
                h={"36px"}
                justifyContent={"center"}
                alignItems={"center"}
                border={"1px solid black"}
                borderRadius={"6px"}
                _hover={{
                  bg: "#E6E6E6",
                  color: "white",
                  cursor: "pointer",
                  color: "white",
                }}
              >
                <CalendarIcon />
                <Box fontSize={"14px"} fontWeight={500}>
                  Filter by Date
                </Box>
              </Stack>
            </Flex>
            <Flex justifyContent={"space-between"} w={"100%"}>
              {salesReport.map((item, index) => (
                <Box
                  w={"274px"}
                  h={"130px"}
                  border={"2px solid black"}
                  borderRadius={"16px"}
                  padding={"16px"}
                >
                  <Box fontSize={"16px"} fontWeight={500} pb={7}>
                    {item.title}
                  </Box>
                  <Box
                    pt={5}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Box fontSize={"24px"} fontWeight={600} color={"#364152"}>
                      {item.value}
                    </Box>
                    <Box color={"#16B364"}>{item.percentage}</Box>
                  </Box>
                </Box>
              ))}
            </Flex>
            {/* ============================================================= */}
            <Box w={"100%"}>
              {/*  */}
              <Flex w={"100%"} justifyContent={"space-between"}>
                <Box
                  border={"2px solid black"}
                  borderRadius={"16px"}
                  padding={"16px"}
                >
                  <Flex justifyContent={"space-between"} alignItems={"center"}>
                    <Box
                      fontWeight={500}
                      fontSize={"16px"}
                      color={"#383838"}
                      py={"5px"}
                    >
                      Daily Sales
                    </Box>
                    <Box>
                      <HamburgerIcon
                        borderRadius={"5px"}
                        boxSize={6}
                        _hover={{
                          bg: "#E6E6E6",
                          color: "white",
                          cursor: "pointer",
                        }}
                      />
                    </Box>
                  </Flex>

                  <AreaChart width={585} height={300} data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="sales"
                      fill="url(#colorGradient)"
                      stroke="#B42318"
                      strokeWidth={2}
                    />
                    <defs>
                      <linearGradient
                        id="colorGradient"
                        gradientTransform="rotate(90)"
                      >
                        <stop offset="0%" stopColor="rgba(255, 0, 0, 1)" />
                        <stop offset="100%" stopColor="rgba(255, 0, 0, 0)" />
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </Box>

                {/* ============================================================= */}
                <Box
                  border={"2px solid black"}
                  borderRadius={"16px"}
                  padding={"16px"}
                >
                  <Box
                    fontWeight={500}
                    fontSize={"16px"}
                    color={"#383838"}
                    py={"5px"}
                  >
                    Ratios
                  </Box>
                  <BarChart
                    width={524}
                    height={300}
                    data={ratio}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <defs>
                      <linearGradient
                        id="colorGradient"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="0"
                      >
                        <stop
                          offset="100%"
                          stopColor="rgba(1, 155, 162, 253)"
                        />
                        <stop offset="0%" stopColor="rgba(1, 155, 162, 253)" />
                      </linearGradient>
                    </defs>
                    <Bar dataKey="value" fill="url(#colorGradient)" />
                  </BarChart>
                </Box>
              </Flex>

              {/* ============================================================= */}

              <Flex justifyContent={"space-between"} mt={4}>
                <Box
                  border={"2px solid black"}
                  borderRadius={"16px"}
                  padding={"16px"}
                  w={"50%"}
                >
                  <Flex
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    // w={"100%"}
                  >
                    <Box
                      fontWeight={500}
                      fontSize={"16px"}
                      color={"#383838"}
                      py={"5px"}
                    >
                      Hourly Transaction Chart
                    </Box>
                    <Box>
                      <HamburgerIcon
                        borderRadius={"5px"}
                        boxSize={6}
                        _hover={{
                          bg: "#E6E6E6",
                          color: "white",
                          cursor: "pointer",
                        }}
                      />
                    </Box>
                  </Flex>

                  <LineChart width={500} height={300} data={hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="amount"
                      stroke="#FDA29B"
                      dot={<Dot fill="red" />}
                    />
                  </LineChart>
                </Box>

                {/* ============================================================= */}

                <Box
                  border={"2px solid black"}
                  borderRadius={"16px"}
                  padding={"16px"}
                >
                  <Flex justifyContent={"space-between"} alignItems={"center"}>
                    <Box
                      fontWeight={500}
                      fontSize={"16px"}
                      color={"#383838"}
                      py={"5px"}
                    >
                      Recent Activity
                    </Box>
                    <Box>
                      <Link color={"#16B364"}>See details</Link>
                    </Box>
                  </Flex>

                  <Table>
                    <Tbody>
                      {recentActivities.map((item, index) => (
                        <Tr>
                          <Td>
                            <Avatar size={"sm"} name={item.user} />
                          </Td>
                          <Td>{item.user}</Td>
                          <Td>{item.position}</Td>
                          <Td>{item.details}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              </Flex>

              {/* ============================================================= */}
            </Box>
          </VStack>
        </Box>
      </Box>
    </>
  );
}
