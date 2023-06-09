import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  IconButton,
  TabIndicator,
  useDisclosure,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import NavbarAdmin from "../components/admin/navbarAdmin";
import SidebarAdmin from "../components/admin/sidebarAdmin";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import ProductList from "../components/admin/products/productList";
import { CreateProduct } from "../components/admin/products/createProduct";
import { SearchBarProduct } from "../components/admin/SearchBarProduct";
// import "../css/scroll.css";

export default function ProductPage() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [products, setProducts] = useState([]);
  const [all, setAll] = useState(0);
  const [pizza, setPizza] = useState(0);
  const [pasta, setPasta] = useState(0);

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState(undefined);

  const itemsPerPage = 5;

  // const [sortby, setSortby] = useState("name");
  // const [sortdir, setSortdir] = useState("ASC");

  useEffect(() => {
    fetchProduct(currentPage);
  }, []);

  //fetchProducts
  async function fetchProduct(
    page,
    category,
    search = "",
    selectedSortby,
    selectedSortdir
  ) {
    setCurrentPage(page);
    setCategory(category);
    // setSortby(selectedSortby);
    // setSortdir(selectedSortdir);
    try {
      const response = await api.get("/products", {
        params: {
          page,
          limit: parseInt(itemsPerPage),
          category_id: category,
          search,
          sortby: selectedSortby,
          sortdir: selectedSortdir,
        },
      });
      console.log(response.data);
      const {
        products: dataProducts,
        totalPages: dataTotalPages,
        all,
        pizza,
        pasta,
      } = response.data;
      setAll(all);
      setPizza(pizza);
      setPasta(pasta);
      setProducts(dataProducts);
      setTotalPages(dataTotalPages);
    } catch (err) {
      console.log(err.message);
    }
  }

  const handleSortChange = (selectedSortby, selectedSortdir) => {
    console.log(selectedSortby, selectedSortdir);

    fetchProduct(currentPage, category, "", selectedSortby, selectedSortdir);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Button
          key={i}
          onClick={() => fetchProduct(i)}
          bg={i == currentPage ? "white" : "#B42318"}
          color={i == currentPage ? "#B42318" : "white"}
          _hover={{ bg: "#912018" }}
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
      <Box
        id="/products"
        // w={"100vw"}
        bg={"#EEF2F6"}
        // h={"100%"}
        minH={"745px"}
        pt={"88px"}
        pl={"200px"}
      >
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
              <CreateProduct
                isOpen={isOpen}
                onClose={onClose}
                fetchProduct={fetchProduct}
              />
            </ButtonGroup>
          </Flex>

          <Box bg={"white"} w={"100%"} borderRadius={5} p={2}>
            <Tabs
              position="relative"
              variant="unstyled"
              maxW={"100%"}
              // minH={"425px"}
            >
              <TabList bg={"#B42318"} borderRadius={5} color={"white"}>
                <Tab onClick={() => fetchProduct(1)}>All ({all}) </Tab>
                <Tab onClick={() => fetchProduct(1, "1")}>Pizza ({pizza})</Tab>
                <Tab onClick={() => fetchProduct(1, "2")}>Pasta ({pasta})</Tab>
                <Tab onClick={() => fetchProduct(1, "3")}>Drinks</Tab>
              </TabList>
              <TabIndicator
                mt="-1.5px"
                height="2px"
                bg="white"
                borderRadius="1px"
              />
              <TabPanels>
                <TabPanel id="all">
                  <ProductList
                    products={products}
                    handleSortChange={handleSortChange}
                  />
                </TabPanel>
                <TabPanel id="pizza">
                  <ProductList
                    products={products}
                    handleSortChange={handleSortChange}
                  />
                </TabPanel>
                <TabPanel id="pasta">
                  <ProductList
                    products={products}
                    handleSortChange={handleSortChange}
                  />
                </TabPanel>
                <TabPanel id="drinks">
                  <ProductList
                    products={products}
                    handleSortChange={handleSortChange}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
            <Center gap={3} p={2} bg={"#B42318"} borderRadius={5} h={"56px"}>
              {renderPagination()}
            </Center>
          </Box>
        </Box>
      </Box>
    </>
  );
}
