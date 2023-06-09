import {
  Box,
  Divider,
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

export default function PaymentMethods() {
  return (
    <>
      <Table variant="simple">
        <Thead bg={"#B42318"}>
          <Tr>
            <Th w={"33%"} color={"white"}>
              Payment Method
            </Th>
            <Th w={"33%"} color={"white"}>
              Number of Transaction
            </Th>
            <Th w={"23%"} color={"white"}>
              Total Collected
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Cash</Td>
            <Td>10</Td>
            <Td>1.000.000</Td>
          </Tr>
          <Tr fontWeight={"bold"}>
            <Td>Total</Td>
            <Td>10</Td>
            <Td>1.000.000</Td>
          </Tr>
        </Tbody>
      </Table>

      {/* <Box bg={"#B42318"} w={"100%"} borderRadius={5} p={5} color={"white"}>
        <Flex flexDir={"column"} gap={2}>
          <Flex justifyContent={"space-between"} fontWeight={"bold"}>
            <Box>Payment Method</Box>
            <Box>Number of transaction</Box>
            <Box>Total Collected</Box>
          </Flex>
          <Divider />
          <Flex justifyContent={"space-between"}>
            <Box>Cash</Box>
            <Box>10</Box>
            <Box>Rp.1.000.000</Box>
          </Flex>
          <Divider />
          <Flex justifyContent={"space-between"}>
            <Box>Online Delivery</Box>
            <Box>10</Box>
            <Box>Rp. 1.000.000</Box>
          </Flex>

          <Divider />

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
      </Box> */}
    </>
  );
}
