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

export default function CategorySales() {
  return (
    <>
      <Table variant="simple">
        <Thead bg={"#B42318"}>
          <Tr>
            <Th w={"20%"} color={"white"}>
              Category
            </Th>

            <Th w={"20%"} color={"white"}>
              Item Sold
            </Th>
            <Th w={"20%"} color={"white"}>
              Gross Sales
            </Th>
            <Th w={"20%"} color={"white"}>
              Net Sales
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>pasta</Td>
            <Td>9</Td>
            <Td>300.000</Td>
            <Td>300.000</Td>
          </Tr>

          <Tr>
            <Td>pizza</Td>
            <Td>5</Td>
            <Td>200.000</Td>
            <Td>200.000</Td>
          </Tr>

          <Tr>
            <Td>Drink</Td>
            <Td>-</Td>
            <Td>-</Td>
            <Td>-</Td>
          </Tr>

          <Tr fontWeight={"bold"}>
            <Td>Total</Td>
            <Td>14</Td>
            <Td>500.000</Td>
            <Td>500.000</Td>
          </Tr>
        </Tbody>
      </Table>
    </>
  );
}
