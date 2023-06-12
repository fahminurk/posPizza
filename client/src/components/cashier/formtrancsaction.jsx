import {
  Box,
  Text,
  Flex,
  Input,
  Spacer,
  Popover,
  InputLeftElement,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  InputGroup,
  useDisclosure,
} from "@chakra-ui/react";

import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";
import { Badge } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Formtransaction(props) {
  console.log(props);
  const { isOpen, onToggle, onClose } = useDisclosure();
  const userSelector = useSelector((state) => state.auth);
  const [orderNumber, setOrderNumber] = useState("");

  // Mengenerate nomor order saat komponen pertama kali dirender
  // useEffect(() => {
  //   setOrderNumber(generateOrderNumber());
  // }, []);

  const generateOrderNumber = () => {
    const date = moment().format("YYYYMMDD"); // Mengambil tanggal dalam format YYYYMMDD
    const randomDigits = Math.floor(Math.random() * 10000); // Menghasilkan angka acak antara 0 dan 9999

    return `ORD-${date}-${randomDigits}`; // Format nomor order: ORD-YYYYMMDD-RANDOM
  };

  let totalOrder = props.orderList.reduce((accumulator, val) => {
    return accumulator + Number(val.price * val.qty);
  }, 0);

  let totalTax = totalOrder + totalOrder * 0.1;

  const handleSaveBill = () => {
    const newOrder = {
      no_order: orderNumber,
      total: totalTax,
      user_id: userSelector.id,
    };

    axios
      .post("http://localhost:2000/orders", newOrder)
      .then((response) => {
        console.log("Order saved successfully:", response.data);
        // Reset the order list or perform any other necessary actions
      })
      .catch((error) => {
        console.error("Failed to save order:", error);
      });
  };

  // useEffect(() => {
  //   generateOrderNumber();
  // }, []);

  return (
    <>
      <Box
        height={"100vh"}
        bg={"white"}
        w={"335px"}
        py={"20px"}
        position={"fixed"}
        zIndex={3}
        right={"0px"}
        borderLeft={"2px"}
        borderColor={"gray"}
      >
        <Flex justify={"space-between"} px={"20px"}>
          <Text fontSize={"24px"} fontWeight={"bold"}>
            Order Detail
          </Text>
          <Box>
            <BsThreeDotsVertical size={"40px"} height={"40px"} width={"40px"} />
          </Box>
        </Flex>
        <Box px={"20px"} pb={"10px"}>
          <Flex justify={"center"} align={"left"} direction={"column"}>
            <Text fontSize={"16px"} color={"grey"}>
              {moment().format("llll")}
            </Text>
            <Box h={"20px"}>
              <Text fontSize={"16px"} color={"grey"}>
                No Order : {orderNumber}
              </Text>
            </Box>
          </Flex>
        </Box>
        <Box mb={"20px"}>
          <Flex direction={"column"} justify={"center"} align={"center"}>
            <Button
              colorScheme="red"
              variant="outline"
              w={"80"}
              mb={"10px"}
              onClick={() => {
                setOrderNumber(generateOrderNumber());
              }}
            >
              {/* <AiOutlinePlus justify={"center"} align={"center"} /> */}
              Make new order
            </Button>
            {/* POPOVER TAMBAH CUSTOMER */}
            <Popover
              returnFocusOnClose={false}
              isOpen={isOpen}
              onClose={onClose}
              // placement="center"
              closeOnBlur={false}
            >
              <PopoverContent position="fixed" top="40%" left="45%">
                <PopoverHeader fontWeight="semibold">
                  Tambahkan Nama Customer
                </PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  <Input placeholder="masukkan nama"></Input>
                </PopoverBody>
                <PopoverFooter display="flex" justifyContent="flex-end">
                  <ButtonGroup size="sm">
                    <Button variant="outline" onClick={onClose}>
                      Batal
                    </Button>
                    <Button bgColor={"#B42318"} colorScheme="red">
                      Tambahkan
                    </Button>
                  </ButtonGroup>
                </PopoverFooter>
              </PopoverContent>
            </Popover>

            {/* ---------------------------------- */}
            <Button colorScheme="red" variant="outline" w={"80"}>
              Dine in
            </Button>
          </Flex>
        </Box>
        <Flex
          flexDir={"column"}
          h={"250px"}
          bgColor={"white"}
          overflowY={"auto"}
        >
          <Box mb={"20px"}>
            {props.orderList.map((val, idx) => (
              <Card {...val} total={val.price * val.qty} />
            ))}
          </Box>
          {/* <Box mb={"20px"}>
            <Flex justify={"space-evenly"}>
              <Badge
                bg={"red.100"}
                color={"red.400"}
                fontSize={"16px"}
                px={"10px"}
                py={"5px"}
              >
                Beef
              </Badge>
              <Badge
                bg={"red.100"}
                color={"red.400"}
                fontSize={"16px"}
                px={"10px"}
                py={"5px"}
                display={"flex"}
              >
                <AiOutlinePlus justify={"center"} align={"center"} />
                <Text ml={"3"}>Beef</Text>
              </Badge>
              <Badge
                bg={"red.100"}
                color={"red.400"}
                fontSize={"16px"}
                px={"10px"}
                py={"5px"}
                display={"flex"}
              >
                <AiOutlineMinus justify={"center"} align={"center"} />
                <Text ml={"3"}>Chicker</Text>
              </Badge>
            </Flex>
          </Box> */}
        </Flex>
        <Box
        // mt={"60"} mb={"40"}
        >
          <Flex justify={"center"} align={"center"}>
            <Button
              colorScheme="red"
              variant="outline"
              w={"80"}
              onClick={() => {
                props.setOrderList([]);
                setOrderNumber(generateOrderNumber());
              }}
            >
              Clear Transaction
            </Button>
          </Flex>
        </Box>
        <Box mb={"10px"}>
          <Flex justify={"space-between"} px={"8"}>
            <Text fontSize={"xl"} color={"grey"}>
              Total
            </Text>
            <Text fontSize={"xl"} color={"grey"}>
              {totalOrder.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </Text>
          </Flex>
        </Box>
        <Box mb={"10px"}>
          <Flex justify={"space-between"} px={"8"}>
            <Text fontSize={"xl"} color={"grey"}>
              Tax 10%
            </Text>
            <Text fontSize={"xl"} color={"grey"}>
              {totalTax.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </Text>
          </Flex>
        </Box>
        <Divider />
        <Box mt={"20px"}>
          <Flex justify={"space-between"} px={"8"}>
            <Button
              colorScheme="red"
              variant="outline"
              w={"40"}
              mr={"5"}
              onClick={handleSaveBill}
            >
              Save Bill
            </Button>
            <Button colorScheme="red" variant="outline" w={"40"}>
              Print Bill
            </Button>
          </Flex>
        </Box>
        <Box mt={"20px"}>
          <Flex justify={"center"} align={"center"}>
            <Button colorScheme="red" variant="outline" w={"300px"}>
              Charge
            </Button>
          </Flex>
        </Box>
      </Box>
    </>
  );
}

export function Card(props) {
  return (
    <Flex
      bgColor={"white"}
      px={"12px"}
      // gap={"20px"}
      justify={"space-between"}
    >
      <Box w={"110px"}>
        <Text fontSize={"16px"} color={"grey"}>
          {props.name}
        </Text>
      </Box>
      <Box w={"28px"}>
        <Text fontSize={"16px"} color={"grey"}>
          x {props.qty}
        </Text>
      </Box>
      <Box w={"110px"}>
        <Text fontSize={"16px"} color={"grey"}>
          {props.total.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}
        </Text>
      </Box>
    </Flex>
  );
}
