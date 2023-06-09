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
import { AiOutlinePlus } from "react-icons/ai";
import NavbarAdmin from "../components/admin/navbarAdmin";
import SidebarAdmin from "../components/admin/sidebarAdmin";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { CreateProduct } from "../components/admin/products/createProduct";
import { FiSearch } from "react-icons/fi";
import { CreateCategory } from "../components/admin/categories/createCategory";
import CategoryList from "../components/admin/categories/categoryList";

export default function CategoryPage() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState([]);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchCategory(currentPage);
  }, []);

  async function fetchCategory(page, search = "") {
    setCurrentPage(page);

    const response = await api.get("/categories", {
      params: {
        page,
        limit: parseInt(itemsPerPage),
        search,
      },
    });
    console.log(response.data);
    const { category, totalPages } = response.data;
    setCategory(category);
    setTotalPages(totalPages);
  }

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Button
          key={i}
          onClick={() => fetchCategory(i)}
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
        minH={"745px"}
        pt={"88px"}
        pl={"200px"}
      >
        <Box w={"100%"} p={5}>
          <Box mb={5} fontWeight={"bold"}>
            CATEGORY
          </Box>
          <Flex justifyContent={"space-between"} mb={5}>
            <Box id="input">
              <InputGroup>
                <InputLeftElement>
                  <FiSearch />
                </InputLeftElement>
                <Input
                  bg={"white"}
                  placeholder="Search Category"
                  type="text"
                  onChange={(e) => {
                    fetchCategory(1, e.target.value);
                  }}
                />
              </InputGroup>
            </Box>

            <ButtonGroup isAttached variant="outline" onClick={onOpen}>
              <IconButton
                icon={<AiOutlinePlus />}
                bg={"#B42318"}
                color={"white"}
              ></IconButton>
              <Button bg={"white"}>Category</Button>
              <CreateCategory
                isOpen={isOpen}
                onClose={onClose}
                fetchCategory={fetchCategory}
              />
            </ButtonGroup>
          </Flex>

          <Box bg={"white"} w={"100%"} borderRadius={5} p={3}>
            <Box minH={"417px"}>
              <CategoryList category={category} />
            </Box>

            <Center gap={3} p={2} bg={"#B42318"} borderRadius={5} h={"56px"}>
              {renderPagination()}
            </Center>
          </Box>
        </Box>
      </Box>
    </>
  );
}
