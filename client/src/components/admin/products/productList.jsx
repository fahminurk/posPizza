import {
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Image,
  Switch,
  useDisclosure,
} from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { api } from "../../../api/api";
import { EditProduct } from "./editProduct";
import { DeleteProduct } from "./deleteProduct";
import { RiArrowDropUpLine, RiArrowDropDownLine } from "react-icons/ri";

export default function ProductList({ products, handleSortChange }) {
  console.log(handleSortChange);
  const [editProductId, setEditProductId] = useState(null);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [name, setName] = useState(null);
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState(null);
  const [category_id, setCategory_id] = useState(null);
  const [product_url, setProduct_url] = useState(null);
  // console.log(products);
  const modalEdit = useDisclosure();
  const modalDelete = useDisclosure();

  return (
    <>
      {products.length != 0 ? (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th w={"5%"}>No</Th>
              <Th w={"10%"}>Image</Th>

              <Th w={"30%"}>
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                  Name
                  <Flex flexDir={"column"}>
                    <IconButton
                      variant="ghost"
                      colorScheme="teal"
                      aria-label="Call Sage"
                      fontSize="20px"
                      size="2px"
                      icon={<RiArrowDropUpLine />}
                      onClick={() => handleSortChange("name", "ASC")}
                    />
                    <IconButton
                      variant="ghost"
                      colorScheme="teal"
                      aria-label="Call Sage"
                      fontSize="20px"
                      size="2px"
                      icon={<RiArrowDropDownLine />}
                      onClick={() => handleSortChange("name", "DESC")}
                    />
                  </Flex>
                </Flex>
              </Th>

              <Th w={"20%"}>
                {" "}
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                  Category
                  <Flex flexDir={"column"}>
                    <IconButton
                      variant="ghost"
                      colorScheme="teal"
                      aria-label="Call Sage"
                      fontSize="20px"
                      size="2px"
                      icon={<RiArrowDropUpLine />}
                      onClick={() => handleSortChange("category_id", "ASC")}
                    />
                    <IconButton
                      variant="ghost"
                      colorScheme="teal"
                      aria-label="Call Sage"
                      fontSize="20px"
                      size="2px"
                      icon={<RiArrowDropDownLine />}
                      onClick={() => handleSortChange("category_id", "DESC")}
                    />
                  </Flex>
                </Flex>
              </Th>

              <Th w={"15%"}>
                {" "}
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                  Price
                  <Flex flexDir={"column"}>
                    <IconButton
                      variant="ghost"
                      colorScheme="teal"
                      aria-label="Call Sage"
                      fontSize="20px"
                      size="2px"
                      icon={<RiArrowDropUpLine />}
                      onClick={() => handleSortChange("price", "ASC")}
                    />
                    <IconButton
                      variant="ghost"
                      colorScheme="teal"
                      aria-label="Call Sage"
                      fontSize="20px"
                      size="2px"
                      icon={<RiArrowDropDownLine />}
                      onClick={() => handleSortChange("price", "DESC")}
                    />
                  </Flex>
                </Flex>
              </Th>

              <Th>status</Th>

              <Th w={"10%"}>edit</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products?.map((val) => (
              <Tr key={val.id}>
                <Td>{val.id}</Td>
                <Td>
                  <Image src={val.product_url} w={"100px"} h={"70px"} />
                </Td>
                <Td>{val.name}</Td>
                <Td>{val.Category.name}</Td>
                <Td>Rp. {val.price}</Td>
                <Td>
                  <Switch
                    defaultChecked={val?.status == "AVAILABLE" ? true : false}
                    colorScheme="teal"
                  />
                </Td>
                <Td>
                  <Flex justifyContent={"space-between"}>
                    <Button
                      aria-label="edit"
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setEditProductId(val.id);
                        setName(val.name);
                        setPrice(val.price);
                        setDescription(val.description);
                        setCategory_id(val.category_id);
                        setProduct_url(val.product_url);
                        modalEdit.onOpen();
                      }}
                    >
                      {<EditIcon />}
                      <EditProduct
                        id={editProductId}
                        isOpen={modalEdit.isOpen}
                        onClose={modalEdit.onClose}
                        name={name}
                        price={price}
                        description={description}
                        category_id={category_id}
                        product_url={product_url}
                      />
                    </Button>
                    <Button
                      onClick={() => {
                        setDeleteProductId(val.id);

                        modalDelete.onOpen();
                      }}
                      aria-label="Delete"
                      size="sm"
                      variant="ghost"
                    >
                      {<DeleteIcon />}
                      <DeleteProduct
                        id={deleteProductId}
                        isOpen={modalDelete.isOpen}
                        onClose={modalDelete.onClose}
                      />
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <Center>not found</Center>
      )}
    </>
  );
}
