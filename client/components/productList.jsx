import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { EditProduct } from "./editProduct";
import { DeleteProduct } from "./deleteProduct";

export default function ProductList({ products }) {
  const [editProductId, setEditProductId] = useState(null);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [name, setName] = useState(null);
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState(null);
  const [category_id, setCategory_id] = useState(null);
  const [product_url, setProduct_url] = useState(null);

  const modalEdit = useDisclosure();
  const modalDelete = useDisclosure();

  return (
    <>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th w={"5%"}>No</Th>
            <Th w={"10%"}>Image</Th>
            <Th w={"30%"}>Name</Th>
            <Th w={"20%"}>Category</Th>
            <Th w={"15%"}>Price</Th>
            <Th w={"10%"}> edit</Th>
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
              <Td>{val.price}</Td>
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
    </>
  );
}
