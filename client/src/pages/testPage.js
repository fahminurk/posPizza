import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  TabIndicator,
  useDisclosure,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import NavbarAdmin from "../components/navbarAdmin";
import SidebarAdmin from "../components/sidebarAdmin";
import { useEffect, useState } from "react";
import { api } from "../api/api";
// import AllProductList from "../components/AllProductList";
import { CreateProduct } from "../components/createProduct";
import { SearchBarProduct } from "../components/SearchBarProduct";

export default function ProductPage() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [totalPorduct, setTotalProduct] = useState([]);
  const [products, setProducts] = useState([]);

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState(undefined);

  const itemsPerPage = 3;

  console.log(products);
  console.log(totalPages);

  useEffect(() => {
    fetchProduct(currentPage);
  }, []);

  //fetchProducts
  async function fetchProduct(page, category, search = "") {
    setCurrentPage(page);
    setCategory(category);
    // try {
    const response = await api.get("/products", {
      params: {
        page,
        limit: parseInt(itemsPerPage),
        category_id: category,
        search,
      },
    });
    console.log(response.data);
    const {
      count: dataCount,
      products: dataProducts,
      totalPages: dataTotalPages,
    } = response.data;
    setTotalProduct(dataCount);
    setProducts(dataProducts);
    // alert(dataTotalPages);
    setTotalPages(dataTotalPages);
    // } catch (err) {
    // console.log(err.message);
    // }
  }

  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Button
          key={i}
          onClick={() => fetchProduct(i)}
          bg={i == currentPage ? "#B42318" : "white"}
          color={i == currentPage ? "white" : "black"}
        >
          {i}
        </Button>
      );
    }
    return pages;
  };

  return (
    <>
      <NavbarAdmin />
      <SidebarAdmin />
      <Box w={"100vw"} bg={"#EEF2F6"} h={"100vh"} pt={"88px"} pl={"200px"}>
        <Box w={"100%"} p={5}>
          <Box mb={5} fontWeight={"bold"}>
            PRODUCT
          </Box>
          <Flex justifyContent={"space-between"} mb={5}>
            <Box id="input">
              <SearchBarProduct
                category={category}
                fetchProduct={fetchProduct}
              />
            </Box>

            <ButtonGroup isAttached variant="outline" onClick={onOpen}>
              <IconButton
                icon={<AiOutlinePlus />}
                bg={"#B42318"}
                color={"white"}
              ></IconButton>
              <Button bg={"white"}>Product</Button>
              <CreateProduct isOpen={isOpen} onClose={onClose} />
            </ButtonGroup>
          </Flex>

          <Box bg={"white"} w={"100%"} borderRadius={5} p={3}>
            <Tabs position="relative" variant="unstyled" maxW={"100%"}>
              <TabList>
                <Tab onClick={() => fetchProduct(1)}>All </Tab>
                <Tab onClick={() => fetchProduct(1, "1")}>Pizza</Tab>
                <Tab onClick={() => fetchProduct(1, "2")}>Pasta</Tab>
                <Tab>Drinks</Tab>
              </TabList>
              <TabIndicator
                mt="-1.5px"
                height="2px"
                bg="blue.500"
                borderRadius="1px"
              />
              <TabPanels>
                <TabPanel id="all">
                  {/* <AllProductList products={products} /> */}
                </TabPanel>
                <TabPanel id="pizza">
                  {/* <AllProductList products={products} /> */}
                </TabPanel>
                <TabPanel id="pasta">
                  {/* <AllProductList products={products} /> */}
                </TabPanel>
              </TabPanels>
            </Tabs>
            <Center gap={3} p={2}>
              {renderPagination()}
            </Center>
          </Box>
        </Box>
      </Box>
    </>
  );
}
