import {
  Box,
  Grid,
  Select,
  Icon,
  Center,
  Flex,
  Input,
  Text,
  Image,
  Divider,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { api } from "../../api/api";

export default function Cashier(props) {
  const [product, setProduct] = useState([]);
  const userSelector = useSelector((state) => state.auth);

  const handleGridItemClick = (item, qty) => {
    const newItem = { ...item, qty };
    props.setOrderList((prevOrderList) => [...prevOrderList, newItem]);
  };
  // console.log(props.orderList);

  async function fetchProducts(search = "") {
    await api
      .get("/products", {
        params: {
          search,
        },
      })
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
      });
  }

  async function fetchProductsBy(category_id) {
    await api
      .get("/products/v1", {
        params: { category_id },
      })
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
      });
  }

  // console.log(category);
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Flex h={"100vh"} ml={"112px"} pt={"75px"} w={"1088px"} flexDir={"column"}>
      <Box m={5} h={"700px"}>
        <Flex
          maxW={"100%"}
          gap={5}
          p={2}
          // justify={"center"}
          // m={3}
          borderRadius={5}
          bg={"#B42318"}
        >
          <Input
            variant={"filled"}
            placeholder="search"
            w={"30%"}
            onChange={(e) => fetchProducts(e.target.value)}
          />

          <Button
            variant={"outline"}
            color={"white"}
            _hover={{ color: "#B42318", bg: "white" }}
            onClick={() => fetchProducts("")}
          >
            All
          </Button>
          <Button
            variant={"outline"}
            color={"white"}
            _hover={{ color: "#B42318", bg: "white" }}
            onClick={() => fetchProductsBy(1)}
          >
            Pizza
          </Button>
          <Button
            variant={"outline"}
            color={"white"}
            _hover={{ color: "#B42318", bg: "white" }}
            onClick={() => fetchProductsBy(2)}
          >
            Pasta
          </Button>
        </Flex>
        <Divider />
        <Grid
          py={5}
          // maxW={"500px"}
          // px={"50px"}
          templateColumns="repeat(5, 1fr)"
          gap={"24px"}
          maxH={"550px"}
          overflowY={"auto"}
          justifyItems={"center"}
          bg={"white"}
          // mx={3}
        >
          {product?.map((val, idx) => (
            <Flex
              w={"170px"}
              key={idx}
              flexDir={"column"}
              border={"2px "}
              borderRadius={"5px"}
              borderColor={"#EBEBEB"}
              p={2}
              bg={"white"}
              color={"#B42318"}
              //onclick untuk mengirim ke setOrderList
              onClick={() => {
                const inputQuantity = parseInt(prompt("Enter quantity")); // Menggunakan prompt untuk meminta input kuantitas
                if (!isNaN(inputQuantity) && inputQuantity > 0) {
                  handleGridItemClick(val, inputQuantity);
                }
              }}

              // onClick={() => handleGridItemClick(val)} // onclick untuk post ke database
            >
              <Image
                w={"200px"}
                h={"152px"}
                bgColor={"#EBEBEB"}
                src={val.product_url}
              />

              <Text fontWeight={"bold"} fontSize={"16px"}>
                {val.name}
              </Text>
              <Divider />
              <Text fontSize={"12px"}>{val.description}</Text>
              <Divider />
              <Text>
                {val.price.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </Text>
            </Flex>
          ))}
        </Grid>
      </Box>
    </Flex>
  );
}
