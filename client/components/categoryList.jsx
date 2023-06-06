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
import { EditCategory } from "../components/editCategory";
import { DeleteCategory } from "./deleteCategory";

export default function CategoryList({ category }) {
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const [name, setName] = useState(null);
  const modalEdit = useDisclosure();
  const modalDelete = useDisclosure();
  return (
    <>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th w={"5%"}>No</Th>
            <Th w={"80%"}>Name</Th>
            <Th w={"15%"}> edit</Th>
          </Tr>
        </Thead>
        <Tbody>
          {category?.map((val) => (
            <Tr key={val.id}>
              <Td>{val.id}</Td>

              <Td>{val.name}</Td>

              <Td>
                <Flex justifyContent={"space-between"}>
                  <Button
                    aria-label="edit"
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setEditCategoryId(val.id);
                      setName(val.name);

                      modalEdit.onOpen();
                    }}
                  >
                    {<EditIcon />}
                    <EditCategory
                      id={editCategoryId}
                      isOpen={modalEdit.isOpen}
                      onClose={modalEdit.onClose}
                      name={name}
                    />
                  </Button>
                  <Button
                    onClick={() => {
                      setDeleteCategoryId(val.id);

                      modalDelete.onOpen();
                    }}
                    aria-label="Delete"
                    size="sm"
                    variant="ghost"
                  >
                    {<DeleteIcon />}
                    <DeleteCategory
                      id={deleteCategoryId}
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
